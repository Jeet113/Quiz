# 🕵️‍♂️ SHERLOCKED — CUET Career Club On-Spot Quiz Competition

> **Official On-Spot Live Competition Platform**  
> Organized by **CUET Career Club** • **Club Fest 2026**  
> *Think Fast. Deduce Smart. Solve All 5 Investigation Steps.*

---

## 🌟 Overview

**SHERLOCKED** is an interactive, competition-grade on-spot quiz platform designed for live stage events and university club fests. Styled with a **"Dark Detective × Gold × Cinematic Investigation Room"** aesthetic, it delivers a high-stakes, game-show-like investigation experience.

---

## 🎮 Game Rules & Architecture

### 📊 5-Step Case Difficulty & Scoring Architecture

| Step | Difficulty Level | Questions | Fixed Points / Q | Step Max Points |
| :---: | :--- | :---: | :---: | :---: |
| **Step 1** | **Easy** | Q1 – Q3 (3 Questions) | **10 pts** | 30 pts |
| **Step 2** | **Easy Medium** | Q4 – Q6 (3 Questions) | **15 pts** | 45 pts |
| **Step 3** | **Medium** | Q7 – Q9 (3 Questions) | **20 pts** | 60 pts |
| **Step 4** | **Medium Hard** | Q10 – Q12 (3 Questions) | **25 pts** | 75 pts |
| **Step 5** | **Hard** | Q13 – Q15 (3 Questions) | **30 pts** | 90 pts |
| **TOTAL** | **All 5 Investigation Steps** | **15 Questions** | — | **300 MAX POINTS** |

---

### ⏱️ Time Limits & Lifelines

- **30 Seconds per Question**: Circular SVG progress countdown with visual danger warnings ($\le 10\text{s}$ Orange, $\le 5\text{s}$ Red Pulse) and manual Pause/Resume control.
- **3 Detective Lifelines**:
  1. ✂️ **50:50**: Eliminates 2 wrong answer choices.
  2. 📞 **Phone a Friend**: Launches a live 30-second phone call visualizer modal with animated audio wave pulses while automatically pausing the quiz timer.
  3. 🔄 **Switch Question**: Swaps the current question with a fresh, unused question of the exact same topic and difficulty.

---

### ⚡ Answer Feedback & Revelation System

- **Immediate Locking**: Clicking any option locks all 4 choices instantly to prevent double-submissions or misclicks.
- **Correct Selection (🟢 Green)**:
  - Turns **Green (`#39D98A`)** with soft glow and `✓` checkmark badge.
  - Displays points earned (e.g. `✓ CORRECT  +10 POINTS`).
  - Displays **`NEXT QUESTION →`** button (the quiz waits for user click or `Enter` before advancing).
- **Wrong Selection (🔴 Red)**:
  - Wrong choice turns **Red (`#FF4D5A`)** with shake animation and `✕` badge.
  - **Right Answer Highlight**: The correct option is simultaneously revealed in **Green (`✓`)**.
  - Displays **`TURN OVER`** button to transition to the Case Closed screen.

---

## 📚 12 Investigation Case Categories (300 Questions Bank)

The application features a built-in bank of **300 categorized questions** across 12 diverse fields with full Bengali language typography support:

1. 🇧🇩 **Bangladesh** — History, heritage, liberation war & geography
2. 👑 **British Rule in India** — Colonial era, freedom movement & historical acts
3. 🏆 **Sports** — Cricket, football, Olympics & athletics
4. 🌍 **International** — World geopolitics, global bodies & capitals
5. 📰 **Recent Affairs** — Global summits, current breakthroughs & news
6. 🎬 **Entertainment** — Cinema, music, awards & pop culture
7. 🔬 **Science & Technology** — Physics, chemistry, biology & tech innovations
8. 💡 **Inventions & Discoveries** — Pioneers, inventors & milestones
9. ⚖️ **Politics & Government** — Constitutions, governance & world leaders
10. 💻 **Computer & Internet** — Cyber security, programming, AI & IT
11. 🚀 **Space & Astronomy** — Planets, cosmos, NASA & space missions
12. 🧠 **IQ & Logic** — Numerical sequences, patterns & deduction puzzles

---

## 🎨 Visual Design & UI System

- **Cinematic Atmosphere**: Dual-layer background using `Assests/BackGround.jfif` with a soft 2px blur, blueprint grid lines, center gold spotlight, and vignette overlay.
- **Official Branding**: Official **CUET Career Club Logo** (`Assests/Logo_Club.png`) integrated in header, identification card, winner celebration, and ranking screen.
- **Typography**:
  - **Title / Display**: `Anton` (Google Fonts)
  - **Headings & Badges**: `Outfit` & `Space Grotesk`
  - **Bengali Questions & Options**: `Anek Bangla` & `Noto Sans Bengali`
  - **Body / Numbers**: `Inter`
- **Detective Podium & Leaderboard**:
  - Top 3 Podium (Rank 1 Gold, Rank 2 Cyan, Rank 3 Bronze)
  - Full sortable ranking table stored persistently in browser `localStorage`.

---

## 📁 Project Structure

```text
├── Assests/
│   ├── BackGround.jfif    # Detective office atmosphere wallpaper
│   └── Logo_Club.png      # Official CUET Career Club logo
├── index.html             # Single-page application markup & screens
├── script.js              # Complete quiz engine, questions bank & state management
├── style.css              # Cinematic investigation room design system
└── README.md              # Project documentation
```

---

## 🚀 How to Run Locally

Because the project is built using vanilla HTML5, CSS3, and JavaScript:

1. **Direct Browser Execution**:
   - Double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).

2. **Using a Local Server (Recommended for Live Events)**:
   ```bash
   # Using VS Code Live Server extension OR Python:
   python -m http.server 8080
   ```
   Open `http://localhost:8080` in your web browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| **`Enter`** | Submit Name on Identification Screen / Trigger **`NEXT QUESTION →`** or **`TURN OVER`** |

---

## 👥 Credits & Organizer

- **Organizer**: [CUET Career Club (CCC)](https://www.facebook.com/cuetcareerclub)
- **Event**: **Club Fest 2026**
- **Competition**: **SHERLOCKED — On-Spot Quiz Competition**
