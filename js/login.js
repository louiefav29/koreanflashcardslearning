document.addEventListener("DOMContentLoaded", async () => {
  // Reveal the UI
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  // SECURITY CRITICAL: Force clear any existing Supabase tokens from LocalStorage.
  // This ensures that even if signOut() fails (e.g. network error), the session is destroyed locally.
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
      localStorage.removeItem(key);
    }
  });

  // Attempt early initialization, but don't block the UI if it fails yet
  if (window.supabaseClient) {
    try {
      await window.supabaseClient.initialize();
      // Security: Ensure clean state by signing out any existing session
      if (window.supabaseClient.currentUser) {
        await window.supabaseClient.signOut();
      }
    } catch (error) {
      console.warn("Early Supabase init failed, will retry on submit:", error);
    }
  }

  // Fallback: If window.supabaseClient is missing but class exists
  if (!window.supabaseClient && typeof SupabaseClient !== 'undefined') {
    window.supabaseClient = new SupabaseClient();
  }

  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      try {
        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        // 1. Ensure Client Exists
        if (!window.supabaseClient) {
           if (typeof SupabaseClient !== 'undefined') {
              window.supabaseClient = new SupabaseClient();
           } else {
              throw new Error("System Error: Supabase client script not loaded.");
           }
        }

        // 2. Ensure Client is Initialized
        if (!window.supabaseClient.client) {
           await window.supabaseClient.initialize();
        }

        const client = window.supabaseClient.client;

        // Attempt Login
        const { data, error } = await client.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        // SYNC PROFILE: Fetch user details from database to populate local storage
        try {
          // Update the wrapper's current user so getUserProfile works
          window.supabaseClient.currentUser = data.user;
          
          const profile = await window.supabaseClient.getUserProfile();
          const meta = data.user.user_metadata || {};
          
          // Fallback: DB Profile -> Auth Metadata -> Email Username
          const name = profile?.full_name || meta.full_name || data.user.email.split('@')[0];
          
          StateManager.updateProfile({
            name: name,
            email: data.user.email,
            studentId: profile?.student_id || meta.student_id,
            joined: new Date(data.user.created_at).toLocaleDateString()
          });
        } catch (err) {
          console.warn("Profile sync warning:", err);
        }

        // Success
        showToast("Success", "Login Successful!", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } catch (error) {
        console.error("Login Error:", error);

        // RESTRICTION: Handle unmatched email/password specifically
        if (error.message === "Invalid login credentials") {
          showToast("Login Failed", "Incorrect email or password. Please try again.", "error");
        } else {
          showToast(
            "Login Error",
            error.message || "An error occurred during login.",
            "error"
          );
        }

        // Reset UI
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});
