import { motion } from "framer-motion";
import quranHero from "../../assets/quran-hero.jpg";

export default function PageHero({ eyebrow, title, imageSrc = quranHero }) {
  return (
    <section className="relative isolate h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img src={imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.012 260 / 0.55) 0%, oklch(0.12 0.012 260 / 0.65) 60%, oklch(0.165 0.012 260 / 1) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="font-serif text-2xl italic tracking-wide text-primary">{eyebrow}</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 font-serif text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">{title}</motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 h-px w-32 origin-center bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </section>
  );
}
