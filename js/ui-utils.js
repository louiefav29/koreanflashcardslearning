/**
 * UI Utilities Module
 * Handles Modals, Toasts, and Sound Effects.
 */

// --- Modal Management ---

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.showModal();
    document.body.style.overflow = "hidden";
    modal.addEventListener(
      "close",
      () => {
        if (document.querySelectorAll("dialog[open]").length === 0)
          document.body.style.overflow = "";
      },
      { once: true }
    );
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.close();
  }
}

// --- Toast Notification System ---

function showToast(title, message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  let icon = "info";
  if (type === "success") icon = "check_circle";
  if (type === "warning") icon = "warning";
  if (type === "error") icon = "error";

  toast.innerHTML = `
    <i class="material-icons-round">${icon}</i>
    <div class="toast-content">
      <div class="toast-title">${window.Security ? window.Security.sanitize(title) : title}</div>
      <div class="toast-message">${window.Security ? window.Security.sanitize(message) : message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Activate Popover API to show in Top Layer
  if (container.matches("[popover]")) {
    setTimeout(() => {
      if (container.matches(":popover-open")) {
        container.hidePopover();
      }
      container.showPopover();
    }, 0);
  }

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("hiding");
    toast.addEventListener("animationend", () => toast.remove());
  }, 3000);
}

// --- Sound Effects System ---

function playSystemSound(type = "success") {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Audio context failed (e.g. user hasn't interacted yet)
  }
}