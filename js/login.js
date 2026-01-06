/**
 * Login Component Logic
 * Handles authentication and navigation for the login page.
 */

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        Logger.info('ServiceWorker', 'Registration successful');
      })
      .catch(err => {
        Logger.error('ServiceWorker', 'Registration failed', err);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial Animation
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  // Form Handling
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Navigation Handling
  // Optimized: Event Delegation
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('.fade-link');
    if (link) {
      navigateWithFade(e, link.href);
    }
  });
});

function handleLogin(event) {
  event.preventDefault();
  
  const btn = event.target.querySelector('button[type="submit"]');
  if (btn) btn.classList.add('loading');
  
  const emailInput = event.target.querySelector('input[type="email"]');
  const email = emailInput.value;
  
  // Update current profile email or create new session
  const profile = StateManager.getUserProfile();
  
  if (!profile || profile.email !== email) {
    StateManager.updateProfile({
      name: profile ? profile.name : "User",
      email: email,
      joined: new Date().toLocaleDateString()
    });
  }

  // Simulate login success
  navigateWithFade(event, 'index.html');
}

function navigateWithFade(event, url) {
  if (event) event.preventDefault();
  document.body.classList.remove("loaded");
  setTimeout(() => {
    window.location.href = url;
  }, 500); // Match CSS transition duration
}