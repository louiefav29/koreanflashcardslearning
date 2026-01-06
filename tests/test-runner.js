/**
 * Lightweight Test Runner
 */
const TestRunner = {
  results: { passed: 0, failed: 0 },

  describe(suiteName, fn) {
    console.group(`%c${suiteName}`, 'font-weight: bold; font-size: 1.1em; color: #667eea;');
    try {
      fn();
    } catch (e) {
      console.error('Suite failed:', e);
    }
    console.groupEnd();
  },

  it(testName, fn) {
    try {
      fn();
      console.log(`%c✓ ${testName}`, 'color: #10b981');
      this.results.passed++;
    } catch (e) {
      console.error(`%c✗ ${testName}`, 'color: #ef4444');
      console.error(e);
      this.results.failed++;
    }
  },

  expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) throw new Error(`Expected ${expected} but got ${actual}`);
      },
      toEqual(expected) {
        const strActual = JSON.stringify(actual);
        const strExpected = JSON.stringify(expected);
        if (strActual !== strExpected) throw new Error(`Expected ${strExpected} but got ${strActual}`);
      },
      toBeDefined() {
        if (actual === undefined) throw new Error(`Expected value to be defined`);
      },
      toBeGreaterThan(expected) {
        if (actual <= expected) throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    };
  }
};

window.describe = TestRunner.describe.bind(TestRunner);
window.it = TestRunner.it.bind(TestRunner);
window.expect = TestRunner.expect.bind(TestRunner);