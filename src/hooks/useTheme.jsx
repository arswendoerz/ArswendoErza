import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "theme";

const THEME_COLORS = {
  dark: "#070C16",
  light: "#F6F8FC",
};

const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const storedTheme = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // private mode / storage blocked
    return null;
  }
};

const initialTheme = () => {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : systemTheme();
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  // apply to the document
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme") === theme) return;

    root.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);

    // brief global colour cross-fade, then get out of the way
    root.classList.add("theme-switching");
    const timer = setTimeout(() => root.classList.remove("theme-switching"), 320);
    return () => clearTimeout(timer);
  }, [theme]);

  // follow the OS while the visitor has not picked a side
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!storedTheme()) setTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore — the theme still applies for this session
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, toggle, isDark: theme === "dark" }),
    [theme, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
};

export default useTheme;
