"use client";

import { create } from "zustand";

type Theme = "default" | "pink" | "blue";
type Gender = "boy" | "girl" | "unknown";

/** Значення статі в формі редагування профілю */
export type ProfileChildGender = "male" | "female" | "unspecified";

const THEME_KEY = "app-theme";
const GENDER_KEY = "child-gender";
const isBrowser = typeof window !== "undefined";

const saveTheme = (theme: Theme) => {
  if (!isBrowser) return;
  localStorage.setItem(THEME_KEY, theme);
};

const loadTheme = (): Theme => {
  if (!isBrowser) return "default";
  return (localStorage.getItem(THEME_KEY) as Theme) || "default";
};

const loadGender = (): Gender => {
  if (!isBrowser) return "unknown";
  return (localStorage.getItem(GENDER_KEY) as Gender) || "unknown";
};

interface ThemeState {
  theme: Theme;
  initTheme: () => void;
  updateThemeOnServer: (theme: Theme) => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: loadTheme(),

  initTheme: () => {
    if (!isBrowser) return;
    const gender = loadGender();
    let theme: Theme = "default";

    if (gender === "boy") theme = "blue";
    if (gender === "girl") theme = "pink";

    document.body.classList.remove("theme-pink", "theme-blue");
    if (theme === "pink") document.body.classList.add("theme-pink");
    if (theme === "blue") document.body.classList.add("theme-blue");

    saveTheme(theme);
    set({ theme });
  },

  updateThemeOnServer: async (theme: Theme) => {
    if (!isBrowser) return;
    // Тема лише на клієнті: PATCH /api/profile проксується на /api/users/current і
    // очікує поля профілю (name, email, gender, dueDate) — тіло { theme } давало 400.
    document.body.classList.remove("theme-pink", "theme-blue");
    if (theme === "pink") document.body.classList.add("theme-pink");
    if (theme === "blue") document.body.classList.add("theme-blue");

    saveTheme(theme);
    set({ theme });
  },
}));

/** Тема сторінки за статтю дитини (як на онбордингу). */
export function applyProfileChildGenderTheme(gender: ProfileChildGender) {
  if (!isBrowser) return;

  const lsGender: Gender =
    gender === "male" ? "boy" : gender === "female" ? "girl" : "unknown";
  localStorage.setItem(GENDER_KEY, lsGender);

  const theme: Theme =
    gender === "female" ? "pink" : gender === "male" ? "blue" : "default";

  document.body.classList.remove("theme-pink", "theme-blue");
  if (theme === "pink") document.body.classList.add("theme-pink");
  if (theme === "blue") document.body.classList.add("theme-blue");

  saveTheme(theme);
  useThemeStore.setState({ theme });
}