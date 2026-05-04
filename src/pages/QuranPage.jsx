import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/shared/PageHero.jsx";
import LanguageSelect from "../components/quran/LanguageSelect.jsx";
import AudioPlayer from "../components/quran/AudioPlayer.jsx";
import SurahList from "../components/quran/SurahList.jsx";
import SurahReader from "../components/quran/SurahReader.jsx";
import VerseRangeSearch from "../components/quran/VerseRangeSearch.jsx";
import { getAllSurahs } from "../services/quran.js";
import quranHero from "../assets/quran-hero.jpg";

export default function QuranPage() {
  useEffect(() => { document.title = "Quran — Taw3ya"; }, []);
  const surahs = useMemo(() => getAllSurahs(), []);
  const [activeSurah, setActiveSurah] = useState(1);
  const [language, setLanguage] = useState("en");
  const [range, setRange] = useState(null);

  const surah = surahs.find((s) => s.number === activeSurah) ?? surahs[0];

  const selectSurah = (n) => { setActiveSurah(n); setRange(null); };

  return (
    <>
      <PageHero eyebrow="Quran" title="Surah" imageSrc={quranHero} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <LanguageSelect value={language} onChange={setLanguage} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <AudioPlayer
              surah={surah}
              onPrev={() => selectSurah(Math.max(1, activeSurah - 1))}
              onNext={() => selectSurah(Math.min(114, activeSurah + 1))}
              canPrev={activeSurah > 1}
              canNext={activeSurah < 114}
            />
            <SurahList surahs={surahs} activeNumber={activeSurah} onSelect={selectSurah} />
          </aside>

          <div>
            <SurahReader surah={surah} langCode={language} range={range} onClearRange={() => setRange(null)} />
          </div>
        </div>

        <div className="mt-10">
          <VerseRangeSearch
            surahs={surahs}
            initialSurah={activeSurah}
            onSearch={(n, start, end) => {
              setActiveSurah(n);
              setRange({ start, end });
              setTimeout(() => {
                document.querySelector("article[aria-label^='Surah']")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          />
        </div>
      </div>
    </>
  );
}
