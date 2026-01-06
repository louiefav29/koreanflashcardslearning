/**
 * Security Module
 * Handles Input Validation, Sanitization, and CSRF Protection.
 */
const Security = {
  // --- Input Validation ---
  validateEmail(email) {
    // Basic email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  validateName(name) {
    // Allow letters, spaces, hyphens, apostrophes. Min 2 chars, max 50.
    // Also allow Korean characters since this is a Korean learning app.
    // \u3131-\uD79D covers Hangul Jamo, Compatibility Jamo, Syllables
    const re = /^[a-zA-Z\s'\-\u3131-\uD79D]{2,50}$/;
    return re.test(name);
  },

  // --- XSS Prevention ---
  sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // --- CSRF Protection (Preparation) ---
  generateCSRFToken() {
    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        sessionStorage.setItem('kfl_csrf_token', token);
        return token;
    }
    return 'legacy-token-' + Date.now();
  },

  getCSRFToken() {
    return sessionStorage.getItem('kfl_csrf_token') || this.generateCSRFToken();
  }
};

window.Security = Security;