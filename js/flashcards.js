// Initialize flashcards with merge logic
// Fallback if storage module failed to load
const getStorage = typeof safeStorageGet !== 'undefined' ? safeStorageGet : (key) => {
  try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
};
const setStorage = typeof safeStorageSet !== 'undefined' ? safeStorageSet : (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
};

if (typeof window.STORAGE_KEYS === 'undefined') {
  window.STORAGE_KEYS = {
    USER_PROGRESS: 'kfl_user_progress',
    FLASHCARDS: 'kfl_flashcards_deck',
    SETTINGS: 'kfl_settings',
    PROFILE: 'kfl_profile',
    PATCH_VERSION: 'kfl_last_patch_version'
  };
}

let flashcards = null;
const savedCards = getStorage(STORAGE_KEYS.FLASHCARDS);

if (savedCards && Array.isArray(savedCards)) {
  // Merge saved data with default cards to preserve progress while allowing code updates (e.g. typo fixes)
  flashcards = defaultFlashcards.map(defCard => {
    const savedCard = savedCards.find(c => c.id === defCard.id);
    // If saved card exists, preserve its spaced repetition stats
    return savedCard ? { ...defCard, nextReview: savedCard.nextReview, interval: savedCard.interval, ease: savedCard.ease } : defCard;
  });
} else {
  flashcards = defaultFlashcards;
  setStorage(STORAGE_KEYS.FLASHCARDS, flashcards);
}

// Function to save deck changes
window.saveFlashcards = function() {
  setStorage(STORAGE_KEYS.FLASHCARDS, flashcards);
}