import { motion, AnimatePresence } from "framer-motion";
import { getLanguageOption, getSurahVerses } from "../../services/quran.js";
import { cn } from "../../lib/cn.js";

function toArabicNum(n) {
  const digits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return n.toString().split("").map((d) => digits[Number(d)] ?? d).join("");
}

export default function SurahReader({ surah, langCode, range, onClearRange }) {
  const lang = getLanguageOption(langCode);
  const all = getSurahVerses(surah.number, langCode);
  const verses = range ? all.filter((v) => v.number >= range.start && v.number <= range.end) : all;

  const showBismillah = surah.number !== 9 && surah.number !== 1;

  return (
    <article aria-label={`Surah ${surah.englishName}`}
      className="overflow-hidden rounded-3xl border border-primary/20 bg-paper text-paper-foreground shadow-paper">
      <div className="relative bg-gradient-to-br from-[oklch(0.22_0.04_165)] via-[oklch(0.18_0.04_220)] to-[oklch(0.16_0.05_260)] px-6 py-7 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.13 80 / 0.5) 0%, transparent 40%), radial-gradient(circle at 80% 50%, oklch(0.78 0.13 80 / 0.5) 0%, transparent 40%)",
          }} />
        <div className="relative">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-primary-glow">Surah</p>
          <h2 className="mt-1 font-serif text-3xl font-semibold text-paper sm:text-4xl">
            <span className="text-paper">{surah.englishName}</span>
          </h2>
          <p className="font-arabic mt-1 text-2xl text-primary-glow" dir="rtl">{surah.name}</p>
          <div className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary-glow/60" />
            <span className="text-[10px] font-medium uppercase tracking-widest text-primary-glow">{surah.numberOfVerses} verses</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary-glow/60" />
          </div>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {range && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-paper-foreground">
            <span>Showing verses <strong>{range.start}–{range.end}</strong> of {surah.numberOfVerses}</span>
            {onClearRange && (
              <button type="button" onClick={onClearRange} className="font-medium text-primary underline-offset-2 hover:underline">
                Show full surah
              </button>
            )}
          </div>
        )}

        {showBismillah && (
          <p className="font-arabic mb-6 text-center text-2xl text-paper-foreground/85" dir="rtl">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${surah.number}-${langCode}-${range?.start ?? 0}-${range?.end ?? 0}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            dir={lang.rtl ? "rtl" : "ltr"}
            className={cn(
              "leading-[2.5] text-paper-foreground text-justify",
              lang.arabicScript ? "font-arabic text-[1.6rem] sm:text-[1.85rem] [text-align-last:right]" : "font-serif text-[1.15rem] sm:text-[1.25rem] [text-align-last:left]",
            )}
          >
            {verses.map((v) => (
              <span key={v.number} className="align-baseline font-bold">
                {v.text}{" "}
                <span aria-label={`Verse ${v.number}`}
                  className="mx-1 inline-flex h-7 w-7 select-none items-center justify-center rounded-full border border-primary/50 align-middle text-[11px] font-semibold tabular-nums text-primary">
                  {lang.arabicScript ? toArabicNum(v.number) : v.number}
                </span>{" "}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

        {verses.length === 0 && (
          <p className="text-center text-sm text-paper-foreground/60">No verses to display.</p>
        )}
      </div>
    </article>
  );
}
