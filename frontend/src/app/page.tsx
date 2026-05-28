"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { BadgesScreen } from "@/components/screens/BadgesScreen";
import { FuturePromiseScreen } from "@/components/screens/FuturePromiseScreen";
import { GrowthDashboardScreen } from "@/components/screens/GrowthDashboardScreen";
import { HomeDashboardScreen } from "@/components/screens/HomeDashboardScreen";
import { JourneyMapScreen } from "@/components/screens/JourneyMapScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { MemoriesScreen } from "@/components/screens/MemoriesScreen";
import { MissionScreen } from "@/components/screens/MissionScreen";
import { ParentDashboardScreen } from "@/components/screens/ParentDashboardScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { RegisterScreen } from "@/components/screens/RegisterScreen";
import { WelcomeScreen } from "@/components/screens/WelcomeScreen";
import { AppProvider, useApp } from "@/context/AppContext";
import { ScreenId } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ComponentType } from "react";

const FULL_WIDTH_SCREENS: ScreenId[] = ["welcome", "login", "register"];
const NO_NAV: ScreenId[] = [...FULL_WIDTH_SCREENS, "promise"];

function AppShell() {
  const { screen, navigateTo, showXpToast } = useApp();
  const isFullWidth = FULL_WIDTH_SCREENS.includes(screen);
  const showNav = !NO_NAV.includes(screen);

  const screens: Record<ScreenId, ComponentType> = {
    welcome: WelcomeScreen,
    login: LoginScreen,
    register: RegisterScreen,
    home: HomeDashboardScreen,
    profile: ProfileScreen,
    journey: JourneyMapScreen,
    missions: MissionScreen,
    badges: BadgesScreen,
    memories: MemoriesScreen,
    parent: ParentDashboardScreen,
    growth: GrowthDashboardScreen,
    promise: FuturePromiseScreen,
  };

  const Active = screens[screen] ?? WelcomeScreen;

  if (isFullWidth) {
    return (
      <AppLayout>
        <div className="app-fullscreen">
          <Active />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="app-responsive">
        {showNav && <Sidebar active={screen} onNavigate={navigateTo} />}

        <div className="app-main">
          {showNav && <MobileHeader />}
          <AnimatePresence mode="wait">
            <motion.main
              key={screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="app-main__content"
            >
              <div className="app-container">
                <Active />
              </div>
            </motion.main>
          </AnimatePresence>

          {showNav && <BottomNav active={screen} onNavigate={navigateTo} />}
        </div>

        <AnimatePresence>
          {showXpToast && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="xp-toast-global"
            >
              +30 XP 🎉
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
