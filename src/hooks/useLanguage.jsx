import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { content as en } from "../Content";
import { id } from "../Content.id";

const STORAGE_KEY = "lang";
const LANGS = ["en", "id"];

const storedLang = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(value) ? value : null;
  } catch {
    // private mode / storage blocked
    return null;
  }
};

const initialLang = () =>
  storedLang() ?? (navigator.language?.toLowerCase().startsWith("id") ? "id" : "en");

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && value.constructor === Object;

// Array items are matched by whichever identifier they carry, so a
// translation only has to list the entries (and fields) it changes.
const itemKey = (item, index) =>
  item?.name ?? item?.title ?? item?.institution ?? item?.label ?? item?.link ?? index;

/**
 * Lays a translation over the English content. Icons, images and anything
 * the translation leaves out keep their English value. Arrays of strings are
 * replaced wholesale; arrays of objects are merged item by item, either by
 * index (array override) or by identifier (object override keyed by the
 * item's English name / title / institution / label / link).
 */
const overlay = (base, over) => {
  if (over === undefined) return base;

  if (Array.isArray(base)) {
    if (Array.isArray(over)) {
      return base.every((item) => !isPlainObject(item))
        ? over
        : base.map((item, i) => overlay(item, over[i]));
    }
    if (isPlainObject(over)) {
      return base.map((item, i) => overlay(item, over[itemKey(item, i)]));
    }
    return base;
  }

  if (isPlainObject(base) && isPlainObject(over)) {
    const merged = { ...base };
    Object.keys(over).forEach((key) => {
      merged[key] = overlay(base[key], over[key]);
    });
    return merged;
  }

  return over;
};

/** Fills `{name}` placeholders in a UI string. */
export const fill = (text, vars = {}) =>
  String(text).replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match);

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "id" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore — the language still applies for this session
      }
      return next;
    });
  }, []);

  const content = useMemo(() => (lang === "id" ? overlay(en, id) : en), [lang]);

  const value = useMemo(() => ({ lang, toggle, content }), [lang, toggle, content]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  }
  return context;
};

/** Shorthand for components that only need the (translated) content. */
export const useContent = () => useLanguage().content;

export default useLanguage;
