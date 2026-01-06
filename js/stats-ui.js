function openStatsModal() {
  updateStatsModalUI();
  openModal("stats-modal");
  // Render analytics after modal opens to ensure canvas dimensions are correct
  setTimeout(renderAnalytics, 50);
}

function updateStatsModalUI() {
  const totalCards = typeof flashcards !== "undefined" ? flashcards.length : 0;
  const cardIds = Object.keys(userProgress.cards);
  const studiedCount = cardIds.length;

  let masteredCount = 0;
  let learningCount = 0;

  cardIds.forEach((id) => {
    const status = userProgress.cards[id].status;
    if (status === "mature") masteredCount++;
    if (status === "learning") learningCount++;
  });

  const newCount = Math.max(0, totalCards - studiedCount);

  // Update Numbers
  const elTotal = document.getElementById("stat-total");
  if (elTotal) elTotal.textContent = dailyLimit;

  const elStudied = document.getElementById("stat-studied");
  if (elStudied) elStudied.textContent = studiedCount;

  const elDue = document.getElementById("stat-due");
  if (elDue) {
    const now = Date.now();
    const dueCount = flashcards.filter(
      (c) => userProgress.cards[c.id] && userProgress.cards[c.id].dueDate <= now
    ).length;
    elDue.textContent = dueCount;
  }

  const elMastered = document.getElementById("stat-mastered");
  if (elMastered) elMastered.textContent = masteredCount;

  // Update Distribution Bars
  const total = totalCards || 1;
  const barNew = document.getElementById("dist-new");
  if (barNew) barNew.style.width = `${(newCount / total) * 100}%`;

  const barLearning = document.getElementById("dist-learning");
  if (barLearning)
    barLearning.style.width = `${(learningCount / total) * 100}%`;

  const barMature = document.getElementById("dist-mature");
  if (barMature) barMature.style.width = `${(masteredCount / total) * 100}%`;
}