"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-white overflow-hidden border border-terracottaSoft transition-all duration-500 hover:shadow-[0_16px_40px_rgba(36,23,21,0.14)] hover:-translate-y-1">
      <div className="relative aspect-[4/5] flex items-center justify-center overflow-hidden bg-gradient-to-br from-terracottaSoft via-gold to-terracotta">
        {product.image_url ? (
          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
        ) : (
          <ImageOff size={20} className="opacity-30 text-ink" />
        )}
        {product.tag && (
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 bg-ink text-creamSoft">
            {product.tag}
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute inset-0 bg-ink/50 flex items-center justify-center text-creamSoft text-xs uppercase tracking-widest">
            {t.catalog.outOfStock}
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5 text-terracotta">
          {product.category === "beaute" ? t.catalog.beauty : t.catalog.bags}
        </p>
        <h3 className="font-display text-lg leading-tight mb-1 text-ink">{product.name}</h3>
        <p className="text-xs text-inkSoft">Réf. {product.reference}</p>
        <div className="flex items-center justify-between mt-3 mb-4">
          <span className="font-display text-xl text-ink">
            {product.price.toLocaleString()} <span className="text-xs font-body text-inkSoft">XAF</span>
          </span>
        </div>
        <button
          onClick={handleAdd}
          disabled={!product.in_stock}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium tracking-wide py-2.5 transition-colors bg-gold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-goldDeep"
        >
          {added ? <Check size={15} /> : <Plus size={15} />}
          {added ? t.catalog.added : t.catalog.addToCart}
        </button>
      </div>
    </div>
  );
}
