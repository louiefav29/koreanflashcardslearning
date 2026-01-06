/**
 * Global Error Boundary
 * Catches unhandled errors and provides user feedback.
 */
window.addEventListener('error', (event) => {
  if (window.Logger) {
    window.Logger.error('Global', 'Uncaught Exception', event.error);
  } else {
    console.error('[Global Error]', event.error);
  }
  
  if (typeof showToast === 'function') {
    showToast('Application Error', 'Something went wrong. Please refresh.', 'error');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  // Log but don't necessarily alert user for background promise failures unless critical
  if (window.Logger) {
    window.Logger.error('Global', 'Unhandled Promise Rejection', event.reason);
  }
});