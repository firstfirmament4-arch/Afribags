"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabaseClient";
import Divider from "@/components/Divider";
import ProductCard from "@/components/ProductCard";

export default function CataloguePage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState("sacs");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (active) {
        if (!error) setProducts(data || []);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = products.filter((p) => p.category === tab);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-[11px] uppercase tracking-[0.3em] font-medium mb-2 text-terracotta">{t.catalog.kicker}</p>
        <h1 className="font-display text-3xl md:text-4xl text-ink font-medium">{t.catalog.title}</h1>
        <Divider />
      </div>

      <div className="flex justify-center gap-8 text-sm font-medium mb-10 border-b border-terracottaSoft">
        {["sacs", "beaute"].map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`pb-3 -mb-px transition-colors tracking-wide ${
              tab === k ? "text-ink border-b-2 border-gold" : "text-inkSoft border-b-2 border-transparent"
            }`}
          >
            {k === "sacs" ? t.catalog.bags : t.catalog.beauty}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-sm text-inkSoft">…</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-sm text-inkSoft">{t.catalog.empty}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
