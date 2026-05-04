import { Quran, Translation, TranslationEnum } from "islam.js";

const quran = new Quran();
const translationCache = new Map();

function getTranslator(lang) {
  let t = translationCache.get(lang);
  if (!t) {
    t = new Translation(lang);
    translationCache.set(lang, t);
  }
  return t;
}

export const ARABIC_OPTION = {
  code: "ar",
  label: "Arabic — العربية",
  rtl: true,
  arabicScript: true,
};

const TRANSLATIONS = [
  { code: TranslationEnum.English, label: "English", rtl: false, arabicScript: false },
  { code: TranslationEnum.Urdu, label: "Urdu — اُردُو", rtl: true, arabicScript: false },
  { code: TranslationEnum.French, label: "French — Français", rtl: false, arabicScript: false },
  { code: TranslationEnum.Indonesian, label: "Indonesian — Bahasa Indonesia", rtl: false, arabicScript: false },
  { code: TranslationEnum.Turkish, label: "Turkish — Türkçe", rtl: false, arabicScript: false },
  { code: TranslationEnum.Spanish, label: "Spanish — Español", rtl: false, arabicScript: false },
  { code: TranslationEnum.German, label: "German — Deutsch", rtl: false, arabicScript: false },
  { code: TranslationEnum.Italian, label: "Italian — Italiano", rtl: false, arabicScript: false },
  { code: TranslationEnum.Portuguese, label: "Portuguese — Português", rtl: false, arabicScript: false },
  { code: TranslationEnum.Russian, label: "Russian — Русский", rtl: false, arabicScript: false },
  { code: TranslationEnum.Chinese, label: "Chinese — 中文", rtl: false, arabicScript: false },
  { code: TranslationEnum.Japanese, label: "Japanese — 日本語", rtl: false, arabicScript: false },
  { code: TranslationEnum.Korean, label: "Korean — 한국어", rtl: false, arabicScript: false },
  { code: TranslationEnum.Hindi, label: "Hindi — हिन्दी", rtl: false, arabicScript: false },
  { code: TranslationEnum.Bengali, label: "Bengali — বাংলা", rtl: false, arabicScript: false },
  { code: TranslationEnum.Tamil, label: "Tamil — தமிழ்", rtl: false, arabicScript: false },
  { code: TranslationEnum.Persian, label: "Persian — فارسی", rtl: true, arabicScript: false },
  { code: TranslationEnum.Pashto, label: "Pashto — پښتو", rtl: true, arabicScript: false },
  { code: TranslationEnum.Sindhi, label: "Sindhi — سنڌي", rtl: true, arabicScript: false },
  { code: TranslationEnum.Punjabi, label: "Punjabi — ਪੰਜਾਬੀ", rtl: false, arabicScript: false },
  { code: TranslationEnum.Uzbek, label: "Uzbek — Oʻzbekcha", rtl: false, arabicScript: false },
  { code: TranslationEnum.Albanian, label: "Albanian — Shqip", rtl: false, arabicScript: false },
  { code: TranslationEnum.Balgarian, label: "Bulgarian — Български", rtl: false, arabicScript: false },
  { code: TranslationEnum.Dutch, label: "Dutch — Nederlands", rtl: false, arabicScript: false },
  { code: TranslationEnum.Norwegian, label: "Norwegian — Norsk", rtl: false, arabicScript: false },
  { code: TranslationEnum.Romanian, label: "Romanian — Română", rtl: false, arabicScript: false },
  { code: TranslationEnum.Somalian, label: "Somali — Soomaali", rtl: false, arabicScript: false },
  { code: TranslationEnum.Thai, label: "Thai — ไทย", rtl: false, arabicScript: false },
];

export const LANGUAGES = [ARABIC_OPTION, ...TRANSLATIONS];

export function getAllSurahs() {
  return quran.getAllChapters();
}

export function getSurahMeta(n) {
  return quran.getChapterByIndex(n);
}

export function getSurahVerses(surahNumber, langCode) {
  const meta = quran.getChapterByIndex(surahNumber);
  if (!meta) return [];
  if (langCode === ARABIC_OPTION.code) {
    return meta.verses.map((text, i) => ({ number: i + 1, text }));
  }
  const t = getTranslator(langCode);
  const arr = t.getChapterTranslation(surahNumber) ?? [];
  return arr.map((text, i) => ({ number: i + 1, text }));
}

export function getLanguageOption(code) {
  return LANGUAGES.find((l) => l.code === code) ?? ARABIC_OPTION;
}

export function getAudioUrl(surahNumber) {
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
}

export function surahType(meta) {
  return meta.type.startsWith("مك") ? "Meccan" : "Medinan";
}
