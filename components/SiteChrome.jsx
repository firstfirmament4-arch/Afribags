"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

export default function SiteChrome({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      <main>{children}</main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
