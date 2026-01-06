function triggerConfetti() {
  const colors = ["#f59e0b", "#fbbf24", "#d97706", "#ffd700", "#fffbeb"];
  const particleCount = 60;

  // Find the active modal box to contain confetti
  const modalBox = document.querySelector("dialog[open] .modal-box");
  if (!modalBox) return;

  // Disable controls during animation to prevent clicks
  const buttons = document.querySelectorAll(".flashcard-controls .btn");
  buttons.forEach((btn) => (btn.disabled = true));

  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // Random properties
    const left = Math.random() * 100; // %
    const animDuration = Math.random() * 0.5 + 0.7; // 0.7s - 1.2s
    const size = Math.random() * 6 + 4; // 4-10px
    const color = colors[Math.floor(Math.random() * colors.length)];

    confetti.style.left = `${left}%`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.animationDuration = `${animDuration}s`;

    modalBox.appendChild(confetti);

    // Cleanup
    setTimeout(() => {
      confetti.remove();
    }, animDuration * 1000);
  }

  // Re-enable controls after animation finishes
  setTimeout(() => {
    buttons.forEach((btn) => (btn.disabled = false));
  }, 1300);
}

function showSpeedBonus(amount) {
  const scene = document.querySelector(".flashcard-scene");
  if (!scene) return;

  const bonusEl = document.createElement("div");
  bonusEl.className = "speed-bonus-indicator";
  bonusEl.innerHTML = `<span class="material-icons-round">bolt</span> Speed Bonus +${amount} XP`;

  scene.appendChild(bonusEl);

  // Cleanup
  setTimeout(() => {
    bonusEl.remove();
  }, 1200);
}

function playAudio(event) {
  if (event) event.stopPropagation();

  if (!currentCard || !currentCard.korean) return;

  // Cancel any ongoing speech to prevent overlap
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(currentCard.korean);
  utterance.lang = "ko-KR";
  utterance.rate = 0.8; // Slightly slower for better clarity
  window.speechSynthesis.speak(utterance);
}