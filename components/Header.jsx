"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function Header({ onCartClick }) {
  const { t, lang, setLang } = useLanguage();
  const { items } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV = [
    { href: "/", label: t.nav.home },
    { href: "/catalogue", label: t.nav.catalog },
    { href: "/histoire", label: t.nav.story },
    { href: "/livraison", label: t.nav.delivery },
    { href: "/admin", label: t.nav.admin },
  ];

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-terracottaSoft bg-cream/90">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium tracking-wide">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-2 transition-colors ${
                pathname === n.href
                  ? "text-ink border-b border-gold"
                  : "text-inkSoft hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-1.5 ml-3 px-3 py-1.5 border border-terracottaSoft text-xs font-medium text-terracotta"
          >
            <Globe size={13} /> {lang === "fr" ? "EN" : "FR"}
          </button>
          <button onClick={onCartClick} className="relative ml-2 p-2">
            <ShoppingBag size={19} className="text-ink" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={onCartClick} className="relative p-1">
            <ShoppingBag size={20} className="text-ink" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setLang(lang === "fr" ? "en" : "fr")} className="text-xs font-medium text-terracotta">
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1 text-sm font-medium border-t border-terracottaSoft pt-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className={`text-left px-3 py-2 ${pathname === n.href ? "text-ink font-semibold" : "text-inkSoft"}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
