/**
 * State Manager
 * Centralizes state management for the application.
 */
const StateManager = {
  KEYS: {
    PROFILE: 'kfl_user_profile'
  },

  DEFAULTS: {
    USER: {
      name: "Guest User",
      email: "guest@kfl.app",
      joined: new Date().toLocaleDateString()
    }
  },

  getUserProfile() {
    try {
      const stored = localStorage.getItem(this.KEYS.PROFILE);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      if (window.Logger) window.Logger.error("StateManager:getUserProfile", "Failed to load profile", e);
      else console.error("Error reading profile:", e);
      return null;
    }
  },

  saveUserProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
  },

  initProfile() {
    let profile = this.getUserProfile();
    if (!profile) {
      // Migration support
      const oldName = localStorage.getItem("kfl_display_name");
      profile = oldName ? { ...this.DEFAULTS.USER, name: oldName } : this.DEFAULTS.USER;
      this.saveUserProfile(profile);
    }
    return profile;
  },

  updateProfile(updates) {
    if (window.Security) {
      if (updates.email !== undefined && !window.Security.validateEmail(updates.email)) {
        throw new Error("Invalid email format");
      }
      if (updates.name !== undefined && !window.Security.validateName(updates.name)) {
        throw new Error("Invalid name format (2-50 characters)");
      }
    }
    const current = this.getUserProfile() || this.DEFAULTS.USER;
    const updated = { ...current, ...updates };
    this.saveUserProfile(updated);
    return updated;
  }
};

window.StateManager = StateManager;