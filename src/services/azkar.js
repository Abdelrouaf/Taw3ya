import { Azkar } from "islam.js";

const azkarLib = new Azkar();

const ENGLISH_LABELS = {
  "أذكار الصباح": "Morning",
  "أذكار المساء": "Evening",
  "أذكار الاستيقاظ من النوم": "Waking up",
  "دعاء لبس الثوب": "Wearing clothes",
  "دعاء لبس الثوب الجديد": "New clothes",
  "ما يقول إذا وضع الثوب": "Removing clothes",
  "دعاء دخول الخلاء - الحمام": "Entering toilet",
  "دعاء الخروج من الخلاء - الحمام": "Leaving toilet",
  "الذكر قبل الوضوء": "Before wudu",
  "الذكر بعد الفراغ من الوضوء": "After wudu",
  "الذكر عند الخروج من المنزل": "Leaving home",
  "الذكر عند دخول المنزل": "Entering home",
  "دعاء الذهاب إلى المسجد": "Going to mosque",
  "دعاء دخول المسجد": "Entering mosque",
  "دعاء الخروج من المسجد": "Leaving mosque",
  "أذكار الآذان": "After adhan",
  "دعاء الاستفتاح": "Opening prayer",
  "دعاء الركوع": "Ruku",
  "دعاء الرفع من الركوع": "Rising from Ruku",
  "دعاء السجود": "Sujood",
  "دعاء الجلسة بين السجدتين": "Between sujood",
  "دعاء سجود التلاوة": "Sujood al-Tilawa",
  "التشهد": "Tashahhud",
  "الصلاة على النبي بعد التشهد": "Salutation on the Prophet",
  "الدعاء بعد التشهد الأخير قبل السلام": "Final tashahhud du'a",
  "الأذكار بعد السلام من الصلاة": "After prayer",
  "دعاء صلاة الاستخارة": "Istikhara",
  "أذكار النوم": "Before sleep",
  "الدعاء إذا تقلب في الليل": "Turning at night",
  "دعاء الفزع في النوم و من بلي بالوحشة": "Nightmares",
  "ما يفعل من رأى الرؤيا أو الحلم في النوم": "After dreaming",
  "دعاء قنوت الوتر": "Witr du'a",
  "الذكر عقب السلام من الوتر": "After Witr",
  "دعاء الهم والحزن": "Anxiety & sorrow",
  "دعاء الكرب": "Distress",
  "دعاء قضاء الدين": "Debt relief",
  "دعاء طرد الشيطان و وساوسه": "Expelling Shaytan",
};

export function getAllCategories() {
  const all = azkarLib.getAll();
  const out = [];
  for (const [name, items] of all.entries()) {
    out.push({
      name,
      count: items.length,
      englishLabel: ENGLISH_LABELS[name] ?? (name.length > 28 ? name.slice(0, 26) + "…" : name),
    });
  }
  return out;
}

export function getZikrByCategory(category) {
  return azkarLib.getByCategory(category) ?? [];
}
