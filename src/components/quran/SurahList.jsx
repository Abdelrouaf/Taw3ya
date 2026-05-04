import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { surahType } from "../../services/quran.js";
import { cn } from "../../lib/cn.js";

export default function SurahList({ surahs, activeNumber, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return surahs;
    return surahs.filter((s) =>
      s.englishName.toLowerCase().includes(q) ||
      s.name.includes(query) ||
      String(s.number) === q,
    );
  }, [surahs, query]);

  return (
    <section aria-label="Surah list" className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-elegant">
      <label className="relative block">
        <span className="sr-only">Search surahs</span>
        <FontAwesomeIcon icon={faMagnifyingGlass}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search surahs..."
          className="w-full rounded-full border border-border bg-surface px-10 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring" />
      </label>

      <ul className="thin-scroll mt-3 max-h-[480px] space-y-1 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-muted-foreground">No surahs match “{query}”.</li>
        )}
        {filtered.map((s) => {
          const active = s.number === activeNumber;
          return (
            <li key={s.number}>
              <button type="button" onClick={() => onSelect(s.number)} aria-current={active ? "true" : undefined}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                  active ? "border-primary/60 bg-primary/10" : "border-transparent hover:border-border hover:bg-surface",
                )}>
                <span className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular-nums",
                  active
                    ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground"
                    : "border border-border bg-surface-elevated text-muted-foreground",
                )}>{s.number}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("truncate font-serif text-base font-semibold", active ? "text-foreground" : "text-foreground/90")}>
                      {s.englishName}
                    </p>
                    <p className="font-arabic text-base text-primary" dir="rtl">{s.name}</p>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{s.numberOfVerses} verses</span>
                    <span aria-hidden>·</span>
                    <span className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                      surahType(s) === "Meccan" ? "bg-primary/15 text-primary" : "bg-emerald/20 text-emerald",
                    )}>
                      {surahType(s)}
                    </span>
                  </div>
                </div>
                {active && <span aria-hidden className="absolute right-2 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary" />}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
