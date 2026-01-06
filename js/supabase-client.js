// Supabase Client Configuration
class SupabaseClient {
  constructor() {
    this.supabaseUrl = "https://fdexmgdusliozhxnsovy.supabase.co";
    this.supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZXhtZ2R1c2xpb3poeG5zb3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzE5MzEsImV4cCI6MjA4MzMwNzkzMX0.XMQTUGmwEEragSKemiKHkcnHvYRXBHFPXRy_3lLH2Fo";
    this.client = null;
    this.currentUser = null;
  }

  async initialize() {
    try {
      // Load Supabase library
      if (typeof supabase === "undefined") {
        await this.loadSupabaseScript();
      }

      this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);

      // Check for existing session
      const {
        data: { session },
      } = await this.client.auth.getSession();
      if (session) {
        this.currentUser = session.user;
      }

      return true;
    } catch (error) {
      console.error("Supabase initialization failed:", error);
      return false;
    }
  }

  async loadSupabaseScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Authentication methods
  async signUp(email, password) {
    try {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "https://koreanflashcardslearning.netlify.app/login.html",
        },
      });

      if (error) throw error;

      if (data.user) {
        await this.createUserProfile(data.user);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      this.currentUser = data.user;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await this.client.auth.signOut();
      if (error) throw error;

      this.currentUser = null;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async resetPassword(email) {
    try {
      const { data, error } = await this.client.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: "https://koreanflashcardslearning.netlify.app/index.html",
        }
      );
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Invite functionality
  async generateInviteCode() {
    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const inviteCode = this.generateRandomCode();

      const { data, error } = await this.client
        .from("invites")
        .insert({
          invite_code: inviteCode,
          created_by: this.currentUser.id,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data: { inviteCode, ...data } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async useInviteCode(inviteCode) {
    if (!this.currentUser) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      // Check if invite exists and is valid
      const { data: invite, error } = await this.client
        .from("invites")
        .select("*")
        .eq("invite_code", inviteCode)
        .eq("is_active", true)
        .single();

      if (error || !invite) {
        return { success: false, error: "Invalid or expired invite code" };
      }

      // Check if expired
      if (new Date() > new Date(invite.expires_at)) {
        return { success: false, error: "Invite code has expired" };
      }

      // Mark invite as used
      const { error: updateError } = await this.client
        .from("invites")
        .update({
          used_by: this.currentUser.id,
          used_at: new Date().toISOString(),
          is_active: false,
        })
        .eq("id", invite.id);

      if (updateError) throw updateError;

      // Award bonus XP for using invite
      await this.updateUserXP(50); // 50 XP bonus

      return { success: true, data: invite };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  generateRandomCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async updateUserXP(amount) {
    if (!this.currentUser) return;

    try {
      const { error } = await this.client
        .from("users")
        .update({
          xp_total: this.client.rpc("increment", {
            table_name: "users",
            column_name: "xp_total",
            row_id: this.currentUser.id,
            increment_amount: amount,
          }),
        })
        .eq("id", this.currentUser.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating XP:", error);
    }
  }

  // User profile methods
  async createUserProfile(user) {
    try {
      const { error } = await this.client.from("users").insert({
        id: user.id,
        email: user.email,
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Error creating user profile:", error);
      return { success: false, error: error.message };
    }
  }

  async getUserProfile() {
    if (!this.currentUser) return null;

    try {
      const { data, error } = await this.client
        .from("users")
        .select("*")
        .eq("id", this.currentUser.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  // Flashcard methods
  async getFlashcards() {
    try {
      const { data, error } = await this.client
        .from("flashcards")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      return [];
    }
  }

  async getUserProgress(flashcardId) {
    if (!this.currentUser) return null;

    try {
      const { data, error } = await this.client
        .from("user_progress")
        .select("*")
        .eq("user_id", this.currentUser.id)
        .eq("flashcard_id", flashcardId)
        .single();

      if (error && error.code !== "PGRST116") {
        // Not found error
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return null;
    }
  }

  async updateProgress(flashcardId, result, intervalDays, easeFactor) {
    if (!this.currentUser)
      return { success: false, error: "Not authenticated" };

    try {
      const now = new Date();
      const nextReview = new Date(
        now.getTime() + intervalDays * 24 * 60 * 60 * 1000
      );

      const { data, error } = await this.client.from("user_progress").upsert(
        {
          user_id: this.currentUser.id,
          flashcard_id: flashcardId,
          last_reviewed: now.toISOString(),
          next_review: nextReview.toISOString(),
          interval_days: intervalDays,
          ease_factor: easeFactor,
          review_count: this.client.rpc("increment", {
            table_name: "user_progress",
            column_name: "review_count",
            row_id: flashcardId,
          }),
          correct_count:
            result === "correct" || result === "easy"
              ? this.client.rpc("increment", {
                  table_name: "user_progress",
                  column_name: "correct_count",
                  row_id: flashcardId,
                })
              : undefined,
          last_result: result,
        },
        {
          onConflict: "user_id,flashcard_id",
        }
      );

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error updating progress:", error);
      return { success: false, error: error.message };
    }
  }

  // Study session methods
  async startStudySession(sessionType = "review") {
    if (!this.currentUser) return null;

    try {
      const { data, error } = await this.client
        .from("study_sessions")
        .insert({
          user_id: this.currentUser.id,
          session_type: sessionType,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error starting study session:", error);
      return null;
    }
  }

  async endStudySession(sessionId, cardsStudied, correctAnswers, xpGained) {
    try {
      const { data, error } = await this.client
        .from("study_sessions")
        .update({
          ended_at: new Date().toISOString(),
          cards_studied: cardsStudied,
          correct_answers: correctAnswers,
          xp_gained: xpGained,
        })
        .eq("id", sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error ending study session:", error);
      return null;
    }
  }

  // Analytics methods
  async getDailyStats(date = new Date().toISOString().split("T")[0]) {
    if (!this.currentUser) return null;

    try {
      const { data, error } = await this.client
        .from("daily_stats")
        .select("*")
        .eq("user_id", this.currentUser.id)
        .eq("date", date)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error fetching daily stats:", error);
      return null;
    }
  }

  async updateDailyStats(
    date,
    cardsStudied,
    timeSpent,
    xpGained,
    accuracyRate
  ) {
    if (!this.currentUser)
      return { success: false, error: "Not authenticated" };

    try {
      const { data, error } = await this.client.from("daily_stats").upsert(
        {
          user_id: this.currentUser.id,
          date: date,
          cards_studied: cardsStudied,
          time_spent_minutes: timeSpent,
          xp_gained: xpGained,
          accuracy_rate: accuracyRate,
        },
        {
          onConflict: "user_id,date",
        }
      );

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Error updating daily stats:", error);
      return { success: false, error: error.message };
    }
  }
}

// Global instance
try {
  window.supabaseClient = new SupabaseClient();
  console.log("SupabaseClient initialized globally");
} catch (e) {
  console.error("Error initializing SupabaseClient:", e);
}
