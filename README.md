# Front‑End Coding Challenge

(Vue 3 + TypeScript)

Build a small single‑page application that presents characters from the public **Rick & Morty API** (https://rickandmortyapi.com/api/character).

## Core requirements

- Overview page that shows a paginated character list.
- Each list item has a **Delete** button; once deleted the character disappears immediately **and** stays gone after a page reload even when the API still returns it.
- Clicking a character opens a detail view with an image and further information.

Beyond that the choice of tooling, libraries, architecture, styling, state management and testing approach is completely up to you. Feel free to lean on modern productivity helpers —generators, code assistants— whatever gets the job done efficiently.

## Repository & workflow

- You receive an empty repository with this README on main.
- Work on feature/bug‑style branches; when you're happy, surface your changes in the usual collaboration‑friendly way so they can be reviewed at a glance.
- Keep commits small, meaningful and in English.
- Add unit or end‑to‑end tests where they add value; aim for relevance, not coverage numbers.
- At the end of this file include concise instructions on how to install, run and test the project.

## Small Tip

Characters you delete may appear again on later API pages. Make sure they never re‑appear **without pre‑loading the entire dataset**. But: the page size must stay fixed — so simply skipping deleted items isn't enough :)

## Working time

**This exercise is intentionally tight.** Budget **≈ 4–6 net hours (hard cap 8 h)** and stop when the box is empty. It is *not* a failure if some features remain unfinished—well‑structured, readable code and a clear Git history matter more than 100 % coverage.

When the time‑box ends, simply push what you have.

## Quick start

Good luck & have fun!




Thamks a lot!





🧩Installation & Run Instructions

Requirements :

Node.js version 18+

npm (comes with Node.js)

Setup:

# Install dependencies
npm install

# Start local development server
npm run dev

After running, the app will be available at: http://localhost:5173

# Tech Stack & Implementation

This project was built using:


Vue 3 with Composition API

TypeScript for type safety

Vite for fast development server and build process

LocalStorage API to persist deleted character IDs between reloads

Fetch API to load paginated character data from the Rick and Morty API

Scoped CSS for styling components



Features implemented:


Paginated list of characters (20 per page)

Characters can be deleted and stay deleted across reloads

Deleted characters never reappear — even if they’re returned by the API on later pages

Modal opens with detailed character info (including nested data from additional JSON endpoints)

Separate modal displays deleted characters with ability to restore

Clear Git history with feature-based branches and meaningful commit messages



