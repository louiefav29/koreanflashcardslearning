# Korean Flashcards Learning (KFL)

A Progressive Web App (PWA) for learning Korean vocabulary using Spaced Repetition System (SRS).

## Features
- **Flashcards**: Interactive cards with Hangul, Romanization, and English.
- **FSRS Algorithm**: Advanced scheduling based on performance.
- **Analytics**: Heatmaps, hourly performance, and retention metrics.
- **PWA**: Offline support, installable on mobile/desktop.

## Setup
1. Clone the repository.
2. Serve the root directory using a static file server (e.g., Live Server).
3. Open `index.html` in your browser.

## Architecture
- **Core**: `js/script.js` (Controller), `js/game.js` (Logic), `js/state-manager.js` (Data).
- **UI**: `js/ui-utils.js`, `js/settings-ui.js`, `js/stats-ui.js`.
- **Data**: `js/flashcards-data.js`, `patchNote.json`.

## Testing
1. Open `tests.html` in your browser.
2. Open the Developer Console (F12).
3. Review test results.