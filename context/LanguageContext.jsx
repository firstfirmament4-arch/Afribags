"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { STRINGS, detectLang } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("afribags_lang");
    setLang(saved || detectLang());
  }, []);

  const changeLang = (l) => {
    setLang(l);
    window.localStorage.setItem("afribags_lang", l);
  };

  const t = STRINGS[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
