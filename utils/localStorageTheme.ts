const THEME_KEY = "app-theme";

export type Theme = "default" | "pink" | "blue";

/**
 * Зберегти тему в localStorage
 */
export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Помилка при збереженні теми:", error);
  }
};

/**
 * Отримати тему з localStorage
 */
export const loadTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "pink" || stored === "blue" || stored === "default") {
      return stored;
    }
    return "default";
  } catch {
    return "default";
  }
};
