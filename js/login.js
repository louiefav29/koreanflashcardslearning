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
        showToast("Login Successful!", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } catch (error) {
        console.error("Login Error:", error);

        // RESTRICTION: Handle unmatched email/password specifically
        if (error.message === "Invalid login credentials") {
          showToast("Incorrect email or password. Please try again.", "error");
        } else {
          showToast(
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

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");

  if (!container) {
    alert(message);
    return;
  }

  // Ensure container is visible if it uses popover API
  try {
    if (container.showPopover) container.showPopover();
  } catch (e) {}

  const toast = document.createElement("div");

  // Styling based on type
  const bgColor =
    type === "error"
      ? "rgba(220, 38, 38, 0.95)"
      : type === "success"
      ? "rgba(22, 163, 74, 0.95)"
      : "rgba(30, 41, 59, 0.95)";

  toast.style.cssText = `
    background: ${bgColor};
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    margin-bottom: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    font-size: 0.9rem;
    animation: slideIn 0.3s ease-out forwards;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const icon =
    type === "error" ? "error" : type === "success" ? "check_circle" : "info";
  toast.innerHTML = `<span class="material-icons-round" style="font-size: 1.2rem">${icon}</span> ${message}`;

  container.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Inject animation styles
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
