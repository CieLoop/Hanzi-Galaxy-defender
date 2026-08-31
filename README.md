# Hanzi Galaxy Defender — Chinese Pinyin Typing Shooter

An arcade-style sci-fi typing defense game built with **React**, **TypeScript**, **Tailwind CSS**, and **HTML5 Canvas**. Defend your orbital turret by typing standard toneless Pinyin to blast incoming Chinese character (Hanzi) meteors out of the sky!

---

## Key Features

- **Dynamic Orbital Canvas**: Smooth 60 FPS HTML5 Canvas engine with responsive starfields, glowing meteors, trajectory lasers, and particle explosion FX.
- **HSK 1 to 7 Word Packs**: Comprehensive vocabulary spanning foundational characters up to advanced HSK 7–9 mastery.
  - **HSK 1 Beginner**
  - **HSK 2 Elementary**
  - **HSK 3 Intermediate**
  - **HSK 4 Upper-Intermediate**
  - **HSK 5 Advanced Fluency**
  - **HSK 6 Proficiency**
  - **HSK 7–9 Mastery**
  - **HSK 1–7 Comprehensive** (250+ vocabulary pool)
- **Custom Word List Importer**: Upload and play your own `.txt` vocabulary files (supports `Hanzi Pinyin English` or `Hanzi, Pinyin, English` formats).
- **Native Chinese Text-to-Speech (TTS)**: Hear clear, authentic native Mandarin pronunciations every time a target is destroyed.
- **Synthesized Web Audio SFX**: Pure client-side sound effects for laser fire, target locking, shield alerts, combo milestones, and explosions (no external audio assets needed).
- **Tactical Hazard Types**: Encounter standard meteors, high-speed scouts, and armored boss waves with dynamic health bars.
- **Post-Match Analytics & Vocabulary Review**: Review words encountered during your run with one-click pronunciation playback and export options.
- **Customizable Settings**:
  - Toggle English translation hints (full Hanzi-only immersion mode).
  - Adjust base projectile falling speeds ($0.5\times$ to $2.5\times$).
  - Toggle text-to-speech, sound FX, auto-clearing input, and focus modes.

---

## 🕹️ How to Play

1. Select your target **HSK Word Pack** or upload your own custom word list.
2. Select a **Sector Level** (1 to 5) or jump straight into Sector Alpha.
3. Meteors carrying Chinese characters will descend toward your base turret.
4. Type the **Pinyin** (without tone numbers or accents, e.g., type `nihao` for 你好 or `xuexi` for 学习) and press **Enter** to fire your laser turret!
5. Build high streaks to trigger score multiplier bonuses and clear each sector's word quota to advance.

---

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Graphics / Rendering**: HTML5 2D Canvas API
- **Audio**: Web Audio API (Synthesizers) + Web Speech API (Mandarin TTS)
- **Icons**: `lucide-react`
- **Animations**: `motion` (Framer Motion)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hanzi-galaxy-defender.git
   cd hanzi-galaxy-defender
