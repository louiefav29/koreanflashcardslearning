// Default Settings Configuration
const DEFAULT_SETTINGS = {
  sessionLimit: 20,
  bypassLimit: false,
  strictMode: false,
  sessionLength: 30,
  fatigueDetection: true,
  showRomanization: true
};

// Global State
let dailyLimit = DEFAULT_SETTINGS.sessionLimit;
let bypassLimit = DEFAULT_SETTINGS.bypassLimit;
let strictMode = DEFAULT_SETTINGS.strictMode;
let sessionLength = DEFAULT_SETTINGS.sessionLength;
let fatigueDetection = DEFAULT_SETTINGS.fatigueDetection;
let showRomanization = DEFAULT_SETTINGS.showRomanization;

let userProgress = {
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  dailyCount: 0,
  lastDailyDate: null,
  cards: {}, // Map of cardId -> { status: 'new'|'learning'|'mature', reviews: 0 }
  quizzesCompleted: 0,
  typingTestsCompleted: 0,
  hourlyStats: Array.from({ length: 24 }, () => ({ attempts: 0, correct: 0 })), // 0-23h stats
  dailyActivity: {}, // "YYYY-MM-DD": count
  totalStudyTime: 0, // Total time spent studying in ms
};