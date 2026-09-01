# Hanzi Galaxy Defender — Chinese Pinyin Typing Shooter

An arcade-style sci-fi typing defense game built with **React**, **TypeScript**, **Tailwind CSS**, and **HTML5 Canvas**. Defend your orbital turret by typing standard toneless Pinyin to blast incoming Chinese character (Hanzi) meteors out of the sky!

---

## Quick Start: How to Run and Play

### Option 1: Run Locally (Web / Node.js)

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/hanzi-galaxy-defender.git
cd hanzi-galaxy-defender
```

#### 2. Install dependencies
```bash
npm install
```
*(or `bun install` / `pnpm install` / `yarn`)*

#### 3. Start the development server
```bash
npm run dev
```

#### 4. Open in your browser
Open your browser and visit:
```text
http://localhost:3000
```
*(or the local URL printed in your terminal)*

---

### Option 2: Build & Preview Production Bundle
```bash
npm run build
npm run preview
```

---

## How to Play

1. **Select a Word Pack**: 
   - Choose from pre-configured **HSK 1 through HSK 7** levels, or the **HSK 1–7 Comprehensive** master list.
   - Or click **"Upload Word List"** to import your own custom vocabulary `.txt` file.
2. **Choose a Sector**:
   - Pick your starting sector (Sector Alpha through Sector Epsilon).
3. **Target and Blast Meteors**:
   - Chinese character pods descend toward your defense shield at the bottom of the screen.
   - Type the **toneless Pinyin** (e.g., type `nihao` for **你好**, `xuexi` for **学习**, `zhongguo` for **中国**).
   - As you type, matching meteor pods will display a **Target Lock indicator (reticle)**.
   - Press **Enter** (or complete the word) to fire your laser turret!
4. **Combos & Shields**:
   - Consecutive hits build your **Streak Multiplier** ($1\times, 2\times, 3\times...$), maximizing your score.
   - Prevent meteors from breaching your orbital line to keep your **Shield Integrity** above 0%.
5. **Sector Clearance**:
   - Reach each sector's required destroyed word quota to unlock the next level and view detailed post-match statistics.

---

## ⌨️ Controls & Shortcuts

| Action | Control |
| :--- | :--- |
| **Type Pinyin** | Keyboard letters (`a`–`z`, `ü` can be typed as `v` or `u`) |
| **Fire Turret / Confirm Target** | `Enter` |
| **Clear Input / Retarget** | `Backspace` or `Escape` |
| **Pause Game** | `Escape` or the **Pause Button** in the HUD |
| **Pronunciation Playback** | Click the 🔊 speaker icon in Word List or Match End screens |

---

## Key Features

- **Dynamic Orbital Canvas**: Smooth 60 FPS HTML5 Canvas engine with responsive starfields, glowing meteors, trajectory lasers, and particle explosion FX.
- **HSK 1 to 7 Word Packs**: Comprehensive vocabulary spanning foundational characters up to advanced HSK 7–9 mastery.
  - **HSK 1 Beginner** (50 words)
  - **HSK 2 Elementary** (35 words)
  - **HSK 3 Intermediate** (35 words)
  - **HSK 4 Upper-Intermediate** (35 words)
  - **HSK 5 Advanced Fluency** (35 words)
  - **HSK 6 Proficiency** (35 words)
  - **HSK 7–9 Mastery** (35 words)
  - **HSK 1–7 Comprehensive** (250+ vocabulary pool)
- **Custom Word List Importer**: Upload and play your own `.txt` vocabulary files (supports `Hanzi Pinyin English`, tab-separated, or comma-separated formats).
- **Native Chinese Text-to-Speech (TTS)**: Hear clear, authentic native Mandarin pronunciations every time a target is destroyed.
- **Synthesized Web Audio SFX**: Pure client-side sound effects for laser fire, target locking, shield alerts, combo milestones, and explosions (no external audio assets needed).
- **Customizable Settings**:
  - Toggle English translation hints (full Hanzi-only immersion mode).
  - Adjust base projectile falling speeds ($0.5\times$ to $2.5\times$).
  - Toggle text-to-speech, sound FX, auto-clearing input, and focus modes.

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

## Custom Word File Format

You can import custom study lists via a plain `.txt` file using any of these common formats:

```text
# Format 1: Space-separated
你好 nǐ hǎo hello
谢谢 xiè xie thank you

# Format 2: Comma or Tab-separated
再见, zài jiàn, goodbye
学习, xué xí, to study

# Format 3: Hanzi only (the system auto-maps common characters)
中国
朋友
```

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for personal or educational purposes.
