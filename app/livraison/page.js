"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Divider from "@/components/Divider";

export default function LivraisonPage() {
  const { t } = useLanguage();
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-2 text-center text-terracotta">
        {t.delivery.kicker}
      </p>
      <h1 className="font-display text-3xl md:text-4xl text-center mb-2 text-ink font-medium">
        {t.delivery.title}
      </h1>
      <Divider />
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        {t.delivery.cities.map((v) => (
          <div key={v.city} className="p-6 border border-terracottaSoft bg-white">
            <MapPin size={18} className="mb-3 text-terracotta" />
            <h3 className="font-display mb-1 text-ink font-medium">{v.city}</h3>
            <p className="text-sm text-inkSoft">{v.detail}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-center mt-10 text-inkSoft">{t.delivery.note}</p>
    </section>
  );
}
