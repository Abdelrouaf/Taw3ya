import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function CategoryGrid({ categories, onSelect }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c, i) => (
        <motion.li
          key={c.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: Math.min(i * 0.015, 0.4) }}
        >
          <button type="button" onClick={() => onSelect(c.name)}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-surface-elevated p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 text-lg font-semibold text-primary">
              {c.englishLabel.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p dir="rtl" className="font-arabic truncate text-lg leading-tight text-foreground">{c.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {c.englishLabel} · {c.count} {c.count === 1 ? "zikr" : "azkar"}
              </p>
            </div>
            <FontAwesomeIcon icon={faChevronLeft}
              className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-x-1 group-hover:text-primary" />
          </button>
        </motion.li>
      ))}
    </ul>
  );
}
