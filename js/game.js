/**
 * Game Module
 * Handles Flashcard logic, FSRS algorithm, and session management.
 */

let currentCard = null;
let cardStartTime = 0;
let consecutiveFailures = 0;
let sessionTimerInterval = null;
let sessionStartTimestamp = 0;

// --- FSRS v4.5 Scheduler ---
const FSRS = {
  p: [
    0.40255, 1.18385, 3.173, 15.69105, 7.19605, 0.5345, 1.4601, 0.0046, 1.54575,
    0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655,
    0.6621,
  ],

  calculate(stats, rating) {
    const now = Date.now();
    // rating: 1=Again, 2=Hard, 3=Good, 4=Easy

    if (!stats || !stats.stability) {
      // Initial Review
      let d = this.p[4] - this.p[5] * (rating - 3);
      d = Math.max(1, Math.min(10, d));
      let s = this.p[rating - 1];
      return {
        stability: s,
        difficulty: d,
        lastReview: now,
        dueDate: now + s * 86400000,
      };
    }

    const elapsedDays = Math.max(0, (now - stats.lastReview) / 86400000);
    const r = Math.pow(1 + (19 * elapsedDays) / stats.stability, -1);

    // Update Difficulty
    let d =
      stats.difficulty -
      this.p[6] * (rating - 3) -
      this.p[7] * (10 - stats.difficulty) * (1 - r);
    d = Math.max(1, Math.min(10, d));

    // Update Stability
    let s = stats.stability;
    if (rating === 1) {
      s =
        this.p[11] *
        Math.pow(d, -this.p[12]) *
        (Math.pow(s + 1, this.p[13]) - 1) *
        Math.exp(this.p[14] * (1 - r));
    } else {
      let mod = 1;
      if (rating === 2) mod = this.p[15];
      if (rating === 4) mod = this.p[16];
      s =
        s *
        (1 +
          Math.exp(this.p[8]) *
            (11 - d) *
            Math.pow(s, -this.p[9]) *
            (Math.exp(this.p[10] * (1 - r)) - 1) *
            mod);
    }
    s = Math.max(0.1, s);

    return {
      stability: s,
      difficulty: d,
      lastReview: now,
      dueDate: now + s * 86400000,
    };
  },
};

function startFlashcards() {
  const modal = document.getElementById("flashcards-modal");
  if (modal) {
    // Check daily limit before starting
    if (userProgress.dailyCount >= dailyLimit && !bypassLimit) {
      openModal("daily-limit-modal");
      return;
    }

    modal.showModal();
    consecutiveFailures = 0;
    document.body.style.overflow = "hidden";
    modal.addEventListener(
      "close",
      () => {
        stopSessionTimer();
        if (document.querySelectorAll("dialog[open]").length === 0)
          document.body.style.overflow = "";
      },
      { once: true }
    );
    updateProgressUI();
    loadNextCard();
    startSessionTimer();
    initSwipeGestures();

    document
      .querySelectorAll(".flashcard-controls .btn")
      .forEach((btn) => (btn.disabled = false));
  }
}

function loadNextCard() {
  const perfStart = performance.now();
  if (typeof flashcards !== "undefined" && flashcards.length > 0) {
    const now = Date.now();

    const dueCards = flashcards.filter(
      (c) => userProgress.cards[c.id] && userProgress.cards[c.id].dueDate <= now
    );
    const newCards = flashcards.filter((c) => !userProgress.cards[c.id]);

    const currentHour = new Date().getHours();
    const hourStat = userProgress.hourlyStats[currentHour];
    const isPeakTime =
      hourStat &&
      hourStat.attempts > 5 &&
      hourStat.correct / hourStat.attempts > 0.8;

    const difficultyWeight = isPeakTime ? 4 : 1.5;

    if (dueCards.length > 0) {
      dueCards.sort((a, b) => {
        const statsA = userProgress.cards[a.id];
        const statsB = userProgress.cards[b.id];
        const overdueA = Math.max(0, now - statsA.dueDate);
        const overdueB = Math.max(0, now - statsB.dueDate);
        const scoreA = statsA.difficulty * difficultyWeight + overdueA / 86400000;
        const scoreB = statsB.difficulty * difficultyWeight + overdueB / 86400000;
        return scoreB - scoreA + (Math.random() * 0.5 - 0.25);
      });
      currentCard = dueCards[0];
    } else if (newCards.length > 0) {
      currentCard = newCards[Math.floor(Math.random() * newCards.length)];
    } else {
      const reviewAhead = flashcards.filter((c) => userProgress.cards[c.id]);
      reviewAhead.sort(
        (a, b) => userProgress.cards[a.id].dueDate - userProgress.cards[b.id].dueDate
      );
      currentCard = reviewAhead[0] || flashcards[Math.floor(Math.random() * flashcards.length)];
      showToast("Reviewing Ahead", "No cards due right now.", "info");
    }

    cardStartTime = Date.now();

    const cardElement = document.querySelector(".flashcard");
    cardElement.classList.remove("is-flipped");
    // Reset swipe transform
    cardElement.style.transition = 'none';
    cardElement.style.transform = '';
    void cardElement.offsetWidth; // Force reflow
    cardElement.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

    document.querySelector(".korean-word").textContent = currentCard.korean;
    document.querySelector(".english-word").textContent = currentCard.english;
    const romEl = document.querySelector(".romanization-word");
    if (romEl) {
      romEl.textContent = currentCard.romanization;
      romEl.style.display = showRomanization ? "block" : "none";
    }

    const statusEl = document.querySelector(".card-status");
    if (statusEl) {
      statusEl.className = "card-status";
      const stats = userProgress.cards[currentCard.id];
      if (!stats || !stats.stability) {
        statusEl.classList.add("new");
        statusEl.innerHTML = '<span class="material-icons-round">auto_awesome</span><span>New</span>';
      } else {
        const days = Math.round(stats.stability);
        if (days >= 7) {
          statusEl.classList.add("mature");
          statusEl.innerHTML = `<span class="material-icons-round">spa</span><span>${days}d</span>`;
        } else {
          statusEl.classList.add("learning");
          statusEl.innerHTML = `<span class="material-icons-round">school</span><span>${days}d</span>`;
        }
      }
    }
  }
  const perfDuration = performance.now() - perfStart;
}

function rateCard(rating) {
  if (currentCard) {
    const cardId = currentCard.id;
    const now = Date.now();
    const currentHour = new Date().getHours();
    const responseTime = now - cardStartTime;
    const effectiveTime = Math.min(responseTime, 120000);
    userProgress.totalStudyTime = (userProgress.totalStudyTime || 0) + effectiveTime;

    const ratingMap = { again: 1, hard: 2, good: 3, easy: 4 };
    const numericRating = ratingMap[rating] || 3;

    if (rating === "again") {
      consecutiveFailures++;
      if (consecutiveFailures >= 5) {
        showToast("Take a Break?", "You've missed 5 cards in a row. A short rest helps memory consolidation!", "warning");
        consecutiveFailures = 0;
      }
    } else {
      consecutiveFailures = 0;
    }

    if (!userProgress.hourlyStats[currentHour])
      userProgress.hourlyStats[currentHour] = { attempts: 0, correct: 0 };
    userProgress.hourlyStats[currentHour].attempts++;
    if (rating !== "again") userProgress.hourlyStats[currentHour].correct++;

    const todayKey = new Date().toISOString().split("T")[0];
    userProgress.dailyActivity[todayKey] = (userProgress.dailyActivity[todayKey] || 0) + 1;

    const currentStats = userProgress.cards[cardId];
    
    // Performance Monitoring for Algorithm
    const calcStart = performance.now();
    const newStats = FSRS.calculate(currentStats, numericRating);
    const calcEnd = performance.now();
    if (window.AppPerformance && window.AppPerformance.track) window.AppPerformance.track('FSRS_Calc', calcEnd - calcStart);

    const status = newStats.stability >= 21 ? "mature" : "learning";

    userProgress.cards[cardId] = { ...newStats, status: status, reviews: (currentStats?.reviews || 0) + 1 };

    const baseXp = { again: 5, hard: 10, good: 15, easy: 20 }[rating] || 10;
    const difficulty = currentStats?.difficulty || 5;
    const difficultyMult = 1 + difficulty / 10;
    let speedBonus = 0;
    if (rating !== "again") {
      if (responseTime < 3000) speedBonus = 5;
      else if (responseTime < 6000) speedBonus = 2;
    }
    if (speedBonus > 0) showSpeedBonus(speedBonus);

    userProgress.xp += Math.round(baseXp * difficultyMult + speedBonus);

    const today = new Date().toDateString();
    if (userProgress.lastStudyDate !== today) {
      userProgress.streak = userProgress.lastStudyDate === new Date(Date.now() - 86400000).toDateString() ? userProgress.streak + 1 : 1;
      userProgress.lastStudyDate = today;
    }

    if (rating !== "again") userProgress.dailyCount++;
    saveUserProgress();
  }

  updateProgressUI();

  if (userProgress.dailyCount >= dailyLimit) {
    if (bypassLimit) {
      triggerConfetti();
      enableBypassAndStart(true); // Auto-extend
    } else {
      triggerConfetti();
      setTimeout(() => {
        closeModal("flashcards-modal");
        const countEl = document.getElementById("goal-complete-count");
        if (countEl) countEl.textContent = userProgress.dailyCount;
        openModal("daily-goal-complete-modal");
      }, 1000);
      return;
    }
  }
  loadNextCard();
}

function startSessionTimer() {
  stopSessionTimer();
  sessionStartTimestamp = Date.now();
  const timerEl = document.getElementById("session-timer");
  if (timerEl) timerEl.textContent = "00:00";
  const warningEl = document.getElementById("fatigue-warning");
  if (warningEl) warningEl.style.display = "none";

  sessionTimerInterval = setInterval(() => {
    const now = Date.now();
    const elapsedSec = Math.floor((now - sessionStartTimestamp) / 1000);
    const minutes = Math.floor(elapsedSec / 60);
    const seconds = elapsedSec % 60;
    if (timerEl) timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    if (fatigueDetection && minutes >= sessionLength && warningEl && warningEl.style.display === "none") warningEl.style.display = "flex";
  }, 1000);
}

function stopSessionTimer() {
  if (sessionTimerInterval) {
    clearInterval(sessionTimerInterval);
    sessionTimerInterval = null;
  }
}

function initSwipeGestures() {
  const card = document.querySelector('.flashcard');
  if (!card || card.dataset.swipeInitialized) return;

  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    card.style.transition = 'none';
  }, { passive: true });

  card.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Visual feedback
    const rotate = diff * 0.05;
    card.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;
    
    // Prevent scrolling if horizontal swipe is detected
    if (Math.abs(diff) > 10 && e.cancelable) {
      e.preventDefault();
    }
  }, { passive: false });

  card.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease';
    
    const diff = currentX - startX;
    const threshold = 100;

    if (diff > threshold) {
      rateCard('good');
    } else if (diff < -threshold) {
      rateCard('again');
    } else {
      card.style.transform = '';
    }
  });
  
  card.dataset.swipeInitialized = 'true';
}