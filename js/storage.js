/**
 * Storage Module
 * Centralizes localStorage keys and safe access patterns.
 */

window.STORAGE_KEYS = {
  USER_PROGRESS: 'kfl_user_progress',
  FLASHCARDS: 'kfl_flashcards_deck',
  SETTINGS: 'kfl_settings',
  PROFILE: 'kfl_profile',
  PATCH_VERSION: 'kfl_last_patch_version'
};

window.safeStorageSet = function(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    if (window.Logger) window.Logger.warn(`Storage:Set[${key}]`, "Failed to save data", error);
    else console.warn(`Failed to save to localStorage [${key}]:`, error);
  }
};

window.safeStorageGet = function(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    if (window.Logger) window.Logger.error(`Storage:Get[${key}]`, "Failed to load data", error);
    else console.error(`Failed to load from localStorage [${key}]:`, error);
    return null;
  }
};

// Storage Management
window.checkStorageQuota = function() {
  let total = 0;
  for (let x in localStorage) {
    if (localStorage.hasOwnProperty(x)) {
      total += ((localStorage[x].length * 2) / 1024 / 1024);
    }
  }
  // Return usage in MB
  return total.toFixed(2);
};

window.cleanupOldData = function() {
  const progress = safeStorageGet(STORAGE_KEYS.USER_PROGRESS);
  if (!progress || !progress.dailyActivity) return;

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const cutoff = oneYearAgo.toISOString().split('T')[0];

  let changed = false;
  Object.keys(progress.dailyActivity).forEach(date => {
    if (date < cutoff) {
      delete progress.dailyActivity[date];
      changed = true;
    }
  });

  if (changed) {
    safeStorageSet(STORAGE_KEYS.USER_PROGRESS, progress);
    if (window.Logger) window.Logger.info('Storage', 'Cleaned up old daily activity data');
  }
};