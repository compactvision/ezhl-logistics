import { useState, useEffect } from "react";
import { translations } from "../lib/i18n";

const LANG_KEY = "ezhl_lang";
const LANG_EVENT = "ezhl_lang_change";

export type SupportedLang = keyof typeof translations;

export function setLanguage(lang: string) {
  localStorage.setItem(LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}

export function useLang() {
  const [lang, setLang] = useState<SupportedLang>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : "fr";
    return (saved && saved in translations ? saved : "fr") as SupportedLang;
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<SupportedLang>;
      if (customEvent.detail && customEvent.detail in translations) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);

  const currentLang: SupportedLang = lang in translations ? lang : "fr";

  return { lang: currentLang, t: translations[currentLang], isRTL: currentLang === "ar", setLang };
}
