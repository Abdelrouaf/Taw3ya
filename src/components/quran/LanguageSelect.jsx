import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { LANGUAGES } from "../../services/quran.js";

export default function LanguageSelect({ value, onChange }) {
  return (
    <label className="group relative block">
      <span className="sr-only">Reading language</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Reading language"
        className="block w-full appearance-none rounded-2xl border border-border bg-surface-elevated px-5 py-4 pr-12 text-base font-medium text-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-ring"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-surface text-foreground">{l.label}</option>
        ))}
      </select>
      <FontAwesomeIcon icon={faChevronDown} className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
    </label>
  );
}
