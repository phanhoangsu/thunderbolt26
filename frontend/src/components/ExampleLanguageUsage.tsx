"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * EXAMPLE COMPONENT - Shows how to use translations in your app
 *
 * Usage Pattern:
 * 1. Import useLanguage hook
 * 2. Call useLanguage() to get the t function
 * 3. Use t("key.path") for any text that needs translation
 * 4. Language changes are instant across the entire app!
 */

export function ExampleLanguageUsage() {
  const { t, language } = useLanguage();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("screens.welcome")} 👋</h1>

      {/* Current Language Display */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600">
          {t("common.language")}:{" "}
          <span className="font-bold text-blue-600">
            {language.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Example 1: Using Navigation Translations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("common.appName")}</h2>
        <div className="space-y-2 bg-gray-50 p-4 rounded">
          <p>🏠 {t("navigation.home")}</p>
          <p>👤 {t("navigation.profile")}</p>
          <p>🗺️ {t("navigation.journey")}</p>
          <p>⚔️ {t("navigation.missions")}</p>
          <p>🏅 {t("navigation.badges")}</p>
          <p>📸 {t("navigation.memories")}</p>
        </div>
      </section>

      {/* Example 2: Using Authentication Translations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t("auth.loginTitle")}</h2>
        <div className="space-y-3 bg-gray-50 p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("auth.email")}
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("auth.password")}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded font-medium">
            {t("auth.loginButton")}
          </button>
        </div>
      </section>

      {/* Example 3: Using Dashboard Translations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("dashboard.yourStats")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 rounded">
            <p className="text-sm text-gray-600">{t("dashboard.totalXp")}</p>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded">
            <p className="text-sm text-gray-600">{t("dashboard.level")}</p>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-50 p-4 rounded">
            <p className="text-sm text-gray-600">{t("dashboard.streak")}</p>
            <p className="text-2xl font-bold">7 days</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded">
            <p className="text-sm text-gray-600">{t("dashboard.progress")}</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
        </div>
      </section>

      {/* Example 4: Using Buttons Translations */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button Examples</h2>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            {t("buttons.save")}
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded">
            {t("buttons.cancel")}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            {t("buttons.delete")}
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            {t("buttons.edit")}
          </button>
        </div>
      </section>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-800">
          ✅ <strong>How it works:</strong> Click the language switcher (EN/VI
          button) at the top of the page. All text on this page will instantly
          switch between English and Vietnamese!
        </p>
      </div>
    </div>
  );
}
