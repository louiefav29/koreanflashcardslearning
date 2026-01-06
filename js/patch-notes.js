const FALLBACK_PATCH_NOTES = [
  {
    "version": "1.6",
    "title": "Code Quality & Refactoring",
    "date": "NEW",
    "changes": [
      "Refactored large files into smaller, focused modules",
      "Centralized global configuration and state variables",
      "Extracted UI logic for settings and stats into separate components"
    ]
  },
  {
    "version": "1.5",
    "title": "Analytics & Performance",
    "date": "Previous",
    "changes": [
      "User Analytics: Added learning analytics dashboard to track patterns",
      "Performance Monitoring: Implemented metrics to identify bottlenecks"
    ]
  },
  {
    "version": "1.4",
    "title": "User Experience Polish",
    "date": "Previous",
    "changes": [
      "Enhanced visual feedback for flashcard interactions",
      "Improved mobile responsiveness for settings modal",
      "Refined animations for smoother experience"
    ]
  },
  {
    "version": "1.3",
    "title": "Algorithm & Experience",
    "date": "Previous",
    "changes": [
      "Smart Algorithm: Prioritizes difficult & overdue cards",
      "Dynamic XP: Speed bonuses & difficulty rewards",
      "Fatigue System: Smart break suggestions",
      "Enhanced UI: Romanization & improved animations",
      "Voice Support: Audio pronunciation added"
    ]
  },
  {
    "version": "1.2",
    "title": "Focus & Polish Update",
    "date": "Previous",
    "changes": [
      "Strict Mode: Lock settings during study sessions",
      "Bypass Mode: Auto-extend daily goals seamlessly",
      "Visual Polish: Glass shine effects & floating animations",
      "Celebrations: Confetti & pulse animations on goal completion",
      "Improved conflict handling for settings",
      "Enhanced UI hierarchy and badges"
    ]
  },
  {
    "version": "1.1",
    "title": "Core Systems",
    "date": "Legacy",
    "changes": [
      "Added Flashcard study mode with SRS",
      "Implemented Statistics dashboard",
      "Created User Profile system"
    ]
  },
  {
    "version": "1.0",
    "title": "Initial Release",
    "date": "Legacy",
    "changes": [
      "Project setup and infrastructure",
      "Basic UI layout and navigation",
      "Korean font integration"
    ]
  }
];

async function fetchPatchData() {
  try {
    const response = await fetch("patchNote.json");
    if (!response.ok) throw new Error("Failed to fetch patch notes");
    return await response.json();
  } catch (error) {
    Logger.warn("Script:fetchPatchData", "Error fetching patch notes, using fallback data", error);
    return FALLBACK_PATCH_NOTES;
  }
}

async function showPatchNotes() {
  Logger.info("UI", "Opening patch notes...");
  openModal("patch-notes-modal");
  
  // Hide badge immediately upon opening
  const badge = document.getElementById("notification-badge");
  if (badge) {
    badge.style.display = "none";
  }

  const container = document.querySelector(".patch-notes-container");
  if (container) {
    container.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <span>Loading updates...</span>
      </div>
    `;
    
    const patches = await fetchPatchData();

    if (patches && patches.length > 0) {
      // Update local storage with the latest version found in JSON
      safeStorageSet(STORAGE_KEYS.PATCH_VERSION, patches[0].version);

      container.innerHTML = patches
        .map(
          (p) => `
        <article class="patch-entry">
          <header class="patch-header">
            <h3 class="patch-title">v${p.version} - ${p.title}</h3>
            ${p.date ? `<span class="patch-date ${p.date === 'NEW' ? 'new' : ''}">${p.date}</span>` : ""}
          </header>
          <ul class="patch-list">
            ${p.changes.map((c) => `<li class="patch-list-item"><span class="material-icons-round patch-icon">check_circle_outline</span><span>${c}</span></li>`).join("")}
          </ul>
        </article>
      `
        )
        .join("");
    } else {
      container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">Failed to load patch notes.</div>';
    }
  }
}

async function checkPatchNotes() {
  const patches = await fetchPatchData();
  
  if (patches && patches.length > 0) {
    const latestVersion = patches[0].version;
    const lastSeen = safeStorageGet(STORAGE_KEYS.PATCH_VERSION);
    const badge = document.getElementById("notification-badge");
    
    if (badge && lastSeen !== latestVersion) {
      badge.style.display = "flex";
    }

    // Update footer version to match latest patch
    const footerVersion = document.querySelector(".footer-links .version");
    if (footerVersion) {
      footerVersion.textContent = `v${latestVersion}`;
    }
  }
}