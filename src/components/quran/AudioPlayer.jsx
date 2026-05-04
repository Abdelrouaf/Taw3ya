import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop, faBackwardStep, faForwardStep, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer, formatTime } from "../../hooks/useAudioPlayer.js";
import { getAudioUrl } from "../../services/quran.js";
import { cn } from "../../lib/cn.js";

export default function AudioPlayer({ surah, onPrev, onNext, canPrev, canNext }) {
  const src = getAudioUrl(surah.number);
  const { isPlaying, isLoading, currentTime, duration, toggle, stop, seek } = useAudioPlayer({
    src,
    onEnded: () => { if (canNext) onNext(); },
  });

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  return (
    <section aria-label="Quran audio player" className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-elegant">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Listen To The Quran</h2>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="font-serif text-xl font-semibold text-foreground">{surah.englishName}</p>
        <p className="font-arabic text-lg text-primary" dir="rtl">{surah.name}</p>
      </div>

      <div
        className="mt-4 h-2 cursor-pointer overflow-hidden rounded-full bg-muted"
        onClick={handleSeek}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-label="Seek"
        tabIndex={0}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow transition-[width] duration-150"
          style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-xs tabular-nums text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Btn onClick={onPrev} disabled={!canPrev} ariaLabel="Previous surah">
          <FontAwesomeIcon icon={faBackwardStep} />
        </Btn>
        <Btn onClick={toggle} ariaLabel={isPlaying ? "Pause" : "Play"} variant="primary" large>
          <FontAwesomeIcon icon={isLoading ? faSpinner : isPlaying ? faPause : faPlay}
            className={isLoading ? "animate-spin" : ""} />
        </Btn>
        <Btn onClick={stop} ariaLabel="Stop"><FontAwesomeIcon icon={faStop} /></Btn>
        <Btn onClick={onNext} disabled={!canNext} ariaLabel="Next surah"><FontAwesomeIcon icon={faForwardStep} /></Btn>
      </div>
    </section>
  );
}

function Btn({ children, onClick, disabled, ariaLabel, variant = "ghost", large = false }) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-40",
        large ? "h-12 w-12 text-lg" : "h-10 w-10",
        variant === "primary"
          ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg hover:scale-105 active:scale-95"
          : "border border-border bg-surface text-foreground hover:border-primary/60 hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
