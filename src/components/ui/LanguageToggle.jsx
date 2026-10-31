import { HiTranslate } from "react-icons/hi";
import { useLanguage } from "../../hooks/useLanguage";

/** EN/ID switch. Shows the language it switches *to*; `variant="wide"` is for the mobile sheet. */
const LanguageToggle = ({ variant = "icon", className = "" }) => {
  const { lang, toggle, content } = useLanguage();
  const { switchTo, code } = content.ui.language;

  if (variant === "wide") {
    return (
      <button
        type="button"
        onClick={toggle}
        lang={lang === "en" ? "id" : "en"}
        className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-line-soft px-5 py-4 text-lg font-medium text-content transition-colors duration-300 hover:border-accent/40 hover:bg-overlay ${className}`}
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-overlay text-xl">
          <HiTranslate />
        </span>
        {switchTo}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={switchTo}
      title={switchTo}
      className={`grid h-11 min-w-[2.75rem] shrink-0 cursor-pointer place-items-center rounded-xl border border-line bg-overlay px-2.5 font-mono text-xs font-semibold text-content-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent ${className}`}
    >
      {code}
    </button>
  );
};

export default LanguageToggle;
