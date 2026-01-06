document.addEventListener('DOMContentLoaded', () => {
  // Configuration: Replace with your actual Supabase project details
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

  // Initialize Supabase Client
  let supabase;
  if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } else {
    console.error('Supabase library not loaded. Please check login.html');
  }

  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = loginForm.querySelector('input[type="email"]');
      const passwordInput = loginForm.querySelector('input[type="password"]');
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!supabase) {
        showToast('System Error: Supabase not initialized', 'error');
        return;
      }

      try {
        // UI Loading State
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        // Attempt Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        // Success
        showToast('Login Successful!', 'success');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);

      } catch (error) {
        console.error('Login Error:', error);

        // RESTRICTION: Handle unmatched email/password specifically
        if (error.message === 'Invalid login credentials') {
          showToast('Incorrect email or password. Please try again.', 'error');
        } else {
          showToast(error.message || 'An error occurred during login.', 'error');
        }

        // Reset UI
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  
  if (!container) {
    alert(message);
    return;
  }

  // Ensure container is visible if it uses popover API
  try {
    if (container.showPopover) container.showPopover();
  } catch (e) {}

  const toast = document.createElement('div');
  
  // Styling based on type
  const bgColor = type === 'error' ? 'rgba(220, 38, 38, 0.95)' : 
                  type === 'success' ? 'rgba(22, 163, 74, 0.95)' : 
                  'rgba(30, 41, 59, 0.95)';
                  
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
  
  const icon = type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info';
  toast.innerHTML = `<span class="material-icons-round" style="font-size: 1.2rem">${icon}</span> ${message}`;

  container.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Inject animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);