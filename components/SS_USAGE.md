# SS Component (Settings Section)

Reusable components for creating RTL/LTR compatible settings toggles.

## Components

### 1. ToggleItem
Toggle switch with automatic RTL/LTR layout support.

**Usage:**
```tsx
import { ToggleItem } from "@/components/ss"
import { Mail } from "lucide-react"

<ToggleItem
  label={t("email")}
  description={t("receiveEmailNotifications")}
  icon={<Mail className="w-5 h-5 text-blue-400" />}
  value={notifyEmail}
  onChange={() => setNotifyEmail(!notifyEmail)}
  gradientFrom="blue-500"
  gradientTo="cyan-500"
  iconBgColor="blue-500/20"
  shadowColor="blue-500/50"
  borderColor="blue-500/30"
/>
```

**Props:**
- `label`: string - Main text
- `description`: string - Secondary text
- `icon?`: ReactNode - Lucide icon component
- `emoji?`: string - Emoji alternative to icon
- `value`: boolean - Toggle state
- `onChange`: () => void - Toggle handler
- `gradientFrom?`: string - Gradient start color (default: "blue-500")
- `gradientTo?`: string - Gradient end color (default: "cyan-500")
- `iconBgColor?`: string - Icon background color (default: "blue-500/20")
- `shadowColor?`: string - Shadow color (default: "blue-500/50")
- `borderColor?`: string - Border color on hover (default: "blue-500/30")

---

### 2. SectionHeader
Section header with automatic RTL/LTR alignment.

**Usage:**
```tsx
import { SectionHeader } from "@/components/ss"
import { Bell } from "lucide-react"

<SectionHeader
  title={t("notificationChannels")}
  description={t("chooseNotificationMethod")}
  icon={<Bell className="w-5 h-5 text-blue-400" />}
/>
```

**Props:**
- `title`: string - Section title
- `description?`: string - Optional description
- `icon?`: ReactNode - Optional icon

---

### 3. CardContainer
Card wrapper with gradient background and animations.

**Usage:**
```tsx
import { CardContainer } from "@/components/ss"

<CardContainer
  gradientFrom="blue-500/10"
  gradientTo="cyan-600/10"
  borderColor="blue-500/30"
  shadowColor="blue-500/20"
>
  <div className="p-6">
    {/* Your content */}
  </div>
</CardContainer>
```

**Props:**
- `children`: ReactNode - Card content
- `gradientFrom?`: string - Background gradient start (default: "blue-500/10")
- `gradientTo?`: string - Background gradient end (default: "cyan-600/10")
- `borderColor?`: string - Border color (default: "blue-500/30")
- `shadowColor?`: string - Shadow color on hover (default: "blue-500/20")

---

### 4. useDirectionClass (Hook)
Utility hook for RTL/LTR classes.

**Usage:**
```tsx
import { useDirectionClass } from "@/components/ss"

const { isRTL, textAlign, flexDirection, justify } = useDirectionClass()

<div className={textAlign}>
  {/* Content */}
</div>
```

**Returns:**
- `isRTL`: boolean - True if current language is Arabic or Kurdish
- `textAlign`: string - "text-right" or "text-left"
- `flexDirection`: string - "flex-row-reverse" or "flex-row"
- `justify`: string - "justify-end" or "justify-start"

---

## Complete Example

```tsx
"use client"

import { useState } from "react"
import { ToggleItem, SectionHeader, CardContainer } from "@/components/ss"
import { useLanguage } from "@/hooks/useLanguage"
import { Mail, Bell, MessageSquare } from "lucide-react"

export default function NotificationSettings() {
  const { t } = useLanguage()
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)
  const [notifySMS, setNotifySMS] = useState(false)

  return (
    <CardContainer>
      <div className="p-6">
        <SectionHeader
          title={t("notificationChannels")}
          description={t("chooseNotificationMethod")}
          icon={<Bell className="w-5 h-5 text-blue-400" />}
        />
        
        <div className="space-y-3 mt-4">
          <ToggleItem
            label={t("email")}
            description={t("receiveEmailNotifications")}
            icon={<Mail className="w-5 h-5 text-blue-400" />}
            value={notifyEmail}
            onChange={() => setNotifyEmail(!notifyEmail)}
          />
          
          <ToggleItem
            label={t("pushNotifications")}
            description={t("getInstantAlerts")}
            icon={<Bell className="w-5 h-5 text-cyan-400" />}
            value={notifyPush}
            onChange={() => setNotifyPush(!notifyPush)}
            gradientFrom="cyan-500"
            gradientTo="blue-500"
            iconBgColor="cyan-500/20"
            shadowColor="cyan-500/50"
            borderColor="cyan-500/30"
          />
          
          <ToggleItem
            label={t("sms")}
            description={t("textMessageAlerts")}
            icon={<MessageSquare className="w-5 h-5 text-purple-400" />}
            value={notifySMS}
            onChange={() => setNotifySMS(!notifySMS)}
            gradientFrom="purple-500"
            gradientTo="pink-600"
            iconBgColor="purple-500/20"
            shadowColor="purple-500/50"
            borderColor="purple-500/30"
          />
        </div>
      </div>
    </CardContainer>
  )
}
```

---

## Features

✅ **RTL/LTR Support**: Automatically adjusts layout for Arabic/Kurdish (RTL) and English/Turkish (LTR)
✅ **Customizable Colors**: Full control over gradients, shadows, and borders
✅ **Icon or Emoji**: Support for both Lucide icons and emojis
✅ **Smooth Animations**: Hover effects and transitions
✅ **Responsive**: Works on all screen sizes
✅ **TypeScript**: Full type safety
✅ **Reusable**: Use anywhere in your app

---

## Supported Languages

- **English (en)**: LTR
- **Turkish (tr)**: LTR
- **Arabic (ar)**: RTL
- **Kurdish (ku)**: RTL
