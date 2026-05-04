import { useCallback, useEffect, useRef, useState } from "react";

export function useAudioPlayer({ src, onEnded }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => { setIsPlaying(false); onEnded?.(); };
    const onWait = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnd);
    a.addEventListener("waiting", onWait);
    a.addEventListener("canplay", onCanPlay);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("waiting", onWait);
      a.removeEventListener("canplay", onCanPlay);
      audioRef.current = null;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.src = src;
    a.load();
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [src]);

  const play = useCallback(async () => {
    try { await audioRef.current?.play(); } catch {}
  }, []);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const toggle = useCallback(() => {
    const a = audioRef.current; if (!a) return;
    if (a.paused) play(); else pause();
  }, [play, pause]);
  const stop = useCallback(() => {
    const a = audioRef.current; if (!a) return;
    a.pause(); a.currentTime = 0; setCurrentTime(0);
  }, []);
  const seek = useCallback((s) => {
    const a = audioRef.current; if (!a || !isFinite(s)) return;
    a.currentTime = Math.max(0, Math.min(s, a.duration || 0));
    setCurrentTime(a.currentTime);
  }, []);

  return { isPlaying, isLoading, currentTime, duration, play, pause, toggle, stop, seek };
}

export function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
