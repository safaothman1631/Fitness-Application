# RTL Notification Layout Pattern (ڕێکخستنی ئاگاکاریەکان بۆ RTL)

**Pattern Name**: `rtl-notification-layout` or `ڕێکخستنی-ئاگاکاریەکان`

## Overview
This is the standardized layout pattern for notification settings pages with RTL (Kurdish/Arabic) support.

---

## 1. Main Header Layout

```tsx
{/* Header */}
<div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
  <div className="flex flex-row-reverse items-center gap-4 mb-2 justify-end">
    <div className="text-right">
      <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-200">
        {t("pageTitle")}
      </h1>
      <p className="text-slate-400 text-sm">{t("pageDescription")}</p>
    </div>
    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
      <Icon className="w-8 h-8 text-white" />
    </div>
  </div>
</div>
```

**Structure (from right to left)**:
- ✅ Icon: Right side (ڕاست)
- ✅ Title & Description: Left side (چەپ) with `text-right` alignment
- ✅ Container: `flex-row-reverse justify-end` - aligned to right edge

---

## 2. Card Header Layout

```tsx
<CardHeader className="relative pb-4">
  <CardTitle className="text-white flex items-center gap-2 text-xl justify-end">
    <span>{t("cardTitle")}</span>
    <Icon className="w-5 h-5 text-blue-400" />
  </CardTitle>
  <p className="text-slate-400 text-sm text-right">{t("cardDescription")}</p>
</CardHeader>
```

**Structure (from right to left)**:
- ✅ Icon: Right side (ڕاست)
- ✅ Label/Title: Left of icon (چەپی ئایکۆن)
- ✅ Container: `justify-end` - aligned to right edge
- ✅ Description: `text-right` alignment

---

## 3. Notification Toggle Item Layout

```tsx
<div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
  {/* Toggle - Left Side */}
  <button
    onClick={() => handleToggle('key', value, setter)}
    className={`relative w-12 h-7 rounded-full shrink-0 ${
      value ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-slate-700"
    }`}
  >
    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white ${
      value ? 'left-6' : 'left-1'
    }`} />
  </button>

  {/* Text + Icon - Right Side (grouped) */}
  <div className="flex items-center gap-3">
    <div>
      <div className="text-white font-semibold">{t("itemTitle")}</div>
      <div className="text-xs text-slate-400">{t("itemDescription")}</div>
    </div>
    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
  </div>
</div>
```

**Structure (from right to left)**:
- ✅ Icon: Right side (ڕاست) - inside colored background circle
- ✅ Text: Middle (ناوەڕاست) - title + description vertically stacked
- ✅ Toggle Switch: Left side (چەپ)
- ✅ Container: `justify-between` - spreads toggle and content to edges
- ✅ Text + Icon grouped together with `flex items-center gap-3`

---

## 4. Toggle Switch Technical Details

```tsx
<button className={`relative w-12 h-7 rounded-full ${active ? "bg-gradient" : "bg-slate-700"}`}>
  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white ${active ? 'left-6' : 'left-1'}`} />
</button>
```

**Key Points**:
- ⚠️ Use `absolute` positioning with `left-1` / `left-6`
- ⚠️ **NEVER** use `translate-x` (breaks in RTL)
- ✅ `relative` container + `absolute` positioned circle
- ✅ Gradient when active, solid gray when inactive

---

## 5. Complete Pattern Summary

### Visual Layout (RTL View):

```
┌─────────────────────────────────────────────────────┐
│                     [Title + Description]  [Icon] ←─┤ Header (right aligned)
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                         [Card Title]  [Icon] ←──────┤ Card Header (right aligned)
│                                   [Description] ←───┤ (text-right)
│                                                     │
│  [Toggle]            [Text]  [Icon] ←──────────────┤ Notification Item
│  [Toggle]            [Text]  [Icon] ←──────────────┤
│  [Toggle]            [Text]  [Icon] ←──────────────┤
└─────────────────────────────────────────────────────┘
```

### Position Reference:
- **ڕاست (Right)**: Icon, Card icon
- **ناوەڕاست (Middle)**: Text labels & descriptions
- **چەپ (Left)**: Toggle switches

### Flex Classes:
- Main header: `flex flex-row-reverse items-center gap-4 justify-end`
- Card header: `flex items-center gap-2 justify-end`
- Toggle items: `flex items-center justify-between`
- Text + Icon group: `flex items-center gap-3`

### Text Alignment:
- Headers: `text-right`
- Descriptions: `text-right`
- Item titles: No alignment needed (inside flex container)

---

## 6. Database Integration Pattern

```tsx
// State management
const [loading, setLoading] = useState(true)
const [saving, setSaving] = useState(false)
const [value, setValue] = useState(defaultValue)

// Load on mount
useEffect(() => {
  const loadPreferences = async () => {
    try {
      const response = await fetch('/api/user/notification-preferences')
      if (response.ok) {
        const data = await response.json()
        setValue(data.preferences.key)
      }
    } finally {
      setLoading(false)
    }
  }
  loadPreferences()
}, [])

// Auto-save on toggle
const handleToggle = (key: string, currentValue: boolean, setter: Function) => {
  const newValue = !currentValue
  setter(newValue)
  savePreference(key, newValue)
}

const savePreference = async (key: string, value: boolean) => {
  try {
    await fetch('/api/user/notification-preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value })
    })
  } catch (error) {
    // Show error toast
  }
}
```

---

## 7. Color Coding Pattern

Different notification types use different gradient colors:

```tsx
// Email/Primary
bg-gradient-to-r from-blue-500 to-cyan-500

// Push Notifications
bg-gradient-to-r from-cyan-500 to-blue-500

// SMS
bg-gradient-to-r from-purple-500 to-pink-600

// Workout/Activity
bg-gradient-to-r from-purple-500 to-pink-600

// Meals/Nutrition
bg-gradient-to-r from-pink-500 to-rose-600

// Physio/Health
bg-gradient-to-r from-red-500 to-orange-600
```

---

## Usage Instructions

When user says: **"وەکو ڕێکخستنی ئاگاکاریەکان لێبکە"** or **"rtl-notification-layout"**

Apply this pattern:
1. Header with icon on right, text on left, aligned right
2. Card headers with icon on right, label on left
3. Toggle items with: Toggle (left) + Text (middle) + Icon (right)
4. All text aligned `text-right`
5. Use `flex-row-reverse` and `justify-end` for RTL
6. Toggle switches with `absolute` positioning
7. Database integration with auto-save

---

## Example Pages Using This Pattern

- `/app/notifications/page.tsx` - Reference implementation
- Future settings pages should follow this pattern for consistency

---

## Important Notes

⚠️ **RTL Compatibility**:
- Always use `flex-row-reverse` for reversing visual order
- Always use `justify-end` to align to right edge
- Always use `text-right` for text alignment
- Never use `translate-x` for toggles

✅ **Accessibility**:
- All toggles are keyboard accessible buttons
- Clear visual states (active/inactive)
- Descriptive labels and ARIA support

🎨 **Visual Consistency**:
- Gradient backgrounds for active state
- Consistent spacing (gap-3, gap-4, p-4)
- Hover effects and transitions
- Shadow and glow effects

---

**Created**: December 28, 2025  
**Last Updated**: December 28, 2025  
**Version**: 1.0
