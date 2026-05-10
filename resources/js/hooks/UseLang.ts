import { useState, useEffect } from "react";
import { translations } from "../lib/i18n";

const LANG_KEY = "ezhl_lang";
const LANG_EVENT = "ezhl_lang_change";

export function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: lang }));
}

export function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem(LANG_KEY) || "fr");

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, []);

  return { lang, t: translations[lang], isRTL: lang === "ar", setLang };
}