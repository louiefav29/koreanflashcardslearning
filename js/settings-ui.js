function openFlashcardSettings() {
  // Reload settings to ensure UI matches saved state
  loadSettings();

  // Check Strict Mode Lock
  // Locked if: Strict Mode is ON AND (Progress > 0 AND Progress < Limit)
  const isLocked =
    strictMode &&
    userProgress.dailyCount > 0 &&
    userProgress.dailyCount < dailyLimit;

  // Optimized: Query container once and use delegation/batch update
  const modal = document.getElementById("flashcard-settings-modal");
  if (modal) {
    const interactiveElements = modal.querySelectorAll("input, button, select");
    interactiveElements.forEach(el => {
      if (!el.classList.contains("close-btn")) {
        el.disabled = isLocked;
      }
    });
    
    const lockMsg = document.getElementById("settings-lock-message");
    if (lockMsg) lockMsg.style.display = isLocked ? "block" : "none";
  }

  openModal("flashcard-settings-modal");
}

// Helper to reduce DOM queries for settings controls
function getSettingsControls() {
  const modal = document.getElementById("flashcard-settings-modal");
  if (!modal) return {};
  return {
    slider: modal.querySelector("#session-limit-slider"),
    valueDisplay: modal.querySelector("#session-limit-value"),
    toggle: modal.querySelector("#bypass-limit-toggle"),
    strictToggle: modal.querySelector("#strict-mode-toggle"),
    sessionLengthSlider: modal.querySelector("#session-length-slider"),
    sessionLengthValue: modal.querySelector("#session-length-value"),
    fatigueToggle: modal.querySelector("#fatigue-detection-toggle"),
    romanizationToggle: modal.querySelector("#romanization-toggle")
  };
}

function saveFlashcardSettings(nameChanged = false) {
  const slider = document.getElementById("session-limit-slider");

  if (slider) {
    const newLimit = parseInt(slider.value);
    // Check if lowering below current progress
    if (newLimit < userProgress.dailyCount) {
      const warningCount = document.getElementById("limit-warning-count");
      if (warningCount) warningCount.textContent = userProgress.dailyCount;
      openModal("limit-warning-modal");
      return;
    }
  }

  checkBypassAndSave(nameChanged);
}

function forceSaveFlashcardSettings() {
  closeModal("limit-warning-modal");
  checkBypassAndSave();
}

function checkBypassAndSave(nameChanged = false) {
  const toggle = document.getElementById("bypass-limit-toggle");
  // Check if enabling bypass (only if it wasn't already enabled)
  if (toggle && toggle.checked && !bypassLimit) {
    openModal("bypass-warning-modal");
    return;
  }

  performSaveSettings(nameChanged);
}

function handleStrictModeToggle(checkbox) {
  const bypassToggle = document.getElementById("bypass-limit-toggle");

  // If turning Strict Mode ON and Bypass is currently ON
  if (checkbox.checked && bypassToggle && bypassToggle.checked) {
    checkbox.checked = false; // Revert state until confirmed

    // Update modal content for Strict priority
    const modal = document.getElementById("strict-bypass-conflict-modal");
    const msg = modal.querySelector("p");
    const confirmBtn = modal.querySelector(".action-btn.confirm");

    if (msg)
      msg.textContent =
        "Strict Mode and Bypass Mode cannot be active together. Enabling Strict Mode will disable Bypass.";
    if (confirmBtn) confirmBtn.onclick = confirmStrictOverBypass;

    openModal("strict-bypass-conflict-modal");
    return;
  }

  const status = checkbox.checked ? "enabled" : "disabled";
  showToast("Strict Mode", `Strict mode ${status}`, "info");
}

function handleFatigueToggle(checkbox) {
  const status = checkbox.checked ? "enabled" : "disabled";
  showToast("Fatigue Detection", `Smart fatigue detection ${status}`, "info");
}

function handleRomanizationToggle(checkbox) {
  const status = checkbox.checked ? "enabled" : "disabled";
  showToast("Romanization", `Pronunciation guide ${status}`, "info");
}

function handleBypassToggle(checkbox) {
  const strictToggle = document.getElementById("strict-mode-toggle");

  // If turning Bypass ON and Strict Mode is currently ON
  if (checkbox.checked && strictToggle && strictToggle.checked) {
    checkbox.checked = false; // Revert state until confirmed

    // Update modal content for Bypass priority
    const modal = document.getElementById("strict-bypass-conflict-modal");
    const msg = modal.querySelector("p");
    const confirmBtn = modal.querySelector(".action-btn.confirm");

    if (msg)
      msg.textContent =
        "Strict Mode and Bypass Mode cannot be active together. Enabling Bypass Mode will disable Strict Mode.";
    if (confirmBtn) confirmBtn.onclick = confirmBypassOverStrict;

    openModal("strict-bypass-conflict-modal");
    return;
  }

  const status = checkbox.checked ? "enabled" : "disabled";
  showToast("Bypass Limit", `Bypass limit ${status}`, "info");
}

function confirmBypassSettings() {
  closeModal("bypass-warning-modal");
  performSaveSettings();
}

function resetFlashcardSettings() {
  const { slider, valueDisplay, toggle, strictToggle, sessionLengthSlider, sessionLengthValue, fatigueToggle, romanizationToggle } = getSettingsControls();

  if (slider) {
    slider.max = 50; // Reset max to default
    slider.value = DEFAULT_SETTINGS.sessionLimit;
  }
  if (valueDisplay) valueDisplay.textContent = DEFAULT_SETTINGS.sessionLimit;
  if (toggle) toggle.checked = DEFAULT_SETTINGS.bypassLimit;
  if (strictToggle) strictToggle.checked = DEFAULT_SETTINGS.strictMode;
  if (sessionLengthSlider) sessionLengthSlider.value = DEFAULT_SETTINGS.sessionLength;
  if (sessionLengthValue) sessionLengthValue.textContent = DEFAULT_SETTINGS.sessionLength;
  if (fatigueToggle) fatigueToggle.checked = DEFAULT_SETTINGS.fatigueDetection;
  if (romanizationToggle) romanizationToggle.checked = DEFAULT_SETTINGS.showRomanization;
}

function confirmResetSettings() {
  resetFlashcardSettings();

  playSystemSound("success");
  // Apply and save the reset immediately
  dailyLimit = DEFAULT_SETTINGS.sessionLimit;
  bypassLimit = DEFAULT_SETTINGS.bypassLimit;
  strictMode = DEFAULT_SETTINGS.strictMode;
  sessionLength = DEFAULT_SETTINGS.sessionLength;
  fatigueDetection = DEFAULT_SETTINGS.fatigueDetection;
  showRomanization = DEFAULT_SETTINGS.showRomanization;

  safeStorageSet(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  // Apply immediate visual change
  const romEl = document.querySelector(".romanization-word");
  if (romEl) romEl.style.display = "block";

  updateProgressUI();
  updateSettingsBadge();

  closeModal("reset-confirm-modal");
  closeModal("flashcard-settings-modal");
  showToast("Settings Reset", "All preferences restored to default", "info");
}