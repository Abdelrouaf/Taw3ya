import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import PageHero from "../components/shared/PageHero.jsx";
import CategoryGrid from "../components/azkar/CategoryGrid.jsx";
import ZikrDrawer from "../components/azkar/ZikrDrawer.jsx";
import { getAllCategories } from "../services/azkar.js";
import azkarHero from "../assets/azkar-hero.jpg";

export default function AzkarPage() {
  useEffect(() => { document.title = "Azkar — Taw3ya"; }, []);
  const categories = useMemo(() => getAllCategories(), []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.includes(query) || c.englishLabel.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <>
      <PageHero eyebrow="Azkar" title="Morning, Evening & After Pray" imageSrc={azkarHero} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-3xl border border-primary/30 bg-paper px-6 py-7 text-paper-foreground shadow-paper sm:px-10">
          <FontAwesomeIcon icon={faStarOfLife} aria-hidden className="absolute right-4 top-4 h-4 w-4 text-primary/60" />
          <p dir="rtl" className="font-arabic text-center text-xl leading-loose sm:text-2xl">
            يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا ۝ وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا
          </p>
          <p className="mt-3 text-center font-serif text-sm italic text-paper-foreground/70">
            “O you who have believed, remember Allah with much remembrance, and exalt Him morning and afternoon.” — Surah Al-Ahzab 33:41–42
          </p>
        </motion.section>

        <div className="mx-auto mb-8 max-w-xl">
          <label className="relative block">
            <span className="sr-only">Search azkar categories</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search azkar categories…"
              className="w-full rounded-full border border-border bg-surface-elevated px-12 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring" />
          </label>
        </div>

        <CategoryGrid categories={filtered} onSelect={setActiveCategory} />

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">No categories match your search.</p>
        )}
      </div>

      <ZikrDrawer category={activeCategory} open={activeCategory !== null} onClose={() => setActiveCategory(null)} />
    </>
  );
}
