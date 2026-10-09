"use client";

import { useState } from "react";
import { X, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppLink } from "@/lib/constants";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, total, clearCart } = useCart();
  const { t } = useLanguage();
  const [city, setCity] = useState("");

  if (!open) return null;

  const buildMessage = () => {
    const lines = items.map(
      (i) => `- ${i.name} (Réf: ${i.ref}) x${i.qty} — ${(i.price * i.qty).toLocaleString()} XAF`
    );
    return (
      `Bonjour AFRIBAGS ! Je viens du site web et je souhaite commander :\n` +
      lines.join("\n") +
      `\n\nTotal : ${total.toLocaleString()} XAF` +
      `\nJe réside à ${city || "(ville à préciser)"}.`
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative w-full max-w-sm h-full bg-creamSoft flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-terracottaSoft">
          <h2 className="font-display text-lg text-ink">{t.cart.title}</h2>
          <button onClick={onClose}><X size={20} className="text-ink" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-inkSoft">{t.cart.empty}</p>
          ) : (
            <div className="space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between border-b border-terracottaSoft pb-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{i.name}</p>
                    <p className="text-xs text-inkSoft">x{i.qty} · {(i.price * i.qty).toLocaleString()} XAF</p>
                  </div>
                  <button onClick={() => removeItem(i.id)} className="text-terracotta">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-terracottaSoft space-y-3">
            <div>
              <label className="text-xs uppercase tracking-wide text-inkSoft">{t.cart.city}</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.cart.cityPlaceholder}
                className="w-full mt-1 px-3 py-2 border border-terracottaSoft text-sm bg-white"
              />
            </div>
            <div className="flex items-center justify-between font-display text-ink">
              <span className="text-sm">{t.cart.total}</span>
              <span className="text-lg">{total.toLocaleString()} XAF</span>
            </div>
            <a
              href={buildWhatsAppLink(buildMessage())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setTimeout(clearCart, 500);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 font-medium text-sm bg-gold text-ink"
            >
              <MessageCircle size={16} /> {t.cart.order}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
