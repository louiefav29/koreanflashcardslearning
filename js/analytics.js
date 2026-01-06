/**
 * Analytics Module
 * Handles data visualization and performance monitoring.
 */

function renderAnalytics() {
  renderHeatmap();
  renderHourlyChart();
  calculateMetrics();
}

function calculateMetrics() {
  // 1. Peak Time
  let bestHour = -1;
  let maxScore = -1;
  userProgress.hourlyStats.forEach((stat, hour) => {
    if (stat.attempts > 5) {
      const score = (stat.correct / stat.attempts) * Math.log(stat.attempts);
      if (score > maxScore) {
        maxScore = score;
        bestHour = hour;
      }
    }
  });

  const peakEl = document.getElementById("metric-peak-time");
  if (peakEl) {
    if (bestHour !== -1) {
      const ampm = bestHour >= 12 ? "PM" : "AM";
      const displayHour = bestHour % 12 || 12;
      peakEl.textContent = `${displayHour} ${ampm}`;
    } else {
      peakEl.textContent = "N/A";
    }
  }

  // 2. Retention Rate
  const totalStudied = Object.keys(userProgress.cards).length;
  const matureCount = Object.values(userProgress.cards).filter(
    (c) => c.status === "mature"
  ).length;
  const retentionEl = document.getElementById("metric-retention");
  if (retentionEl) {
    const rate = totalStudied > 0 ? Math.round((matureCount / totalStudied) * 100) : 0;
    retentionEl.textContent = `${rate}%`;
  }

  // 3. Velocity
  const totalAttempts = userProgress.hourlyStats.reduce((acc, curr) => acc + curr.attempts, 0);
  const velocityEl = document.getElementById("metric-velocity");
  if (velocityEl) {
    const hours = (userProgress.totalStudyTime || 0) / 3600000;
    const velocity = hours > 0 ? Math.round(totalAttempts / hours) : 0;
    velocityEl.textContent = velocity;
  }
}

function renderHeatmap() {
  const canvas = document.getElementById("study-heatmap");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const cellSize = 12;
  const gap = 4;
  const weeks = 52;
  const days = 7;

  canvas.width = (cellSize + gap) * weeks;
  canvas.height = (cellSize + gap) * days;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - weeks * 7);

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + w * 7 + d);
      const dateKey = currentDate.toISOString().split("T")[0];
      const count = userProgress.dailyActivity[dateKey] || 0;

      let color = "rgba(255, 255, 255, 0.05)";
      if (count > 0) color = "rgba(16, 185, 129, 0.3)";
      if (count > 10) color = "rgba(16, 185, 129, 0.6)";
      if (count > 25) color = "rgba(16, 185, 129, 1.0)";

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(w * (cellSize + gap), d * (cellSize + gap), cellSize, cellSize, 2);
      ctx.fill();
    }
  }
}

function renderHourlyChart() {
  const canvas = document.getElementById("performance-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = 150;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / 24 - 4;
  const maxAttempts = Math.max(...userProgress.hourlyStats.map((s) => s.attempts), 10);

  userProgress.hourlyStats.forEach((stat, hour) => {
    const x = hour * (canvas.width / 24);
    const height = (stat.attempts / maxAttempts) * (canvas.height - 20);
    const accuracy = stat.attempts > 0 ? stat.correct / stat.attempts : 0;

    let color = "#5b8af0";
    if (accuracy > 0.8) color = "#10b981";
    if (accuracy < 0.5 && stat.attempts > 0) color = "#ef4444";

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x + 2, canvas.height - height, barWidth, height, 4);
    ctx.fill();

    if (hour % 6 === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "10px sans-serif";
      ctx.fillText(`${hour}h`, x, canvas.height - height - 5);
    }
  });
}

window.AppPerformance = {
  init() {
    if ("PerformanceObserver" in window) {
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            Logger.warn('Perf', `Long Task: ${Math.round(entry.duration)}ms`);
          }
        }).observe({ entryTypes: ["longtask"] });

        // 2. Paint Timing (First Paint, First Contentful Paint)
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            Logger.info('Perf', `${entry.name}: ${Math.round(entry.startTime)}ms`);
          }
        }).observe({ entryTypes: ["paint"] });
      } catch (e) {}
    }
  },

  track(metricName, duration) {
    Logger.info('Perf', `${metricName}: ${duration.toFixed(2)}ms`);
  }
};