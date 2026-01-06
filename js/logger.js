/**
 * Centralized Logger
 * Handles error logging and user notifications.
 */
const Logger = {
  log(level, context, message, error) {
    const timestamp = new Date().toISOString();
    const errString = error ? `\nError: ${error.message || error}` : '';
    
    // Console output for debugging
    console[level](`[${timestamp}] [${context}] ${message}`, error || '');

    // User notification for errors (if toast system is available)
    if (level === 'error' && typeof window.showToast === 'function') {
      window.showToast('Error', message, 'error');
    }
  },

  info(context, message) {
    this.log('log', context, message);
  },

  warn(context, message, error) {
    this.log('warn', context, message, error);
  },

  error(context, message, error) {
    this.log('error', context, message, error);
  }
};

window.Logger = Logger;