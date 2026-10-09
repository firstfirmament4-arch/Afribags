"use client";

import { useLanguage } from "@/context/LanguageContext";
import Divider from "@/components/Divider";

export default function HistoirePage() {
  const { t } = useLanguage();
  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-2 text-center text-terracotta">
        {t.story.kicker}
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-center mb-2 text-ink font-medium">
        {t.nav.story}
      </h1>
      <Divider />
      <div className="space-y-6 mt-10 text-[15px] leading-loose text-inkSoft">
        <p>{t.story.p2}</p>
        <p>{t.story.p3}</p>
        <p>{t.story.p4}</p>
      </div>
    </section>
  );
}
