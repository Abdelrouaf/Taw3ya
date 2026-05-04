import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getSurahMeta } from "../../services/quran.js";

export default function VerseRangeSearch({ surahs, initialSurah, onSearch }) {
  const [surahNum, setSurahNum] = useState(initialSurah);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(7);
  const [error, setError] = useState(null);

  const verseCount = useMemo(() => getSurahMeta(surahNum)?.numberOfVerses ?? 0, [surahNum]);

  useEffect(() => {
    setStart((s) => Math.min(Math.max(1, s), verseCount));
    setEnd((e) => Math.min(Math.max(1, e), verseCount));
  }, [verseCount]);

  const submit = (e) => {
    e.preventDefault();
    if (start < 1 || end < 1 || start > verseCount || end > verseCount) {
      setError(`Verses must be between 1 and ${verseCount}.`); return;
    }
    if (end < start) { setError("End verse must be greater than or equal to start verse."); return; }
    setError(null);
    onSearch(surahNum, start, end);
  };

  const numbers = Array.from({ length: verseCount }, (_, i) => i + 1);

  return (
    <section aria-label="Verse range search"
      className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated p-6 sm:p-8 shadow-elegant">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, oklch(0.72 0.16 55) 0%, transparent 35%), radial-gradient(circle at 90% 50%, oklch(0.78 0.13 80) 0%, transparent 35%)",
        }} />
      <div className="relative">
        <h2 className="text-center font-serif text-2xl font-semibold text-foreground">Search for Quran Verses</h2>
        <p className="mt-1 text-center text-sm text-muted-foreground">Pick a surah, then a verse range to read.</p>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
          <Field label="Surah">
            <select value={surahNum} onChange={(e) => setSurahNum(Number(e.target.value))} aria-label="Surah"
              className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring">
              {surahs.map((s) => (
                <option key={s.number} value={s.number} className="bg-surface">{s.number}. {s.englishName}</option>
              ))}
            </select>
          </Field>
          <Field label="Start verse">
            <select value={start} onChange={(e) => setStart(Number(e.target.value))} aria-label="Start verse"
              className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring">
              {numbers.map((n) => <option key={n} value={n}>Verse {n}</option>)}
            </select>
          </Field>
          <Field label="End verse">
            <select value={end} onChange={(e) => setEnd(Number(e.target.value))} aria-label="End verse"
              className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring">
              {numbers.map((n) => <option key={n} value={n}>Verse {n}</option>)}
            </select>
          </Field>
          <div className="flex items-end">
            <button type="submit"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-glow px-5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              Search
            </button>
          </div>
        </form>
        {error && <p role="alert" className="mt-3 text-center text-sm text-destructive">{error}</p>}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
