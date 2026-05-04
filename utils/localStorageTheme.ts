"use client";

import { create } from "zustand";
import axios from "axios";

type Theme = "default" | "pink" | "blue";
type Gender = "boy" | "girl" | "unknown";

const THEME_KEY = "app-theme";
const GENDER_KEY = "child-gender";

const saveTheme = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

const loadTheme = (): Theme => {
  return (localStorage.getItem(THEME_KEY) as Theme) || "default";
};

const loadGender = (): Gender => {
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
    try {
      // дістаємо токен з auth-storage
      const auth = JSON.parse(localStorage.getItem("auth-storage") || "{}");
      const token = auth?.state?.token;

      await axios.patch(
        "/api/users/theme",
        { theme },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // локально застосовуємо тему
      document.body.classList.remove("theme-pink", "theme-blue");
      if (theme === "pink") document.body.classList.add("theme-pink");
      if (theme === "blue") document.body.classList.add("theme-blue");

      saveTheme(theme);
      set({ theme });
    } catch (err) {
      console.error("Не вдалося оновити тему:", err);
    }
  },
}));