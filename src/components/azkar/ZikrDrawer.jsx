import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCopy, faRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getZikrByCategory } from "../../services/azkar.js";
import { useZikrCounter } from "../../hooks/useZikrCounter.js";
import { cn } from "../../lib/cn.js";

export default function ZikrDrawer({ category, open, onClose }) {
  const items = useMemo(() => (category ? getZikrByCategory(category) : []), [category]);

  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = orig; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" aria-hidden />
          <motion.aside key="panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-border bg-background shadow-2xl"
            role="dialog" aria-modal="true" aria-label={category ?? "Azkar"}>
            <header className="flex items-center justify-between gap-4 border-b border-border bg-surface px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">Azkar category</p>
                <h2 dir="rtl" className="font-arabic mt-0.5 truncate text-xl text-foreground">{category}</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground transition-colors hover:border-primary hover:text-primary">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              {items.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">No azkar found for this category.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((z, i) => <ZikrCard key={`${z.id}-${i}`} zikr={z} index={i} />)}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ZikrCard({ zikr, index }) {
  const target = Math.max(1, parseInt(zikr.count || "1", 10) || 1);
  const { count, increment, reset } = useZikrCounter(`${zikr.id}_${index}`, target);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(zikr.zikr);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const progress = target > 0 ? (count / target) * 100 : 0;

  return (
    <li className="overflow-hidden rounded-2xl border border-primary/20 bg-paper text-paper-foreground shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-primary/15 bg-paper/60 px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-paper-foreground/60">Zikr {index + 1}</span>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">×{target}</span>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <p dir="rtl" className="font-arabic text-xl leading-loose text-paper-foreground sm:text-2xl">{zikr.zikr}</p>
        {zikr.reference && <p className="mt-3 text-xs italic text-paper-foreground/60" dir="rtl">— {zikr.reference}</p>}
      </div>

      <div className="border-t border-primary/15 bg-paper/40 px-4 py-3">
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-primary/10">
          <div className="h-full rounded-full bg-linear-to-r from-primary to-primary-glow transition-[width] duration-300"
            style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={increment}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
              "bg-linear-to-br from-primary to-primary-glow text-primary-foreground hover:scale-[1.01] active:scale-95",
            )}
            aria-label={`Increment counter, ${count} of ${target}`}>
            Tap to count
            <span className="rounded-full bg-paper/30 px-2.5 py-0.5 tabular-nums">{count} / {target}</span>
          </button>
          <button type="button" onClick={reset} aria-label="Reset counter"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-paper text-primary transition-colors hover:bg-primary/10">
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button type="button" onClick={handleCopy} aria-label="Copy zikr"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-paper text-primary transition-colors hover:bg-primary/10">
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </button>
        </div>
      </div>
    </li>
  );
}
