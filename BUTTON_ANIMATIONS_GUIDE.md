# Button Animations Guide - دەستپێشخەری ئەنیمەیشنی دوگمەکان

## Overview - کورتە
This guide documents all the professional button animations and transitions added to the user interface across Dashboard, Workout, Meals, Physio, and Profile sections.

ئەم دۆکیومێنتە هەموو ئەنیمەیشن و ترانسیشنە پرۆفیشناڵەکانی دوگمەکان ڕوون دەکاتەوە کە بۆ هەموو بەشەکانی یوزەر زیاد کراون.

---

## 🎨 Bottom Navigation - ناڤیگەیشنی خوارەوە

**File:** `components/app-bottom-nav.tsx`

### Features:
- ✨ **Sliding Color Indicator** - هێڵی ڕەنگاوڕەنگی خلیسکان لەسەرەوە
- 🎯 **Icon Scale & Rotate on Hover** - گەورەبوون و سووڕانی ئایکۆنەکان
- 💫 **Glow Effect on Active** - بریسکەی ڕووناکی بۆ تابی چالاک
- 🌈 **Color-Coded Tabs** - ڕەنگی تایبەت بۆ هەر تابێک:
  - Dashboard: `#10B2E3` (Cyan Blue)
  - Workout: `#9333EA` (Purple)
  - Meals: `#F59E0B` (Amber)
  - Physio: `#F43F5E` (Rose)
  - Profile: `#6366F1` (Indigo)

### Animations:
```tsx
// Icon hover: scale + rotate
group-hover:scale-110 group-hover:rotate-6

// Active tab: zoom in + fade in
animate-in zoom-in-95 fade-in-0

// Dot indicator: pulse effect
animate-pulse
```

---

## 🔘 Button Components - دوگمە کۆمپۆنێنتەکان

**File:** `components/buttons/index.tsx`

### 1. AddButton - دوگمەی زیادکردن
```tsx
// Scale on hover + glow shadow
hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]

// Icon rotation
group-hover:rotate-90
```

### 2. IconButton - دوگمەی ئایکۆن
```tsx
// Scale + rotate on hover
hover:scale-110 hover:rotate-6 active:scale-90
```

### 3. DeleteButton - دوگمەی سڕینەوە
```tsx
// Red glow on hover
hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]
```

### 4. EditButton - دوگمەی دەستکاری
```tsx
// Blue glow on hover
hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]
```

### 5. MessageButton - دوگمەی نامە
```tsx
// Cyan glow + pulse
hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] hover:animate-pulse
```

### 6. ProgressButton - دوگمەی پێشکەوتن
```tsx
// Yellow glow + bounce
hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] hover:animate-bounce
```

### 7. StartButton - دوگمەی دەستپێکردن
```tsx
// Scale + icon rotate
hover:scale-105 group-hover:rotate-12
```

---

## 📱 User Dashboard Pages - پەیجەکانی یوزەر

### Dashboard Page - `app/user-dashboard/page.tsx`

#### Stats Cards - کاردە ئاماریەکان
```tsx
// Scale + colored glow on hover
hover:scale-105 hover:shadow-[0_0_30px_rgba(color,0.3)]

// Number scale inside card
group-hover:scale-110

// Icon rotate + scale
group-hover:rotate-12 group-hover:scale-110
```

#### Recent Activity Items
```tsx
// Scale + glow on hover
hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]

// Title color change
group-hover:text-blue-400

// Badge scale
group-hover:scale-105
```

---

### Profile Page - `app/user-dashboard/profile/page.tsx`

#### Profile Card
```tsx
// Full card transformation
hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]

// Avatar animation
group-hover:scale-110 group-hover:rotate-6 
group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]

// Contact info slide
hover:translate-x-1
```

#### Input Fields
```tsx
// Parent container scale
focus-within:scale-105

// Input glow on focus
focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105
```

---

### Notifications Page - `app/user-dashboard/notifications/page.tsx`

#### Stats Cards
```tsx
// Same as dashboard stats
hover:scale-105 hover:shadow-[0_0_30px_rgba(color,0.3)]
```

#### Notification Items
```tsx
// Card hover
hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]

// Icon animation
group-hover:scale-110 group-hover:rotate-12

// Action buttons
hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(color,0.6)]
```

---

### Settings Page - `app/user-dashboard/settings\page.tsx`

#### Settings Cards
```tsx
// Card glow
hover:shadow-[0_0_30px_rgba(color,0.2)]

// Icons
hover:rotate-12 hover:scale-110
```

#### Input Fields
```tsx
// Focus animations
focus-within:scale-105
focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] focus:scale-105
```

#### Toggle Options
```tsx
// Option row hover
hover:bg-slate-800/50 hover:scale-[1.02]

// Text color change
group-hover:text-blue-400

// Checkbox scale
hover:scale-110
```

---

## 🎭 Global CSS Animations - ئەنیمەیشنە گشتیەکان

**File:** `app/globals.css`

### New Keyframes Added:

#### 1. buttonGlow
```css
@keyframes buttonGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 50px rgba(59, 130, 246, 0.3); }
}
```

#### 2. buttonPulse
```css
@keyframes buttonPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

#### 3. iconSpin
```css
@keyframes iconSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### 4. iconBounce
```css
@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

#### 5. shimmer
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Utility Classes:
```css
.animate-button-glow     /* 2s infinite glow */
.animate-button-pulse    /* 1s infinite pulse */
.animate-icon-spin       /* 1s infinite rotation */
.animate-icon-bounce     /* 0.6s infinite bounce */
.animate-shimmer         /* 2s infinite shimmer */
```

---

## 🎯 Animation Timing

### Duration Values:
- **Fast interactions**: `duration-300` (300ms)
- **Standard transitions**: `duration-500` (500ms)
- **Smooth scaling**: `ease-out` curve

### Hover Effects:
- Scale range: `1.02` to `1.10`
- Rotate angles: `6deg` to `12deg`

### Active/Press States:
- Scale down: `active:scale-95` or `active:scale-90`
- Instant rotation reset: `active:rotate-0`

---

## 💡 Best Practices - باشترین ڕێکارەکان

1. **Consistency** - یەکسانی
   - Use same animation types across similar elements
   - Maintain consistent timing (300ms for quick, 500ms for smooth)

2. **Performance** - کارایی
   - Use `transform` and `opacity` for better performance
   - Avoid animating `width`, `height`, or `margin`

3. **Accessibility** - دەستڕاگەیشتن
   - Don't rely solely on color for information
   - Ensure animations respect `prefers-reduced-motion`

4. **Visual Hierarchy** - پلەبەندی بینراو
   - Primary actions: Larger scale (1.10) + glow
   - Secondary actions: Smaller scale (1.05)
   - Icons: Subtle rotate + scale

---

## 🚀 Usage Examples - نموونەی بەکارهێنان

### Button with Scale + Glow:
```tsx
<Button className="transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
  Click Me
</Button>
```

### Card with Hover Effect:
```tsx
<Card className="transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
  <Icon className="group-hover:rotate-12 group-hover:scale-110" />
</Card>
```

### Input with Focus Glow:
```tsx
<div className="focus-within:scale-105">
  <Input className="transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" />
</div>
```

---

## 📋 Modified Files - فایلە گۆڕدراوەکان

1. ✅ `components/app-bottom-nav.tsx` - Professional sliding navigation
2. ✅ `components/buttons/index.tsx` - All button variants with animations
3. ✅ `app/globals.css` - New animation keyframes
4. ✅ `app/user-dashboard/page.tsx` - Animated stats and activities
5. ✅ `app/user-dashboard/profile/page.tsx` - Animated profile card and inputs
6. ✅ `app/user-dashboard/notifications/page.tsx` - Animated notification items
7. ✅ `app/user-dashboard/settings/page.tsx` - Animated settings options

---

## 🎨 Color Palette - پاڵەتی ڕەنگەکان

### Primary Colors:
- **Blue**: `rgba(59, 130, 246, x)` - Primary actions
- **Purple**: `rgba(147, 51, 234, x)` - Workout
- **Amber**: `rgba(245, 158, 11, x)` - Meals
- **Rose**: `rgba(244, 63, 94, x)` - Physio
- **Indigo**: `rgba(99, 102, 241, x)` - Profile
- **Green**: `rgba(34, 197, 94, x)` - Success states
- **Red**: `rgba(239, 68, 68, x)` - Destructive actions
- **Yellow**: `rgba(234, 179, 8, x)` - Warnings/Streaks
- **Cyan**: `rgba(34, 211, 238, x)` - Messages/Info

### Shadow Intensities:
- Light hover: `0.2`
- Medium focus: `0.3`
- Strong active: `0.5` to `0.6`

---

## 🔄 Future Enhancements - پێشکەوتنی داهاتوو

- [ ] Add micro-interactions for successful actions
- [ ] Implement page transition animations
- [ ] Add loading skeleton animations
- [ ] Create custom toast notifications with animations
- [ ] Add confetti effect for achievements
- [ ] Implement drag-and-drop animations for workout reordering

---

**Created:** December 2024
**Version:** 1.0
**Status:** ✅ Complete and Production Ready
