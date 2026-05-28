# Language Switcher Setup Guide

## ✅ What's Been Created

1. **Translation Files**

   - `src/lib/translations/en.json` - English translations
   - `src/lib/translations/vi.json` - Vietnamese translations

2. **Language Context**

   - `src/context/LanguageContext.tsx` - Manages language state and provides `useLanguage` hook

3. **Language Switcher Component**

   - `src/components/layout/LanguageSwitcher.tsx` - UI component for switching languages

4. **Updated Layout**
   - `src/app/layout.tsx` - Wrapped with `LanguageProvider`

---

## 🚀 How to Use

### 1. **Add Language Switcher to Your Layout**

Add the `LanguageSwitcher` component to your `Sidebar`, `MobileHeader`, or any layout component:

```tsx
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function MobileHeader() {
  return (
    <header>
      {/* ... other content ... */}
      <LanguageSwitcher />
    </header>
  );
}
```

### 2. **Use Translations in Components**

Use the `useLanguage` hook to access translations:

```tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

export function WelcomeScreen() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t("screens.welcome")}</h1>
      <p>{t("common.appName")}</p>
      <button>{t("auth.loginButton")}</button>
    </div>
  );
}
```

### 3. **Get Current Language**

```tsx
const { language } = useLanguage(); // "en" or "vi"
```

### 4. **Change Language Programmatically**

```tsx
const { setLanguage } = useLanguage();

setLanguage("vi"); // Switch to Vietnamese
setLanguage("en"); // Switch to English
```

---

## 📝 Available Translation Keys

### Common

- `common.appName` - App name
- `common.language` - "Language" label
- `common.english` - "English"
- `common.vietnamese` - "Tiếng Việt"

### Navigation

- `navigation.home` - Home
- `navigation.profile` - Profile
- `navigation.journey` - Journey
- `navigation.missions` - Missions
- `navigation.badges` - Badges
- `navigation.memories` - Memories
- `navigation.parent` - Parent
- `navigation.growth` - Growth

### Authentication

- `auth.login` - Login
- `auth.register` - Register
- `auth.logout` - Logout
- `auth.loginButton` - Sign In button text
- `auth.registerButton` - Create Account button text
- `auth.invalidCredentials` - Error message
- And more...

### Dashboard

- `dashboard.totalXp` - Total XP
- `dashboard.level` - Level
- `dashboard.streak` - Current Streak
- `dashboard.progress` - Progress

### Missions

- `missions.activeMissions` - Active Missions
- `missions.completedMissions` - Completed Missions
- `missions.startMission` - Start Mission button

### Buttons

- `buttons.save` - Save
- `buttons.cancel` - Cancel
- `buttons.delete` - Delete
- `buttons.edit` - Edit

---

## 💾 Features

- ✅ Language preference saved to localStorage
- ✅ Automatic language switching across entire app
- ✅ Nested translation key support (e.g., `auth.login.button`)
- ✅ Fallback to key name if translation not found
- ✅ Both English and Vietnamese supported

---

## 📌 Example Components to Update

Here are some components you might want to update with translations:

1. **LoginScreen.tsx** - Use `t("auth.loginButton")`, `t("auth.email")`, etc.
2. **RegisterScreen.tsx** - Use `t("auth.registerButton")`, `t("auth.registerTitle")`, etc.
3. **HomeDashboardScreen.tsx** - Use `t("dashboard.totalXp")`, `t("dashboard.level")`, etc.
4. **Sidebar.tsx** - Use `t("navigation.home")`, `t("navigation.profile")`, etc.
5. **BottomNav.tsx** - Use `t("navigation.missions")`, `t("navigation.badges")`, etc.

---

## 🔧 To Add More Translations

1. Edit `src/lib/translations/en.json`
2. Add the same key to `src/lib/translations/vi.json`
3. Use in component: `t("category.key")`

Example:

```json
// en.json
{
  "newFeature": {
    "title": "New Feature",
    "description": "Description here"
  }
}

// vi.json
{
  "newFeature": {
    "title": "Tính năng mới",
    "description": "Mô tả ở đây"
  }
}

// In component
const { t } = useLanguage();
<h1>{t("newFeature.title")}</h1> // Shows "New Feature" or "Tính năng mới"
```
