/**
 * Core Logic Tests
 */

// Mock Dependencies if missing in test env
if (typeof userProgress === 'undefined') {
  window.userProgress = {
    cards: {},
    hourlyStats: [],
    dailyActivity: {},
    xp: 0
  };
}

describe('FSRS Algorithm', () => {
  it('should calculate initial stats for new cards', () => {
    const result = FSRS.calculate(null, 3); // 3 = Good
    expect(result.stability).toBeGreaterThan(0);
    expect(result.difficulty).toBeDefined();
  });

  it('should increase stability on good ratings', () => {
    const initial = FSRS.calculate(null, 3);
    // Simulate 1 day passing to allow stability to grow
    initial.lastReview -= 86400000;
    const next = FSRS.calculate(initial, 3);
    expect(next.stability).toBeGreaterThan(initial.stability);
  });
});

describe('State Manager', () => {
  it('should initialize default profile', () => {
    const profile = StateManager.initProfile();
    expect(profile.name).toBeDefined();
    expect(profile.email).toBeDefined();
  });
});