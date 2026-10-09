"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Divider from "@/components/Divider";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-5 text-terracotta">
            {t.hero.kicker}
          </p>
          <h1 className="font-display text-[2.6rem] md:text-6xl leading-[1.08] mb-6 text-ink font-medium">
            {t.hero.title1}
            <br />
            <span className="italic font-light">{t.hero.title2}</span>
          </h1>
          <p className="text-base leading-relaxed mb-9 max-w-md text-inkSoft">{t.hero.body}</p>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide bg-ink text-creamSoft"
          >
            {t.hero.cta}
          </Link>
        </div>
        <div className="relative aspect-square flex items-center justify-center p-14 bg-[radial-gradient(circle_at_50%_35%,#EADFD2,#EAA735_65%,#59362F)]">
          <Image src="/logo.jpg" alt="AFRIBAGS" fill className="object-contain drop-shadow-xl p-8" />
        </div>
      </section>

      <Divider />

      <section className="py-16 bg-ink">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-5 text-gold">{t.story.kicker}</p>
          <h2 className="font-display text-2xl md:text-[2rem] mb-5 leading-snug text-creamSoft italic font-normal">
            {t.story.title}
          </h2>
          <p className="text-sm leading-relaxed text-[#C9B8A8]">{t.story.body}</p>
          <Link
            href="/histoire"
            className="inline-block mt-7 text-xs tracking-[0.15em] uppercase font-medium text-gold border-b border-gold pb-0.5"
          >
            {t.story.more}
          </Link>
        </div>
      </section>
    </div>
  );
}
