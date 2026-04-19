# PWM Power System Calculator

A clean, minimal web calculator for the **PWM Power System** from **Arknights: Endfield**.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎮 What It Does

Calculates binary power distribution for a 12-bit PWM system:
- Input battery specs and required watts
- See which power slots (BRIDGE/CONVERGER) to activate
- Visual binary representation with large, clear cards

## 📐 Formula

```
total_units = battery_watts × battery_seconds ÷ 2
base_power = total_units ÷ 8
num_bits = min(floor(log₂(base_power)), 12)
max_watts = base_power - 1
adjusted_required = required_watts - 200 (PAC cost)
```

## 🎨 Features

- **12-bit maximum** — Fixed at 12 bits like the game
- **Large bit cards** — Easy to see BRIDGE (1) vs CONVERGER (0)
- **Real-time updates** — All values recalculate instantly
- **Clean design** — No clutter, just what you need
- **Dark theme** — Easy on the eyes

## 🛠️ Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- Framer Motion

## 📱 Usage

1. **Adjust inputs** on the left
2. **See max capacity** at the top
3. **View bit configuration** — Amber = BRIDGE (active), Gray = CONVERGER (inactive)
4. Each active BRIDGE contributes its watt value

---

Made for Arknights: Endfield
