# PWM Power System Calculator - Complete Redesign

## ✅ What's New

### Completely Simplified UI
- **Removed:** Calculations panel (unnecessary clutter)
- **Removed:** Quick presets (not needed)
- **Removed:** Extra documentation files
- **Kept:** Only what matters - inputs and bit display

### Clean Layout
```
┌─────────────────────────────────────────┐
│        Max Capacity: 4,095 W            │  ← Prominent at top
├──────────┬──────────────────────────────┤
│  Inputs  │    Power Slots (12 bits)     │  ← Main content
│  (left)  │    Large bit cards (right)   │
└──────────┴──────────────────────────────┘
```

### Huge, Clear Bit Cards
- **Size:** 128px × 160px (very large)
- **BRIDGE (1):** Solid amber background with glow
- **CONVERGER (0):** Dark gray with border
- **Labels:** Inside each card in pill badges
- **Impossible to confuse** which is which!

## 🎯 Key Features

1. **Fixed 12-bit maximum** — Consistent with game
2. **3 simple inputs** — Battery watts, duration, required watts
3. **Max capacity badge** — Shows your limit
4. **12 large bit cards** — Crystal clear BRIDGE vs CONVERGER
5. **Binary string** — Shows the full binary number
6. **Legend** — Visual guide at bottom

## 🚀 Running

Server: **http://localhost:3000**

Just refresh your browser to see the new design!

## 📁 Clean Structure

```
app/
  ├── page.tsx          # Main page (simplified)
  ├── layout.tsx        # Root layout
  └── globals.css       # Tailwind v4 config
components/
  ├── BitCard.tsx       # Individual bit (redesigned)
  ├── BitDisplay.tsx    # 12-bit display (simplified)
  ├── InputPanel.tsx    # 3 inputs only
  └── MaxWattsBadge.tsx # Max capacity
hooks/
  └── usePWMCalculator.ts # Core logic (12-bit max)
```

## 🎨 Visual Improvements

**BRIDGE cards:**
- Bright amber (#f59e0b) solid color
- Strong glow shadow
- Black text
- Impossible to miss

**CONVERGER cards:**
- Dark gray (#374151)
- Subtle border
- Gray text
- Clearly inactive

**No more confusion!**
