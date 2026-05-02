// import { create } from "zustand";
// import { saveTheme, loadTheme, Theme } from "@/utils/localStorageTheme";

// interface ThemeState {
//   theme: Theme;
//   setThemeByGender: (gender: "boy" | "girl" | "unknown") => void;
// }

// export const useThemeStore = create<ThemeState>((set) => ({
//   theme: loadTheme(),
//   setThemeByGender: (gender) => {
//     let theme: Theme = "default";

//     if (gender === "boy") theme = "blue";
//     if (gender === "girl") theme = "pink";

//     document.body.classList.remove("theme-pink", "theme-blue");
//     if (theme === "pink") document.body.classList.add("theme-pink");
//     if (theme === "blue") document.body.classList.add("theme-blue");

//     saveTheme(theme);
//     set({ theme });
//   },
// }));