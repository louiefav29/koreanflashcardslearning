function performSaveSettings(nameChanged = false) {
  const {
    slider,
    toggle,
    strictToggle,
    sessionLengthSlider,
    fatigueToggle,
    romanizationToggle,
  } = getSettingsControls();

  // Consolidate settings into one object
  const settings = {
    sessionLimit: slider ? parseInt(slider.value) : dailyLimit,
    bypassLimit: toggle ? toggle.checked : bypassLimit,
    strictMode: strictToggle ? strictToggle.checked : strictMode,
    sessionLength: sessionLengthSlider
      ? parseInt(sessionLengthSlider.value)
      : sessionLength,
    fatigueDetection: fatigueToggle ? fatigueToggle.checked : fatigueDetection,
    showRomanization: romanizationToggle
      ? romanizationToggle.checked
      : showRomanization,
  };

  // Update globals
  dailyLimit = settings.sessionLimit;
  bypassLimit = settings.bypassLimit;
  strictMode = settings.strictMode;
  sessionLength = settings.sessionLength;
  fatigueDetection = settings.fatigueDetection;
  showRomanization = settings.showRomanization;

  // Save to centralized storage
  safeStorageSet(STORAGE_KEYS.SETTINGS, settings);

  // Apply immediate visual change
  const romEl = document.querySelector(".romanization-word");
  if (romEl) romEl.style.display = showRomanization ? "block" : "none";

  // Update UI immediately to reflect new limit
  updateProgressUI();
  updateSettingsBadge();

  closeModal("flashcard-settings-modal");

  // Only show settings toast if name wasn't the only thing changed
  if (!nameChanged) {
    showToast(
      "Settings Saved",
      "Your preferences have been updated",
      "success"
    );
  }
}

function handleBackup() {
  try {
    const data = window.backupData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kfl_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Backup Created", "Your progress has been exported", "success");
  } catch (e) {
    showToast("Backup Failed", "Could not export data", "error");
  }
}

function handleRestore() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const success = window.restoreData(event.target.result);
        if (success) {
          showToast(
            "Restore Successful",
            "App will reload in 2 seconds...",
            "success"
          );
          setTimeout(() => window.location.reload(), 2000);
        } else {
          showToast(
            "Restore Failed",
            "No valid data found in backup",
            "warning"
          );
        }
      } catch (err) {
        showToast("Restore Failed", "Invalid backup file", "error");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function enableBypassAndStart(auto = false) {
  // Instead of infinite bypass, extend the daily limit by the current limit amount
  const extensionAmount = dailyLimit;
  dailyLimit += extensionAmount;

  // Ensure bypass is disabled so the new limit is enforced
  bypassLimit = false;

  // Save updated settings
  safeStorageSet(STORAGE_KEYS.SETTINGS, {
    sessionLimit: dailyLimit,
    bypassLimit: bypassLimit,
    strictMode,
    sessionLength,
    fatigueDetection,
    showRomanization,
  });

  // Sync UI
  const { slider, valueDisplay, toggle } = getSettingsControls();

  if (slider) {
    if (dailyLimit > parseInt(slider.max)) {
      slider.max = dailyLimit;
    }
    slider.value = dailyLimit;
  }
  if (valueDisplay) valueDisplay.textContent = dailyLimit;
  if (toggle) toggle.checked = false;

  // Update progress UI to reflect the new goal
  updateProgressUI();
  updateSettingsBadge();

  closeModal("daily-limit-modal");
  closeModal("daily-goal-complete-modal");
  if (!auto) startFlashcards();

  // Trigger pulse animation
  const bar = document.querySelector(".progress-bar-fill");
  if (bar) {
    bar.classList.remove("pulse-gold");
    void bar.offsetWidth; // Trigger reflow
    bar.classList.add("pulse-gold");
  }

  showToast(
    "Goal Extended",
    `Added ${extensionAmount} cards to your daily goal!`,
    "success"
  );
}

async function handleLogout() {
  closeModal("logout-modal");
  
  // Sign out from Supabase to invalidate session
  if (window.supabaseClient) {
    await window.supabaseClient.signOut();
  }

  document.body.classList.remove("loaded");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}

function loadUserProgress() {
  try {
    const saved = safeStorageGet(STORAGE_KEYS.USER_PROGRESS);
    if (saved) {
      userProgress = { ...userProgress, ...saved };
    }

    let migrationNeeded = false;

    // Ensure new analytics fields exist if loading old data
    if (!userProgress.hourlyStats || userProgress.hourlyStats.length !== 24) {
      userProgress.hourlyStats = Array.from({ length: 24 }, () => ({
        attempts: 0,
        correct: 0,
      }));
      migrationNeeded = true;
    }
    if (!userProgress.dailyActivity) {
      userProgress.dailyActivity = {};
      migrationNeeded = true;
    }
    if (typeof userProgress.totalStudyTime === "undefined") {
      userProgress.totalStudyTime = 0;
      migrationNeeded = true;
    }

    // Check for Daily Reset
    const today = new Date().toDateString();
    if (userProgress.lastDailyDate !== today) {
      userProgress.dailyCount = 0;
      userProgress.lastDailyDate = today;
      saveUserProgress();
    } else if (migrationNeeded) {
      saveUserProgress();
    }

    updateHeaderUI();
  } catch (e) {
    Logger.error(
      "Script:loadUserProgress",
      "Failed to initialize user progress",
      e
    );
  }
}

function loadSettings() {
  try {
    let settings = safeStorageGet(STORAGE_KEYS.SETTINGS);

    // Migration Logic: If no consolidated settings, try to load legacy individual keys
    if (!settings) {
      const legacyLimit = localStorage.getItem("kfl_session_limit");
      const legacyBypass = localStorage.getItem("kfl_bypass_limit");
      const legacyStrict = localStorage.getItem("kfl_strict_mode");
      const legacyLen = localStorage.getItem("kfl_session_length");
      const legacyFatigue = localStorage.getItem("kfl_fatigue_detection");

      if (legacyLimit || legacyBypass || legacyStrict) {
        settings = {
          sessionLimit: legacyLimit
            ? parseInt(legacyLimit)
            : DEFAULT_SETTINGS.sessionLimit,
          bypassLimit: legacyBypass === "true",
          strictMode: legacyStrict === "true",
          sessionLength: legacyLen
            ? parseInt(legacyLen)
            : DEFAULT_SETTINGS.sessionLength,
          fatigueDetection: legacyFatigue
            ? legacyFatigue === "true"
            : DEFAULT_SETTINGS.fatigueDetection,
          showRomanization: DEFAULT_SETTINGS.showRomanization,
        };
        // Save consolidated settings immediately
        safeStorageSet(STORAGE_KEYS.SETTINGS, settings);
      }
    }

    if (settings) {
      dailyLimit = settings.sessionLimit ?? DEFAULT_SETTINGS.sessionLimit;
      bypassLimit = settings.bypassLimit ?? DEFAULT_SETTINGS.bypassLimit;
      strictMode = settings.strictMode ?? DEFAULT_SETTINGS.strictMode;
      sessionLength = settings.sessionLength ?? DEFAULT_SETTINGS.sessionLength;
      fatigueDetection =
        settings.fatigueDetection ?? DEFAULT_SETTINGS.fatigueDetection;
      showRomanization =
        settings.showRomanization ?? DEFAULT_SETTINGS.showRomanization;
    }

    // Always sync UI elements with current sessionTotal
    const {
      slider,
      valueDisplay,
      toggle,
      strictToggle,
      sessionLengthSlider,
      sessionLengthValue,
      fatigueToggle,
      romanizationToggle,
    } = getSettingsControls();

    if (slider) {
      if (dailyLimit > parseInt(slider.max)) {
        slider.max = dailyLimit;
      }
      slider.value = dailyLimit;
    }
    if (valueDisplay) valueDisplay.textContent = dailyLimit;
    if (toggle) toggle.checked = bypassLimit;
    if (strictToggle) strictToggle.checked = strictMode;
    if (sessionLengthSlider) sessionLengthSlider.value = sessionLength;
    if (sessionLengthValue) sessionLengthValue.textContent = sessionLength;
    if (fatigueToggle) fatigueToggle.checked = fatigueDetection;
    if (romanizationToggle) romanizationToggle.checked = showRomanization;

    // Update "Cards Left" display immediately
    updateProgressUI();
    updateSettingsBadge();
  } catch (e) {
    Logger.error("Script:loadSettings", "Failed to load settings", e);
  }
}

function saveUserProgress() {
  safeStorageSet(STORAGE_KEYS.USER_PROGRESS, userProgress);
  updateHeaderUI();

  // Register Background Sync if available
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.sync.register("sync-progress");
      })
      .catch((err) => Logger.error("Sync", "Registration failed", err));
  }
}

function updateHeaderUI() {
  // Update streak in header
  const streakEl = document.querySelector(".streak-counter span:last-child");
  if (streakEl) streakEl.textContent = userProgress.streak;

  // Update Profile Modal Stats
  const profileStreak = document.getElementById("profile-streak");
  if (profileStreak) profileStreak.textContent = userProgress.streak;

  const profileXp = document.getElementById("profile-xp");
  if (profileXp) profileXp.textContent = userProgress.xp.toLocaleString();

  // Update Dashboard Stats
  const dashCards = document.getElementById("dash-stat-cards");
  if (dashCards) dashCards.textContent = Object.keys(userProgress.cards).length;

  const dashQuizzes = document.getElementById("dash-stat-quizzes");
  if (dashQuizzes) dashQuizzes.textContent = userProgress.quizzesCompleted || 0;

  const dashTyping = document.getElementById("dash-stat-typing");
  if (dashTyping)
    dashTyping.textContent = userProgress.typingTestsCompleted || 0;
}

function updateProgressUI() {
  requestAnimationFrame(() => {
    const percentage = Math.min(
      100,
      Math.round((userProgress.dailyCount / dailyLimit) * 100)
    );

    const bar = document.querySelector(".progress-bar-fill");
    if (bar) bar.style.width = `${percentage}%`;

    const label = document.querySelector(".progress-labels span:last-child");
    if (label) label.textContent = `${percentage}%`;

    const remainingEl = document.getElementById("cards-remaining");
    if (remainingEl)
      remainingEl.textContent = Math.max(
        0,
        dailyLimit - userProgress.dailyCount
      );
    updateSettingsBadge();
  });
}

function updateSettingsBadge() {
  const setDisplay = (id, show) => {
    const el = document.getElementById(id);
    if (el) el.style.display = show ? "flex" : "none";
  };

  setDisplay("settings-badge", bypassLimit);
  setDisplay("flashcard-settings-badge", bypassLimit);

  // Strict Mode Lock Logic
  const isLocked =
    strictMode &&
    userProgress.dailyCount > 0 &&
    userProgress.dailyCount < dailyLimit;

  setDisplay("settings-lock-badge", isLocked);
  setDisplay("flashcard-settings-lock-badge", isLocked);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize Supabase first
  let authenticated = false;
  if (window.supabaseClient) {
    await window.supabaseClient.initialize();

    // Auth Check: Redirect to login if no user session
    if (window.supabaseClient.currentUser) {
      authenticated = true;
    }
  }

  if (!authenticated) {
    window.location.href = 'login.html';
    return;
  }

  loadUserProgress();
  loadSettings();
  checkPatchNotes();
  if (typeof cleanupOldData === "function") {
    cleanupOldData();
  }
  document.body.classList.add("loaded");

  // Performance Monitoring
  AppPerformance.init();

  // PWA Install Prompt Logic
  let deferredPrompt;
  const installBtn = document.getElementById("install-btn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.classList.remove("d-none");
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      installBtn.classList.add("d-none");
    });
  }

  window.addEventListener("appinstalled", () => {
    if (installBtn) installBtn.classList.add("d-none");
    deferredPrompt = null;
    showToast("App Installed", "Thank you for installing!", "success");
  });
});
