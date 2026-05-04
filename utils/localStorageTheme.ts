import { create } from "zustand";

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
}));