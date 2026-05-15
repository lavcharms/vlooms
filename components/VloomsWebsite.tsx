"use client";

import React, { useState, useEffect, useRef } from "react";

const FABRICS = [
  { id: 1, name: "Premium Velvet", category: "Upholstery", use: "Sofa & Seating", color: "#7c3f8e", bg: "#f3e8ff", desc: "Luxurious soft-touch velvet for high-end sofas and seating. Available in 80+ shades.", tags: ["Sofa", "Luxury", "Soft"] },
  { id: 2, name: "PVC Leatherette", category: "Leatherette", use: "Upholstery", color: "#b5451b", bg: "#fef2ee", desc: "Finest PVC leatherette for stunning upholstery. Water-resistant, durable, premium finish.", tags: ["Upholstery", "Durable", "Water-resistant"] },
  { id: 3, name: "Micro Suede", category: "Suede", use: "Sofa & Curtains", color: "#8B6914", bg: "#fef9ee", desc: "Buttery-smooth microsuede. Perfect for modern interiors and premium furniture.", tags: ["Sofa", "Modern", "Smooth"] },
  { id: 4, name: "Jacquard Woven", category: "Woven", use: "Sofa & Curtains", color: "#1a5c8f", bg: "#e8f4fd", desc: "Intricately woven jacquard patterns. Timeless elegance for high-end interiors.", tags: ["Sofa", "Curtain", "Classic"] },
  { id: 5, name: "Sheer Curtain", category: "Curtain", use: "Window Treatment", color: "#2d7a5f", bg: "#e8f7f2", desc: "Lightweight sheers that diffuse light beautifully. Ideal for living rooms and offices.", tags: ["Curtain", "Light", "Airy"] },
  { id: 6, name: "Blockout Curtain", category: "Curtain", use: "Window Treatment", color: "#3d3580", bg: "#eeeeff", desc: "100% light-blocking curtain fabric. Perfect for bedrooms and home theatres.", tags: ["Curtain", "Blackout", "Bedroom"] },
  { id: 7, name: "Natural Jute", category: "Natural", use: "Accent & Decor", color: "#5a6e2a", bg: "#f2f7e8", desc: "Eco-friendly natural jute for accent furnishings. Trending in contemporary interiors.", tags: ["Eco", "Natural", "Accent"] },
  { id: 8, name: "Chenille", category: "Woven", use: "Sofa & Cushions", color: "#8c2d5a", bg: "#fde8f2", desc: "Soft tufted chenille with a rich texture. Adds warmth and sophistication to any space.", tags: ["Sofa", "Cushion", "Textured"] },
  { id: 9, name: "Digital Print", category: "Printed", use: "Curtains & Cushions", color: "#1a6b6b", bg: "#e8f7f7", desc: "Vibrant HD digital prints on premium base fabric. Custom patterns available.", tags: ["Custom", "Colorful", "Modern"] },
  { id: 10, name: "Rexine", category: "Leatherette", use: "Upholstery", color: "#6b3a1f", bg: "#f7ede8", desc: "Heavy-duty synthetic leather for commercial and automotive upholstery applications.", tags: ["Commercial", "Durable", "Heavy-duty"] },
  { id: 11, name: "Linen Blend", category: "Natural", use: "Curtains & Upholstery", color: "#6b5e3a", bg: "#f7f3e8", desc: "Natural linen blend with a refined drape. Breathable and elegant for any interior.", tags: ["Natural", "Breathable", "Elegant"] },
  { id: 12, name: "Dimout Fabric", category: "Curtain", use: "Window Treatment", color: "#2d5a7a", bg: "#e8f2f7", desc: "Medium light-filtering dimout for a soft ambiance. Great for living areas.", tags: ["Curtain", "Dimout", "Living Room"] },
];

const CATEGORIES = ["All", "Upholstery", "Leatherette", "Suede", "Woven", "Curtain", "Natural", "Printed"];

const WHY_US = [
  { icon: "🏛️", title: "Since 1976", desc: "Over 50 years of trust, craftsmanship, and relationships built across Rajasthan and India." },
  { icon: "✈️", title: "Direct Importer", desc: "We import directly from global mills — zero middlemen, best wholesale rates guaranteed." },
  { icon: "🎨", title: "500+ Designs", desc: "Largest collection of furnishing fabrics in Jaipur. New arrivals every season." },
  { icon: "🚚", title: "Pan India Delivery", desc: "Reliable bulk dispatch to any state. Order from anywhere in India." },
  { icon: "💬", title: "WhatsApp First", desc: "Instant responses on WhatsApp. Share requirements and get samples discussed in minutes." },
  { icon: "🏆", title: "Wholesale Only", desc: "We serve interior designers, furniture makers, and decorators at true wholesale prices." },
];

const NAV_LINKS = ["Home", "About", "Fabrics", "Gallery", "Contact"];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handle = () => setY(window.scrollY);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return y;
}

function useInView(ref: React.RefObject<Element>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

function WhatsAppBtn({ phone = "919829010380", message = "", label = "WhatsApp Us", style = {} }) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message || "Hi, I'm interested in fabrics from VLOOMS. Please share details.")}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "#25D366", color: "white",
      padding: "10px 22px", borderRadius: 50,
      fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
      textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 16px rgba(37,211,102,0.3)", ...style
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.3)"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      {label}
    </a>
  );
}

export default function VloomsWebsite() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const scrollY = useScrollY();

  const filtered = activeCategory === "All" ? FABRICS : FABRICS.filter(f => f.category === activeCategory);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#faf9f7", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f0ede8; }
        ::-webkit-scrollbar-thumb { background: #c4a882; border-radius: 3px; }
        .nav-link { cursor: pointer; font-size: 14px; font-weight: 500; color: #5a5a5a; transition: color 0.2s; position: relative; padding-bottom: 2px; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: #b8895a; transition: width 0.3s; }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link:hover::after { width: 100%; }
        .cat-btn { padding: 8px 20px; border-radius: 50px; border: 1.5px solid #ddd; background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; transition: all 0.2s; color: #666; }
        .cat-btn:hover { border-color: #b8895a; color: #b8895a; }
        .cat-btn.active { background: #1a1a1a; border-color: #1a1a1a; color: white; }
        .fabric-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #f0ede8; transition: transform 0.3s, box-shadow 0.3s; cursor: default; }
        .fabric-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.1); }
        .why-card { background: white; border-radius: 16px; padding: 28px 24px; border: 1px solid #f0ede8; transition: transform 0.3s, box-shadow 0.3s; }
        .why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .wa-enquire { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #25D366; text-decoration: none; padding: 7px 14px; border-radius: 50px; background: #e8faf0; transition: all 0.2s; }
        .wa-enquire:hover { background: #25D366; color: white; }
        .section-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #b8895a; font-weight: 600; margin-bottom: 12px; }
        .hero-grain { position: absolute; inset: 0; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); pointer-events: none; }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(40px); } to { opacity:1; transform: translateY(0); } }
        .hero-badge { animation: float 6s ease-in-out infinite; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: #1a1a1a; line-height: 1; }
        .footer-link { color: #aaa; font-size: 13px; cursor: pointer; transition: color 0.2s; text-decoration: none; }
        .footer-link:hover { color: #c4a882; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40 ? "rgba(250,249,247,0.95)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.4s"
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, letterSpacing: 3, color: "#1a1a1a" }}>VLOOMS<span style={{ color: "#b8895a" }}>®</span></div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#999", textTransform: "uppercase", marginTop: 1 }}>Vedanta Home Interior</div>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
          ))}
        </div>

        <WhatsAppBtn phone="919829010380" label="Get a Quote" style={{ fontSize: 13, padding: "8px 18px" }} />
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #fdf6ee 0%, #f5ede0 40%, #f0e8d8 100%)" }} />
        <div className="hero-grain" />

        {/* Decorative circles */}
        <div style={{ position: "absolute", right: -120, top: "10%", width: 600, height: 600, borderRadius: "50%", background: "rgba(184,137,90,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 80, top: "20%", width: 340, height: 340, borderRadius: "50%", background: "rgba(184,137,90,0.06)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(184,137,90,0.12)", border: "1px solid rgba(184,137,90,0.3)", padding: "6px 16px", borderRadius: 50, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b8895a", display: "inline-block" }} />
              <span style={{ fontSize: 11, letterSpacing: 2, color: "#b8895a", fontWeight: 600, textTransform: "uppercase" }}>Weaving Trust Since 1976</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, fontWeight: 700, lineHeight: 1.1, color: "#1a1a1a", marginBottom: 20 }}>
              Wholesalers &<br />
              Importers of Finest<br />
              <em style={{ color: "#b8895a", fontStyle: "italic" }}>Furnishing</em> Fabrics
            </h1>

            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#666", marginBottom: 36, maxWidth: 440 }}>
              Premium velvets, leatherette, suedes & woven fabrics — imported directly for interior designers, furniture makers, and decorators across India.
            </p>

            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <WhatsAppBtn phone="919829010380" message="Hi, I'm interested in wholesale fabrics from VLOOMS. Please share your catalog." label="WhatsApp for Catalog" />
              <span onClick={() => scrollTo("fabrics")} style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6, textDecoration: "underline", textUnderlineOffset: 4 }}>
                Browse Fabrics →
              </span>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              {[["50+", "Years of Trust"], ["500+", "Fabric Designs"], ["Pan India", "Delivery"]].map(([num, label]) => (
                <div key={label}>
                  <div className="stat-num" style={{ fontSize: 28 }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#999", marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right — fabric swatch grid */}
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Velvet", bg: "#f3e8ff", color: "#7c3f8e", pattern: "repeating-linear-gradient(45deg, rgba(124,63,142,0.05) 0px, rgba(124,63,142,0.05) 2px, transparent 2px, transparent 8px)" },
              { label: "Leatherette", bg: "#fef2ee", color: "#b5451b", pattern: "repeating-linear-gradient(0deg, rgba(181,69,27,0.05) 0px, rgba(181,69,27,0.05) 1px, transparent 1px, transparent 6px)" },
              { label: "Jacquard", bg: "#e8f4fd", color: "#1a5c8f", pattern: "repeating-linear-gradient(90deg, rgba(26,92,143,0.06) 0px, rgba(26,92,143,0.06) 2px, transparent 2px, transparent 10px), repeating-linear-gradient(0deg, rgba(26,92,143,0.06) 0px, rgba(26,92,143,0.06) 2px, transparent 2px, transparent 10px)" },
              { label: "Suede", bg: "#fef9ee", color: "#8B6914", pattern: "radial-gradient(circle, rgba(139,105,20,0.06) 1px, transparent 1px)", backgroundSize: "8px 8px" },
            ].map(({ label, bg, color, pattern, backgroundSize }, i) => (
              <div key={label} className="hero-badge" style={{ animationDelay: `${i * 1.2}s`, background: bg, borderRadius: 16, padding: 24, height: 160, display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundImage: pattern, backgroundSize: backgroundSize || "auto", border: `1px solid ${color}22` }}>
                <div style={{ fontSize: 11, letterSpacing: 2, color, fontWeight: 600, textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", color, opacity: 0.3 }}>✦</div>
              </div>
            ))}

            {/* Location badge */}
            <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", background: "white", borderRadius: 50, padding: "10px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              <span style={{ fontSize: 16 }}>📍</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>Ajmer Road, Jaipur · Open Mon–Sat</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 40px", background: "#1a1a1a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -200, top: -200, width: 600, height: 600, borderRadius: "50%", background: "rgba(184,137,90,0.04)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            <div className="section-label" style={{ color: "#b8895a" }}>Our Story</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "white", fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>
              Five decades of<br /><em style={{ color: "#b8895a" }}>Weaving Dreams</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#aaa", marginBottom: 20 }}>
              Today, VLOOMS® is Jaipur's most trusted name in imported furnishing fabrics — serving interior designers, furniture manufacturers, and decorators across India.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#aaa", marginBottom: 36 }}>
              We import directly from global textile mills, cutting out middlemen to bring you the finest velvets, PVC leatherettes, suedes, and woven fabrics at true wholesale prices. Every fabric in our store is personally curated for quality and durability.
            </p>
            <a href="https://maps.app.goo.gl/YfJMnJ4QQVzcmZ3A8" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#b8895a", fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: "1px solid #b8895a", paddingBottom: 2 }}>
              Visit our store →
            </a>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { num: "1976", label: "Established" },
                { num: "50+", label: "Years of trust" },
                { num: "500+", label: "Fabric designs" },
                { num: "100%", label: "Wholesale prices" },
              ].map(({ num, label }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 24px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#b8895a" }}>{num}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 6, textTransform: "capitalize" }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FABRICS */}
      <section id="fabrics" style={{ padding: "100px 40px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label">Our Collections</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
                Fabrics for every <em style={{ color: "#b8895a", fontStyle: "italic" }}>vision</em>
              </h2>
              <p style={{ fontSize: 15, color: "#888", maxWidth: 500, margin: "0 auto" }}>
                From opulent velvets to industrial leatherettes — browse our full wholesale collection.
              </p>
            </div>
          </FadeIn>

          {/* Category filter */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Fabric grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {filtered.map((fabric, i) => (
              <FadeIn key={fabric.id} delay={i * 0.04}>
                <div className="fabric-card">
                  {/* Swatch */}
                  <div style={{
                    height: 120, background: fabric.bg,
                    backgroundImage: `repeating-linear-gradient(45deg, ${fabric.color}0a 0px, ${fabric.color}0a 1px, transparent 1px, transparent 8px)`,
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative"
                  }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: fabric.color, opacity: 0.15 }} />
                    <div style={{ position: "absolute", top: 12, right: 12, background: "white", borderRadius: 50, padding: "3px 10px", fontSize: 10, fontWeight: 600, letterSpacing: 1, color: fabric.color, border: `1px solid ${fabric.color}33` }}>
                      {fabric.category}
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{fabric.name}</h3>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 12 }}>{fabric.desc}</p>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                      {fabric.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 11, background: "#f5f2ee", color: "#888", padding: "3px 10px", borderRadius: 50, fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>

                    <a className="wa-enquire" href={`https://wa.me/919829010380?text=Hi, I'm interested in ${fabric.name} from VLOOMS. Please share availability and wholesale rates.`} target="_blank" rel="noopener noreferrer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "100px 40px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">Why VLOOMS®</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, lineHeight: 1.2 }}>
                The wholesale fabric<br /><em style={{ color: "#b8895a" }}>difference</em>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {WHY_US.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="why-card">
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 40px", background: "linear-gradient(135deg, #1a1a1a 0%, #2d2520 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "rgba(184,137,90,0.06)", pointerEvents: "none" }} />
        <FadeIn>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="section-label" style={{ color: "#b8895a" }}>Wholesale Enquiries</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "white", fontWeight: 700, marginBottom: 16 }}>
              Ready to place a<br /><em style={{ color: "#b8895a" }}>bulk order?</em>
            </h2>
            <p style={{ fontSize: 15, color: "#aaa", marginBottom: 36 }}>
              WhatsApp us your requirements — fabric type, quantity, color. We'll get back to you within minutes with availability and pricing.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <WhatsAppBtn phone="919829010380" message="Hi, I want to place a wholesale order. Please share your catalog and pricing." label="WhatsApp: 98290 10380" style={{ fontSize: 15, padding: "12px 28px" }} />
              <a href="tel:+919829010380" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "white", padding: "12px 28px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}>
                📞 +91-9829010380
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", background: "#faf9f7" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div className="section-label">Find Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
              Visit our<br /><em style={{ color: "#b8895a" }}>showroom</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "📍", label: "Address", value: <a href="https://maps.app.goo.gl/YfJMnJ4QQVzcmZ3A8" target="_blank" rel="noopener noreferrer" style={{color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px"}}>87, Tagore Nagar, Below HDFC Bank, Near Aashopa Hospital, DCM, Ajmer Road, Jaipur – 302021, Rajasthan</a> },
                { icon: "📱", label: "WhatsApp", value: "98290 10380 · 7222 80 5555" },
                { icon: "📞", label: "Direct", value: "+91-9829010380 (Kailash Chandel)" },
                { icon: "✉️", label: "Email", value: "vedantahomeinterior@gmail.com" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 2, color: "#b8895a", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ background: "white", borderRadius: 20, padding: 36, border: "1px solid #f0ede8" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Send a WhatsApp enquiry</h3>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Tell us what you need — fabric type, quantity, color preference — and we'll respond fast.</p>

              {[
                { placeholder: "Your name", id: "name" },
                { placeholder: "Phone number", id: "phone" },
                { placeholder: "Fabric type (e.g. Velvet, Leatherette)", id: "fabric" },
                { placeholder: "Quantity required (in metres)", id: "qty" },
              ].map(({ placeholder, id }) => (
                <input key={id} id={id} placeholder={placeholder} style={{
                  width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid #eee",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginBottom: 12,
                  outline: "none", color: "#1a1a1a", background: "#faf9f7"
                }}
                  onFocus={e => { e.target.style.borderColor = "#b8895a"; }}
                  onBlur={e => { e.target.style.borderColor = "#eee"; }}
                />
              ))}

              <button
                onClick={() => {
                  const name = document.getElementById("name")?.value || "";
                  const phone = document.getElementById("phone")?.value || "";
                  const fabric = document.getElementById("fabric")?.value || "";
                  const qty = document.getElementById("qty")?.value || "";
                  const msg = `Hi, I'm ${name} (${phone}). I'm interested in ${fabric || "your fabrics"} — approx ${qty || "?"} metres. Please share details and pricing. Found you on vedantavlooms.in`;
                  window.open(`https://wa.me/919829010380?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                style={{ width: "100%", padding: "13px", borderRadius: 10, background: "#25D366", color: "white", border: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send via WhatsApp
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", padding: "48px 40px 32px", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, letterSpacing: 3, marginBottom: 4 }}>
                VLOOMS<span style={{ color: "#b8895a" }}>®</span>
              </div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#666", marginBottom: 16 }}>VEDANTA HOME INTERIOR · EST. 1976</div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 280 }}>
                Jaipur's trusted importer and wholesaler of premium furnishing fabrics. Weaving dreams, crafting elegance.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#b8895a", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>Quick Links</div>
              {NAV_LINKS.map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <span className="footer-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: "#b8895a", fontWeight: 600, marginBottom: 16, textTransform: "uppercase" }}>Contact</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 2 }}>
                <div>📱 7222 80 5555</div>
                <div>📞 +91-9829010380</div>
                <div>✉️ vedantahomeinterior@gmail.com</div>
                <div style={{ marginTop: 8 }}>87, Tagore Nagar,<br />Ajmer Road, Jaipur – 302021</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#444" }}>© 2026 Vedanta Home Interior. All rights reserved. | Website designed & developed by Lavanya Chandel</div>
            <div style={{ fontSize: 12, color: "#444" }}>vlooms.in</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
