"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Lock, Camera, Plus, CheckCircle2, Trash2, ImageOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/context/LanguageContext";

function LoginForm({ t, onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(t.admin.loginError);
    } else {
      onLoggedIn();
    }
  };

  return (
    <section className="max-w-sm mx-auto px-6 py-24 text-center">
      <form onSubmit={handleLogin} className="p-9 border border-terracottaSoft bg-white">
        <Lock size={24} className="mx-auto mb-4 text-terracotta" />
        <h1 className="font-display text-xl mb-1 text-ink font-medium">{t.admin.title}</h1>
        <p className="text-sm mb-7 text-inkSoft">{t.admin.subtitle}</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.admin.email}
          type="email"
          required
          className="w-full px-4 py-2.5 border border-terracottaSoft mb-3 text-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.admin.password}
          type="password"
          required
          className="w-full px-4 py-2.5 border border-terracottaSoft mb-3 text-sm"
        />
        {error && <p className="text-xs text-red-700 mb-3">{error}</p>}
        <button type="submit" disabled={loading} className="w-full py-2.5 font-medium text-sm bg-ink text-creamSoft disabled:opacity-60">
          {loading ? "…" : t.admin.login}
        </button>
      </form>
    </section>
  );
}

function Dashboard({ t }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ name: "", reference: "", price: "", category: "sacs", tag: "" });
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setPublishing(true);
    setMessage("");

    let image_url = null;
    if (file) {
      const path = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("products").upload(path, file);
      if (!uploadError) {
        const { data } = supabase.storage.from("products").getPublicUrl(path);
        image_url = data.publicUrl;
      }
    }

    const { error } = await supabase.from("products").insert({
      name: form.name,
      reference: form.reference || `AF-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Number(form.price),
      category: form.category,
      tag: form.tag || null,
      image_url,
      in_stock: true,
    });

    setPublishing(false);
    if (!error) {
      setMessage(t.admin.saved);
      setForm({ name: "", reference: "", price: "", category: "sacs", tag: "" });
      setFile(null);
      setPreview(null);
      loadProducts();
    }
  };

  const toggleStock = async (product) => {
    await supabase.from("products").update({ in_stock: !product.in_stock }).eq("id", product.id);
    loadProducts();
  };

  const handleDelete = async (product) => {
    if (!window.confirm(t.admin.confirmDelete)) return;
    await supabase.from("products").delete().eq("id", product.id);
    loadProducts();
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-7">
        <h1 className="font-display text-2xl text-ink font-medium">{t.admin.myCatalog}</h1>
        <button onClick={() => supabase.auth.signOut()} className="text-xs underline text-inkSoft">
          {t.admin.logout}
        </button>
      </div>

      <form onSubmit={handlePublish} className="p-6 border border-terracottaSoft mb-7 bg-white">
        <p className="text-[11px] uppercase tracking-[0.2em] font-medium mb-4 text-terracotta">{t.admin.addProduct}</p>

        <label className="flex items-center gap-3 mb-3 p-3 border border-dashed border-terracottaSoft cursor-pointer">
          {preview ? (
            <Image src={preview} alt="" width={40} height={40} className="object-cover" />
          ) : (
            <Camera size={17} className="text-terracotta" />
          )}
          <span className="text-sm text-inkSoft">{preview ? t.admin.changePhoto : t.admin.photo}</span>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>

        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t.admin.name}
          required
          className="w-full px-4 py-2.5 border border-terracottaSoft mb-2 text-sm"
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            value={form.reference}
            onChange={(e) => setForm({ ...form, reference: e.target.value })}
            placeholder={t.admin.reference}
            className="px-4 py-2.5 border border-terracottaSoft text-sm"
          />
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder={t.admin.price}
            type="number"
            required
            className="px-4 py-2.5 border border-terracottaSoft text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="px-4 py-2.5 border border-terracottaSoft text-sm bg-white"
          >
            <option value="sacs">{t.admin.bags}</option>
            <option value="beaute">{t.admin.beauty}</option>
          </select>
          <input
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            placeholder={t.admin.tag}
            className="px-4 py-2.5 border border-terracottaSoft text-sm"
          />
        </div>

        <button type="submit" disabled={publishing} className="w-full flex items-center justify-center gap-2 py-2.5 font-medium text-sm bg-gold text-ink disabled:opacity-60">
          <Plus size={16} /> {publishing ? t.admin.publishing : t.admin.publish}
        </button>
        {message && <p className="text-xs text-green-700 mt-2">{message}</p>}
      </form>

      {loading ? (
        <p className="text-sm text-inkSoft">…</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 border border-terracottaSoft bg-white gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 flex-shrink-0 bg-terracottaSoft flex items-center justify-center overflow-hidden">
                  {p.image_url ? (
                    <Image src={p.image_url} alt={p.name} width={44} height={44} className="object-cover" />
                  ) : (
                    <ImageOff size={14} className="text-ink opacity-40" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-ink truncate">{p.name}</p>
                  <p className="text-sm text-inkSoft">{p.price.toLocaleString()} XAF</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleStock(p)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 ${
                    p.in_stock ? "bg-[#E4EDE2] text-[#3C5A34]" : "bg-terracottaSoft text-terracotta"
                  }`}
                >
                  <CheckCircle2 size={13} /> {p.in_stock ? t.admin.inStock : t.admin.outOfStock}
                </button>
                <button onClick={() => handleDelete(p)} className="text-terracotta p-1.5">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AdminPage() {
  const { t } = useLanguage();
  const [session, setSession] = useState(undefined); // undefined = loading, null = logged out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) return null;

  return session ? <Dashboard t={t} /> : <LoginForm t={t} onLoggedIn={() => {}} />;
}
