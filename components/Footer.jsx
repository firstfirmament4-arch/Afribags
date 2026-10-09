"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-12 text-center mt-6 bg-terracotta text-terracottaSoft">
      <p className="font-display font-medium text-lg tracking-[0.04em] text-creamSoft">AFRIBAGS</p>
      <p className="text-[10px] tracking-[0.35em] uppercase mb-5 text-gold">by D&apos;Avafrik</p>
      <p className="text-sm">Douala · Yaoundé · Cameroun</p>
      <p className="text-xs mt-2 opacity-70">© {new Date().getFullYear()} D&apos;Avafrik. {t.footer.rights}</p>
    </footer>
  );
}
