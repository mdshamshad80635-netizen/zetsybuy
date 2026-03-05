"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── TYPES ────────────────────────────────────────────────
interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  emoji: string;
  rating: number;
  badge: string | null;
  features: string[];
  affiliateLink: string;
}

interface AmazonProduct {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  rating: number;
  reviews: number;
  affiliateLink: string;
  badge: string;
}

interface Category {
  name: string;
  icon: string;
  count: string;
}

// ─── DATA ─────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 1, title: "Eternal Rose Bouquet Box", description: "12 preserved roses in a luxury velvet box with LED lights. Lasts forever, just like your love.", price: "₹1,899", category: "Romantic Gifts", emoji: "🌹", rating: 4.9, badge: "HOT", affiliateLink: "https://www.amazon.in/s?k=preserved+rose+bouquet+box+gift&tag=zetsy-21", features: ["12 Preserved Roses", "LED Strip Lighting", "Personalized Message Card", "Premium Velvet Box"] },
  { id: 2, title: "Birthday Surprise Hamper", description: "A delightful hamper with chocolates, scented candle, journal, and handwritten note.", price: "₹1,299", category: "Birthday Gifts", emoji: "🎂", rating: 4.8, badge: "NEW", affiliateLink: "https://www.amazon.in/s?k=birthday+surprise+hamper+gift&tag=zetsy-21", features: ["Artisan Chocolates", "Soy Wax Candle", "Gratitude Journal", "Silk Ribbon Wrap"] },
  { id: 3, title: "Couple Memory Jar", description: "A beautiful glass jar filled with 52 handwritten love notes and surprise date ideas.", price: "₹799", category: "Couple Gifts", emoji: "💕", rating: 4.7, badge: null, affiliateLink: "https://www.amazon.in/s?k=couple+memory+jar+love+notes&tag=zetsy-21", features: ["52 Love Notes", "Printed Date Ideas", "Decorated Mason Jar", "Custom Name Labels"] },
  { id: 4, title: "Anniversary Starmap Print", description: "Custom star map showing the exact night sky from your special date. Framed and ready.", price: "₹2,199", category: "Anniversary Gifts", emoji: "⭐", rating: 4.9, badge: "POPULAR", affiliateLink: "https://www.amazon.in/s?k=custom+star+map+anniversary+gift+framed&tag=zetsy-21", features: ["Custom Date & Location", "A3 Framed Print", "High-quality Paper", "Free Message Engraving"] },
  { id: 5, title: "Luxury Spa Gift Set", description: "Pamper her with rose bath salts, aromatherapy oils, and silk face mask. Pure bliss.", price: "₹1,499", category: "Romantic Gifts", emoji: "🌸", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=luxury+spa+gift+set+women&tag=zetsy-21", features: ["Rose Bath Salts", "3 Essential Oils", "Silk Eye Mask", "Exfoliating Mitt"] },
  { id: 6, title: "Personalised Photo Locket", description: "A sterling silver locket with space for two photos. Engraved with your message.", price: "₹1,799", category: "Customized Gifts", emoji: "📿", rating: 4.9, badge: "TRENDING", affiliateLink: "https://www.amazon.in/s?k=personalised+photo+locket+silver&tag=zetsy-21", features: ["925 Sterling Silver", "2 Photo Slots", "Custom Engraving", "Gift Pouch Included"] },
  { id: 7, title: "Diwali Luxury Gift Hamper", description: "Premium hamper with dry fruits, artisan sweets, scented diyas, and brass home décor.", price: "₹3,499", category: "Festival Gifts", emoji: "🪔", rating: 4.9, badge: "FESTIVAL", affiliateLink: "https://www.amazon.in/s?k=diwali+luxury+gift+hamper+dry+fruits&tag=zetsy-21", features: ["Premium Dry Fruits", "Artisan Mithai", "Scented Diyas", "Brass Showpiece"] },
  { id: 8, title: "Mystery Surprise Box", description: "A curated surprise box with 5-7 premium gifts. You never know what magic awaits!", price: "₹2,999", category: "Surprise Boxes", emoji: "📦", rating: 4.7, badge: "MYSTERY", affiliateLink: "https://www.amazon.in/s?k=mystery+surprise+gift+box&tag=zetsy-21", features: ["5-7 Surprise Items", "₹5000+ Worth of Gifts", "Premium Packaging", "Express Delivery Available"] },
  { id: 9, title: "Handmade Chocolate Tower", description: "A stunning 3-tier tower of 24 handcrafted Belgian chocolates in luxury packaging.", price: "₹1,699", category: "Birthday Gifts", emoji: "🍫", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=chocolate+tower+gift+box+premium&tag=zetsy-21", features: ["24 Belgian Chocolates", "3-Tier Presentation Box", "12 Flavour Varieties", "Custom Ribbon"] },
  { id: 10, title: "Couple Caricature Portrait", description: "A hand-drawn digital caricature of you and your partner. Printed and framed.", price: "₹2,499", category: "Couple Gifts", emoji: "🎨", rating: 4.9, badge: "CUSTOM", affiliateLink: "https://www.amazon.in/s?k=couple+caricature+portrait+framed&tag=zetsy-21", features: ["Hand-drawn Digital Art", "A4 Framed Print", "3-4 Day Delivery", "Unlimited Revisions"] },
  { id: 11, title: "Silver Bangle Charm Set", description: "Rose gold plated charm bangles with heart, infinity, and moon charms. Dazzling gift.", price: "₹1,099", category: "Romantic Gifts", emoji: "💍", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=silver+bangle+charm+set+gift&tag=zetsy-21", features: ["Set of 3 Bangles", "Anti-tarnish Coating", "Gift Box Included", "Adjustable Size"] },
  { id: 12, title: "Scented Candle Trio", description: "Three luxury soy wax candles in Rose, Jasmine, and Sandalwood. 40hr burn time each.", price: "₹899", category: "Romantic Gifts", emoji: "🕯️", rating: 4.7, badge: null, affiliateLink: "https://www.amazon.in/s?k=scented+candle+gift+set+soy+wax&tag=zetsy-21", features: ["3 x 200g Candles", "Natural Soy Wax", "Cotton Wick", "Ceramic Vessels"] },
];

const CATEGORIES: Category[] = [
  { name: "Birthday Gifts", icon: "🎂", count: "45+ gifts" },
  { name: "Couple Gifts", icon: "💑", count: "32+ gifts" },
  { name: "Anniversary Gifts", icon: "💒", count: "28+ gifts" },
  { name: "Romantic Gifts", icon: "❤️", count: "38+ gifts" },
  { name: "Customized Gifts", icon: "✏️", count: "20+ gifts" },
  { name: "Festival Gifts", icon: "🪔", count: "25+ gifts" },
  { name: "Surprise Boxes", icon: "🎁", count: "15+ gifts" },
];

const AMAZON_PRODUCTS: AmazonProduct[] = [
  { id: "amz1", title: "Printed Birthday Explosion Box", description: "Pop-up memory gift box with photo slots, ribbons, and message cards. A wow moment every time.", emoji: "🎂", category: "Birthday Gifts", rating: 4.6, reviews: 3241, affiliateLink: "https://www.amazon.in/s?k=birthday+explosion+box+gift&tag=zetsy-21", badge: "Amazon Deal" },
  { id: "amz2", title: "LED Rose Lamp Night Light", description: "Eternal rose inside an LED glass dome. Glows in 7 colours. Perfect romantic gift.", emoji: "🌹", category: "Couple Gifts", rating: 4.5, reviews: 5876, affiliateLink: "https://www.amazon.in/s?k=led+rose+lamp+gift&tag=zetsy-21", badge: "Best Seller" },
  { id: "amz3", title: "Wireless Earbuds Gift Set", description: "Premium TWS earbuds with charging case in an elegant gift box. Clear sound, long battery.", emoji: "🎧", category: "Tech Gifts", rating: 4.4, reviews: 8921, affiliateLink: "https://www.amazon.in/s?k=wireless+earbuds+gift+set&tag=zetsy-21", badge: "Top Pick" },
  { id: "amz4", title: "Succulent Plant Terrarium Kit", description: "Mini glass terrarium with three succulent plants, pebbles, and soil. A living gift.", emoji: "🪴", category: "Home Decor Gifts", rating: 4.7, reviews: 2134, affiliateLink: "https://www.amazon.in/s?k=succulent+terrarium+gift&tag=zetsy-21", badge: "Trending" },
  { id: "amz5", title: "Diwali Kaju Katli Premium Box", description: "500g of authentic kaju katli in a royal brass-finish gift box. Perfect festive sharing.", emoji: "🪔", category: "Festival Gifts", rating: 4.8, reviews: 4412, affiliateLink: "https://www.amazon.in/s?k=diwali+kaju+katli+gift+box&tag=zetsy-21", badge: "Festival Special" },
  { id: "amz6", title: "Couple Zodiac Mug Set", description: "Two ceramic mugs with your zodiac signs. Microwave safe. Perfect morning ritual gift.", emoji: "☕", category: "Couple Gifts", rating: 4.3, reviews: 1897, affiliateLink: "https://www.amazon.in/s?k=couple+zodiac+mug+gift+set&tag=zetsy-21", badge: "Amazon Deal" },
  { id: "amz7", title: "Smart LED Desk Lamp", description: "USB-powered touch-dim desk lamp with wireless charging pad. Stylish and practical.", emoji: "💡", category: "Tech Gifts", rating: 4.5, reviews: 7634, affiliateLink: "https://www.amazon.in/s?k=smart+led+desk+lamp+wireless+charging&tag=zetsy-21", badge: "Top Pick" },
  { id: "amz8", title: "Handcrafted Macramé Wall Art", description: "Boho-style cotton rope wall hanging. Adds warmth to any room. Ships ready to hang.", emoji: "🖼️", category: "Home Decor Gifts", rating: 4.6, reviews: 1543, affiliateLink: "https://www.amazon.in/s?k=macrame+wall+hanging+gift&tag=zetsy-21", badge: "Trending" },
  { id: "amz9", title: "Birthday Scrapbook DIY Kit", description: "Create a memory-filled scrapbook with stickers, envelopes, and decorative papers.", emoji: "📔", category: "Birthday Gifts", rating: 4.5, reviews: 2867, affiliateLink: "https://www.amazon.in/s?k=birthday+scrapbook+diy+kit&tag=zetsy-21", badge: "Best Seller" },
  { id: "amz10", title: "Rakhi Gift Hamper Premium", description: "A curated hamper with dry fruits, sweets, roli-chawal, and a hand-crafted Rakhi set.", emoji: "🎀", category: "Festival Gifts", rating: 4.7, reviews: 3210, affiliateLink: "https://www.amazon.in/s?k=rakhi+gift+hamper&tag=zetsy-21", badge: "Festival Special" },
];

const HERO_EMOJIS = ["🎁", "💝", "🌹", "💕", "⭐", "🎀", "🎊", "💖", "🌸", "✨", "💍", "🕯️", "🍫", "🎂"];
const INSTA_EMOJIS = ["🌹💝", "🎁✨", "💕🎀", "⭐🌸", "🍫💖", "💍✨", "🪔🎊", "📦🎁"];
const CAT_GRADIENTS = [
  "linear-gradient(135deg,#ffd6e0,#ffb3c6)",
  "linear-gradient(135deg,#ffd6e7,#f8a9d8)",
  "linear-gradient(135deg,#e0c3fc,#d4a5f5)",
  "linear-gradient(135deg,#ffd6e0,#ffa3b5)",
  "linear-gradient(135deg,#ffd700,#ffc400)",
  "linear-gradient(135deg,#c3e8fc,#a0d0f0)",
  "linear-gradient(135deg,#d4f5c0,#b5eaa0)",
];
const AMZ_CATS = ["All Gifts", "Birthday Gifts", "Couple Gifts", "Tech Gifts", "Home Decor Gifts", "Festival Gifts"];
const AMZ_ICONS: Record<string, string> = { "All Gifts": "🎁", "Birthday Gifts": "🎂", "Couple Gifts": "💑", "Tech Gifts": "📱", "Home Decor Gifts": "🏠", "Festival Gifts": "🪔" };
const AMZ_CAT_BG: Record<string, string> = {
  "Birthday Gifts": "linear-gradient(135deg,#fff3cd,#ffe082)",
  "Couple Gifts": "linear-gradient(135deg,#fce4ec,#f8bbd0)",
  "Tech Gifts": "linear-gradient(135deg,#e8f5e9,#c8e6c9)",
  "Home Decor Gifts": "linear-gradient(135deg,#e3f2fd,#bbdefb)",
  "Festival Gifts": "linear-gradient(135deg,#fff8e1,#ffecb3)",
};

// ─── HELPERS ──────────────────────────────────────────────
const stars = (r: number) => "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "");

const orderOnWhatsApp = (name: string, price: string) => {
  const msg = `Hello ZetsyBuy,%0AI want to order this gift.%0A%0AProduct Name: ${encodeURIComponent(name)}%0APrice: ${encodeURIComponent(price)}`;
  window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
};

// ─── STYLES (injected via <style> tag) ─────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:#f0e6f0}
  ::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#9333ea,#f43f6a);border-radius:3px}

  .zetsy-cursor{position:fixed;width:12px;height:12px;background:#f43f6a;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s;mix-blend-mode:multiply}
  .zetsy-cursor-f{position:fixed;width:36px;height:36px;border:2px solid #c9945c;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:all .15s ease;opacity:.6}

  @keyframes floatUp{0%{transform:translateY(110vh) rotate(0deg);opacity:0}10%{opacity:.15}90%{opacity:.15}100%{transform:translateY(-10vh) rotate(360deg);opacity:0}}
  @keyframes giftBob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-20px) rotate(3deg)}}
  @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
  @keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(244,63,106,.4)}50%{box-shadow:0 0 0 12px rgba(244,63,106,0)}}
  @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
  @keyframes socialBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes stickyPulse{0%,100%{box-shadow:0 8px 25px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.4)}50%{box-shadow:0 8px 25px rgba(37,211,102,.5),0 0 0 15px rgba(37,211,102,0)}}
  @keyframes amzPulse{0%,100%{box-shadow:0 4px 12px rgba(255,153,0,.4)}50%{box-shadow:0 4px 20px rgba(255,153,0,.7)}}
  @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes loadBar{from{width:0}to{width:100%}}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
  @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}

  .z-hero-title{font-family:'Playfair Display',serif}
  .z-serif{font-family:'Playfair Display',serif}
  .z-cormorant{font-family:'Cormorant Garamond',serif}

  .gift-bob{animation:giftBob 3s ease-in-out infinite}
  .btn-shimmer::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.2),transparent);animation:shimmer 2s infinite}
  .sticky-wa-anim{animation:stickyPulse 2.5s infinite}
  .amz-badge-anim{animation:amzPulse 3s ease-in-out infinite}
  .social-bob-1{animation:socialBob 2s ease-in-out infinite}
  .social-bob-2{animation:socialBob 2s ease-in-out infinite .2s}
  .social-bob-3{animation:socialBob 2s ease-in-out infinite .4s}
  .social-bob-4{animation:socialBob 2s ease-in-out infinite .6s}

  .reveal{opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s}
  .reveal.visible{opacity:1;transform:translateY(0)}

  .modal-anim{animation:slideUp .4s cubic-bezier(.175,.885,.32,1.275)}
  .modal-bg-anim{animation:fadeIn .3s}

  .amz-shimmer::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.25),transparent);transform:translateX(-100%);transition:transform .5s}
  .amz-shimmer:hover::before{transform:translateX(100%)}
`;

// ─── LOADING SCREEN ───────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "linear-gradient(135deg,#1a0a14,#2d0a2e,#1a0020,#0d0018)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZetsyBuy ✨</div>
      <div style={{ width: 200, height: 4, background: "rgba(255,255,255,.1)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(135deg,#f43f6a,#c9945c)", borderRadius: 2, animation: "loadBar 2s ease-out forwards" }} />
      </div>
      <div style={{ fontSize: "1.5rem", animation: "spin 2s linear infinite" }}>🎁💝🎀</div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────
function Navbar({ dark, setDark, search, setSearch }: { dark: boolean; setDark: (v: boolean) => void; search: string; setSearch: (v: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrolled ? (dark ? "rgba(13,10,20,.95)" : "rgba(255,248,243,.92)") : "transparent";
  const linkColor = scrolled ? (dark ? "white" : "#1a0a14") : "white";

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70, background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 4px 30px rgba(244,63,106,.1)" : "none", transition: "all .4s" }}>
      <a href="#hero" style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 700, background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>ZetsyBuy</a>

      <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none", alignItems: "center" }} className="nav-ul">
        {["Home:#hero", "Shop:#trending", "Categories:#categories", "Amazon Gifts:#amazon-gifts", "Instagram:#instagram", "Contact:#footer"].map(item => {
          const [label, href] = item.split(":");
          return (
            <li key={label}>
              <a href={href} style={{ color: linkColor, fontSize: ".88rem", fontWeight: 500, textDecoration: "none", transition: "color .3s" }}>{label}</a>
            </li>
          );
        })}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ background: scrolled ? "rgba(244,63,106,.08)" : "rgba(255,255,255,.12)", border: `1px solid ${scrolled ? "rgba(244,63,106,.2)" : "rgba(255,255,255,.25)"}`, borderRadius: 50, padding: ".4rem 1rem", display: "flex", alignItems: "center", gap: ".4rem" }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search gifts..." style={{ background: "none", border: "none", outline: "none", fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", color: linkColor, width: 130 }} />
        </div>
        <button onClick={() => setDark(!dark)} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{dark ? "☀️" : "🌙"}</button>
        <button style={{ background: "linear-gradient(135deg,#f43f6a,#c9945c)", color: "white", border: "none", padding: ".5rem 1.2rem", borderRadius: 50, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: ".85rem", fontWeight: 500, display: "flex", alignItems: "center", gap: ".4rem", boxShadow: "0 4px 20px rgba(244,63,106,.35)" }}>
          🛒 Cart <span style={{ background: "#f43f6a", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem" }}>3</span>
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────
function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const items: HTMLDivElement[] = [];
    const create = () => {
      const el = document.createElement("div");
      el.textContent = HERO_EMOJIS[Math.floor(Math.random() * HERO_EMOJIS.length)];
      el.style.cssText = `position:absolute;font-size:${1.5 + Math.random() * 2}rem;opacity:.15;left:${Math.random() * 100}%;animation:floatUp ${8 + Math.random() * 12}s linear ${-Math.random() * 10}s infinite;pointer-events:none;user-select:none`;
      canvas.appendChild(el);
      items.push(el);
      setTimeout(() => { try { canvas.removeChild(el); } catch (_) {} }, 22000);
    };
    for (let i = 0; i < 25; i++) create();
    const iv = setInterval(create, 1200);
    return () => { clearInterval(iv); items.forEach(el => { try { canvas.removeChild(el); } catch (_) {} }); };
  }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1a0a14,#2d0a2e 30%,#1a0020 60%,#0d0018)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div ref={canvasRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }} />

      <div style={{ position: "relative", zIndex: 10, padding: "0 8%", maxWidth: 900 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "rgba(244,63,106,.15)", border: "1px solid rgba(244,63,106,.3)", padding: ".4rem 1rem", borderRadius: 50, fontSize: ".8rem", color: "#fda4af", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1.5rem", animation: "fadeInUp .8s .2s both" }}>🎁 Premium Gift Boutique • 2024</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,6rem)", fontWeight: 700, color: "white", lineHeight: 1.05, marginBottom: "1.5rem", animation: "fadeInUp .8s .4s both" }}>
          Find the <span style={{ background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Perfect Gift</span><br />for Every Occasion
        </h1>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 520, marginBottom: "2.5rem", animation: "fadeInUp .8s .6s both" }}>Unique gifts for birthdays, couples, anniversaries and surprises. Crafted with love, delivered with joy.</p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeInUp .8s .8s both" }}>
          <a href="#trending" style={{ background: "linear-gradient(135deg,#f43f6a,#c9945c)", color: "white", border: "none", padding: ".85rem 2rem", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem", boxShadow: "0 20px 60px rgba(244,63,106,.18)", transition: "all .3s" }}>🎁 Shop Gifts</a>
          <a href="#categories" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,.3)", padding: ".85rem 2rem", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", fontWeight: 500, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem", backdropFilter: "blur(10px)", transition: "all .3s" }}>✨ Explore Collections</a>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "8%", right: "8%", display: "flex", gap: "2rem", animation: "fadeInUp .8s 1s both" }}>
        {[["5K+", "Happy Customers"], ["200+", "Gift Options"], ["4.9★", "Rating"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 700, background: "linear-gradient(135deg,#c9945c,#f5d0b0,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
            <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", letterSpacing: ".08em", textTransform: "uppercase" }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: "3%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", color: "rgba(255,255,255,.4)", fontSize: ".75rem", letterSpacing: ".1em", animation: "bounce 2s infinite" }}>
        <span>scroll down</span><span>↓</span>
      </div>
    </section>
  );
}

// ─── FEATURED GIFT ────────────────────────────────────────
function FeaturedGift() {
  return (
    <section id="featured" style={{ padding: "6rem 5%", background: "linear-gradient(135deg,#0d0018,#1a0a14 50%,#2d0a2e)" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#fda4af", fontWeight: 500 }}>✨ Editor&apos;s Pick</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "white", marginTop: ".5rem" }}>🎁 ZetsyBuy Special Gift</h2>
        <p className="z-cormorant" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.6)", marginTop: ".5rem" }}>Our most treasured, most loved creation — handpicked for you.</p>
      </div>

      <div className="reveal" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 32, backdropFilter: "blur(20px)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520, position: "relative", transition: "transform .4s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
        <div style={{ background: "linear-gradient(135deg,rgba(244,63,106,.2),rgba(147,51,234,.2))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <span className="gift-bob" style={{ fontSize: "12rem", filter: "drop-shadow(0 20px 40px rgba(244,63,106,.4))" }}>🎁</span>
          <div style={{ position: "absolute", top: 20, left: 20, background: "linear-gradient(135deg,#f43f6a,#c9945c)", color: "white", padding: ".35rem .9rem", borderRadius: 50, fontSize: ".75rem", fontWeight: 600, letterSpacing: ".05em", animation: "waPulse 2s infinite" }}>✨ BESTSELLER</div>
        </div>
        <div style={{ padding: "3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: ".75rem", letterSpacing: ".2em", color: "#fda4af", textTransform: "uppercase", marginBottom: "1rem" }}>🌸 ZetsyBuy Signature Collection</div>
          <h2 className="z-serif" style={{ fontSize: "2.2rem", fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: "1rem" }}>Luxury Rose & Love Memory Box</h2>
          <p style={{ color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: "2rem", fontSize: ".95rem" }}>A timeless keepsake filled with handpicked roses, personalized notes, premium chocolates, and a glowing LED heart frame. The ultimate expression of love.</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
            <span className="z-serif" style={{ fontSize: "2.5rem", fontWeight: 700, background: "linear-gradient(135deg,#c9945c,#f5d0b0,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₹2,499</span>
            <span style={{ fontSize: "1rem", textDecoration: "line-through", color: "rgba(255,255,255,.35)" }}>₹3,999</span>
          </div>
          <button onClick={() => orderOnWhatsApp("Luxury Rose & Love Memory Box", "₹2,499")} className="btn-shimmer" style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", background: "linear-gradient(135deg,#25d366,#128c7e)", color: "white", border: "none", padding: "1rem 2rem", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 600, cursor: "pointer", boxShadow: "0 10px 30px rgba(37,211,102,.35)", transition: "all .3s", width: "fit-content", position: "relative", overflow: "hidden" }}>
            <span>📱</span> Order on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────
function ProductCard({ p, onQuickView }: { p: Product; onQuickView: (p: Product) => void }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="reveal" onClick={() => onQuickView(p)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "white", borderRadius: 24, overflow: "hidden", border: `1px solid ${hovered ? "rgba(244,63,106,.2)" : "rgba(244,63,106,.08)"}`, transition: "all .4s cubic-bezier(.175,.885,.32,1.275)", transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)", boxShadow: hovered ? "0 20px 60px rgba(244,63,106,.18)" : "none", cursor: "pointer", position: "relative" }}>

      {/* Image */}
      <div style={{ height: 220, background: "linear-gradient(135deg,#ffe4e1,#f3e0ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", position: "relative", overflow: "hidden", transition: "transform .4s", transform: hovered ? "scale(1.05)" : "scale(1)" }}>
        <span style={{ transition: "transform .4s", transform: hovered ? "scale(1.15) rotate(5deg)" : "scale(1)" }}>{p.emoji}</span>
        {p.badge && <div style={{ position: "absolute", top: 14, left: 14, background: "linear-gradient(135deg,#f43f6a,#c9945c)", color: "white", padding: ".25rem .75rem", borderRadius: 50, fontSize: ".7rem", fontWeight: 600 }}>{p.badge}</div>}
        <button onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted); }}
          style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, background: wishlisted ? "#f43f6a" : "white", color: wishlisted ? "white" : "inherit", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem", cursor: "pointer", transition: "all .3s", boxShadow: "0 2px 10px rgba(0,0,0,.1)", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(.8)" }}>
          {wishlisted ? "❤️" : "🤍"}
        </button>
        {hovered && (
          <div onClick={e => { e.stopPropagation(); onQuickView(p); }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(26,10,20,.85)", backdropFilter: "blur(10px)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", padding: ".75rem", fontSize: ".8rem", fontWeight: 500, cursor: "pointer" }}>
            👁 Quick View
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "1.2rem 1.4rem 1.4rem" }}>
        {/* Shop on Amazon — top of card */}
        <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer nofollow"
          onClick={e => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", gap: ".4rem", background: "linear-gradient(135deg,#ffb703,#ff9900)", color: "#1a0a00", border: "none", padding: ".52rem .9rem", borderRadius: 50, fontSize: ".75rem", fontWeight: 700, cursor: "pointer", transition: "all .3s", width: "100%", justifyContent: "center", fontFamily: "'DM Sans',sans-serif", marginBottom: ".75rem", textDecoration: "none", letterSpacing: ".02em", boxShadow: "0 4px 14px rgba(255,153,0,.3)", position: "relative", overflow: "hidden" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 22px rgba(255,153,0,.45)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 14px rgba(255,153,0,.3)"; }}>
          🛒 Shop on Amazon
        </a>
        <div style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".1em", color: "#9333ea", fontWeight: 500, marginBottom: ".3rem" }}>{p.category}</div>
        <div className="z-serif" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1a0a14", marginBottom: ".5rem", lineHeight: 1.3 }}>{p.title}</div>
        <div style={{ fontSize: ".8rem", color: "#9a7080", lineHeight: 1.6, marginBottom: ".8rem" }}>{p.description.substring(0, 80)}...</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="z-serif" style={{ fontSize: "1.2rem", fontWeight: 700, background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.price}</div>
          <div style={{ fontSize: ".8rem", color: "#f5a623" }}>{stars(p.rating)} {p.rating}</div>
        </div>
      </div>
    </div>
  );
}

// ─── TRENDING SECTION ─────────────────────────────────────
function TrendingSection({ products, onQuickView }: { products: Product[]; onQuickView: (p: Product) => void }) {
  return (
    <section id="trending" style={{ padding: "6rem 5%", background: "#fff8f3" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#f43f6a", fontWeight: 500 }}>🔥 Most Loved</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#1a0a14", marginTop: ".4rem", lineHeight: 1.2 }}>Trending Gifts</h2>
        <p className="z-cormorant" style={{ fontSize: "1.15rem", color: "#7a5060", marginTop: ".5rem" }}>Discover what everyone is gifting right now.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.8rem" }}>
        {products.map(p => <ProductCard key={p.id} p={p} onQuickView={onQuickView} />)}
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────
function CategoriesSection({ onFilter }: { onFilter: (cat: string) => void }) {
  return (
    <section id="categories" style={{ padding: "6rem 5%", background: "linear-gradient(135deg,#fff8f3,#fdf0f8)" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#f43f6a", fontWeight: 500 }}>🎀 Browse By Occasion</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#1a0a14", marginTop: ".4rem" }}>Gift Collections</h2>
        <p className="z-cormorant" style={{ fontSize: "1.15rem", color: "#7a5060", marginTop: ".5rem" }}>Find the perfect gift for every special moment in life.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.2rem" }}>
        {CATEGORIES.map((cat, i) => (
          <CatCard key={cat.name} cat={cat} gradient={CAT_GRADIENTS[i]} onFilter={onFilter} />
        ))}
      </div>
    </section>
  );
}

function CatCard({ cat, gradient, onFilter }: { cat: Category; gradient: string; onFilter: (cat: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="reveal" onClick={() => { onFilter(cat.name); document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" }); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 180, cursor: "pointer", transition: "all .4s", transform: hovered ? "translateY(-8px) scale(1.02)" : "none", boxShadow: hovered ? "0 20px 60px rgba(244,63,106,.18)" : "none", border: "1px solid rgba(244,63,106,.1)" }}>
      <div style={{ position: "absolute", inset: 0, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", transition: "transform .4s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>{cat.icon}</div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,10,20,.8),transparent 60%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.2rem" }}>
        <div className="z-serif" style={{ fontSize: "1rem", fontWeight: 600, color: "white" }}>{cat.name}</div>
        <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.6)" }}>{cat.count}</div>
      </div>
    </div>
  );
}

// ─── AMAZON SECTION ───────────────────────────────────────
function AmazonSection() {
  const [activeTab, setActiveTab] = useState("All Gifts");
  const filtered = activeTab === "All Gifts" ? AMAZON_PRODUCTS : AMAZON_PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section id="amazon-gifts" style={{ padding: "6rem 5%", background: "linear-gradient(160deg,#fff8f0,#fff3e8 40%,#fef9f0)", position: "relative", overflow: "hidden" }}>
      {/* Section Head */}
      <div className="reveal" style={{ marginBottom: "3rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#ff9900", fontWeight: 500 }}>🛒 Affiliate Partner</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#1a0a14", marginTop: ".4rem" }}>Shop Gifts on Amazon</h2>
        <p className="z-cormorant" style={{ fontSize: "1.15rem", color: "#7a5060", marginTop: ".5rem" }}>Discover trending gifts available on Amazon — curated just for you.</p>
      </div>

      {/* Disclaimer */}
      <div className="reveal" style={{ background: "linear-gradient(135deg,#fff3cd,#fff8e8)", border: "1px solid rgba(255,153,0,.3)", borderLeft: "4px solid #ff9900", borderRadius: 14, padding: "1rem 1.4rem", marginBottom: "2.5rem", display: "flex", alignItems: "flex-start", gap: "1rem", fontSize: ".83rem", color: "#7a5020", lineHeight: 1.6 }}>
        <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: ".1rem" }}>ℹ️</span>
        <div>
          <strong style={{ color: "#b36a00", display: "block", marginBottom: ".2rem", fontSize: ".85rem" }}>Affiliate Disclosure</strong>
          ZetsyBuy participates in the Amazon Affiliate Program. Some products listed on this page are from Amazon. As an Amazon Associate, ZetsyBuy earns from qualifying purchases. When you click and purchase through our links, we may earn a small commission at <em>no extra cost to you</em>. All product details and pricing are set by Amazon.
        </div>
      </div>

      {/* Tabs */}
      <div className="reveal" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        {AMZ_CATS.map(cat => (
          <button key={cat} onClick={() => setActiveTab(cat)}
            style={{ padding: ".45rem 1.1rem", borderRadius: 50, border: activeTab === cat ? "none" : "1.5px solid rgba(255,153,0,.3)", background: activeTab === cat ? "linear-gradient(135deg,#ff9900,#ff6600)" : "white", color: activeTab === cat ? "white" : "#b36a00", fontSize: ".8rem", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .25s", boxShadow: activeTab === cat ? "0 6px 20px rgba(255,153,0,.35)" : "none", transform: activeTab === cat ? "translateY(-2px)" : "none", letterSpacing: ".03em" }}>
            {AMZ_ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.6rem" }}>
        {filtered.map((p, i) => <AmazonCard key={p.id} p={p} delay={i * 60} />)}
      </div>

      {/* Redirect notice */}
      <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem", fontSize: ".78rem", color: "#b8926a", display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem" }}>
        🔗 All &quot;View on Amazon&quot; buttons redirect to Amazon.in. ZetsyBuy does not process any payments for these products.
      </div>

      {/* SEO Strip */}
      <div className="reveal" style={{ marginTop: "3.5rem", background: "linear-gradient(135deg,rgba(255,153,0,.08),rgba(255,102,0,.05))", border: "1px solid rgba(255,153,0,.15)", borderRadius: 20, padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <div className="z-serif" style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a0a14", marginBottom: ".4rem" }}>Best Gifts on Amazon — Handpicked for You 🎁</div>
          <p style={{ fontSize: ".85rem", color: "#9a7060", maxWidth: 420, lineHeight: 1.6 }}>Explore hundreds of gift ideas for every occasion — birthdays, anniversaries, festivals, and more. All available on Amazon with fast delivery.</p>
        </div>
        <a href="https://www.amazon.in/s?k=gifts&tag=zetsy-21" target="_blank" rel="noopener noreferrer nofollow"
          style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "linear-gradient(135deg,#ff9900,#ff6600)", color: "white", border: "none", padding: ".8rem 1.8rem", borderRadius: 50, fontSize: ".88rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "all .3s", boxShadow: "0 8px 25px rgba(255,153,0,.35)", whiteSpace: "nowrap" }}>
          🛒 Browse All on Amazon
        </a>
      </div>
    </section>
  );
}

function AmazonCard({ p, delay }: { p: AmazonProduct; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const bg = AMZ_CAT_BG[p.category] || "linear-gradient(135deg,#fff3cd,#ffe082)";

  return (
    <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer nofollow"
      className="reveal"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "white", borderRadius: 22, overflow: "hidden", border: `1px solid ${hovered ? "rgba(255,153,0,.35)" : "rgba(255,153,0,.12)"}`, transition: "all .4s cubic-bezier(.175,.885,.32,1.275)", transform: hovered ? "translateY(-10px) scale(1.02)" : "none", boxShadow: hovered ? "0 24px 60px rgba(255,153,0,.2)" : "none", position: "relative", cursor: "pointer", textDecoration: "none", display: "block", animationDelay: `${delay}ms` }}>

      {/* Amazon badge */}
      <div className="amz-badge-anim" style={{ position: "absolute", top: 12, left: 12, zIndex: 3, background: "linear-gradient(135deg,#ff9900,#ff6600)", color: "white", padding: ".28rem .75rem", borderRadius: 50, fontSize: ".68rem", fontWeight: 700, letterSpacing: ".06em", display: "flex", alignItems: "center", gap: ".3rem" }}>
        🛒 {p.badge}
      </div>

      {/* Ext badge */}
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 3, background: "rgba(255,255,255,.9)", backdropFilter: "blur(8px)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", boxShadow: "0 2px 10px rgba(0,0,0,.1)", opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(.7)", transition: "all .3s", border: "1px solid rgba(255,153,0,.2)" }}>↗</div>

      {/* Image */}
      <div style={{ height: 200, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5.5rem", position: "relative", overflow: "hidden", transition: "transform .4s", transform: hovered ? "scale(1.04)" : "scale(1)" }}>
        <span style={{ transition: "transform .5s cubic-bezier(.175,.885,.32,1.275)", transform: hovered ? "scale(1.2) rotate(8deg)" : "scale(1)" }}>{p.emoji}</span>
      </div>

      {/* Body */}
      <div style={{ padding: "1.1rem 1.3rem 1.4rem" }}>
        <div style={{ fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".12em", color: "#ff9900", fontWeight: 600, marginBottom: ".3rem" }}>{p.category}</div>
        <div className="z-serif" style={{ fontSize: "1rem", fontWeight: 600, color: "#1a0a14", lineHeight: 1.35, marginBottom: ".45rem" }}>{p.title}</div>
        <div style={{ fontSize: ".78rem", color: "#9a7060", lineHeight: 1.65, marginBottom: ".9rem" }}>{p.description}</div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: ".9rem" }}>
          <span style={{ color: "#ff9900", fontSize: ".82rem" }}>{stars(p.rating)}</span>
          <span style={{ fontSize: ".72rem", color: "#b8926a", marginLeft: ".3rem" }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ fontSize: ".7rem", color: "#b8926a", display: "flex", alignItems: "center", gap: ".3rem", marginBottom: ".9rem", fontStyle: "italic" }}>ℹ️ Price &amp; availability shown on Amazon</div>
        <div className="amz-shimmer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".55rem", background: "linear-gradient(135deg,#ffb703,#ff9900)", color: "#1a0a00", border: "none", padding: ".65rem 1rem", borderRadius: 50, fontSize: ".82rem", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", width: "100%", letterSpacing: ".02em", boxShadow: "0 6px 20px rgba(255,153,0,.3)", position: "relative", overflow: "hidden", transition: "all .3s" }}>
          🛒 View on Amazon
        </div>
      </div>
    </a>
  );
}

// ─── INSTAGRAM ────────────────────────────────────────────
function InstagramSection() {
  return (
    <section id="instagram" style={{ padding: "6rem 5%", background: "linear-gradient(135deg,#0d0018,#1a0a14,#2d0a2e)" }}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#fda4af", fontWeight: 500 }}>📸 Follow Our Journey</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "white", marginTop: ".4rem" }}>ZetsyBuy Instagram Gifts</h2>
        <p className="z-cormorant" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.6)", marginTop: ".5rem" }}>Real moments, real smiles. Follow us for daily gift inspo.</p>
      </div>
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: ".8rem", marginBottom: "2.5rem" }}>
        {INSTA_EMOJIS.map((emoji, i) => (
          <InstaItem key={i} emoji={emoji} likes={150 + i * 37} />
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", background: "linear-gradient(135deg,#f43f6a,#c9945c)", color: "white", border: "none", padding: ".85rem 2rem", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: ".95rem", fontWeight: 500, cursor: "pointer", textDecoration: "none", transition: "all .3s", boxShadow: "0 20px 60px rgba(244,63,106,.18)" }}>
          📸 Follow @ZetsyBuy on Instagram
        </a>
      </div>
    </section>
  );
}

function InstaItem({ emoji, likes }: { emoji: string; likes: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => window.open("https://www.instagram.com", "_blank")}
      style={{ aspectRatio: "1", borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer", transition: "all .4s", transform: hovered ? "scale(1.04)" : "scale(1)", zIndex: hovered ? 2 : 1 }}>
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#ffd6e0,#f8a9c8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", transition: "transform .4s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>{emoji}</div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,10,20,.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: ".3rem", opacity: hovered ? 1 : 0, transition: "opacity .3s", color: "white" }}>
        <span style={{ fontSize: "1.5rem" }}>❤️</span>
        <span style={{ fontSize: ".8rem" }}>{likes} likes</span>
      </div>
    </div>
  );
}

// ─── SOCIAL ───────────────────────────────────────────────
function SocialSection() {
  const socials = [
    { cls: "insta", icon: "📸", name: "Instagram", handle: "@ZetsyBuy", href: "https://www.instagram.com", bg: "linear-gradient(135deg,#fce7f3,#ede9fe)", border: "#f9a8d4", hoverBorder: "#ec4899", hoverShadow: "rgba(236,72,153,.2)", animCls: "social-bob-1" },
    { cls: "fb", icon: "👍", name: "Facebook", handle: "/ZetsyBuy", href: "https://www.facebook.com", bg: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "#93c5fd", hoverBorder: "#3b82f6", hoverShadow: "rgba(59,130,246,.2)", animCls: "social-bob-2" },
    { cls: "yt", icon: "▶️", name: "YouTube", handle: "ZetsyBuy Official", href: "https://www.youtube.com", bg: "linear-gradient(135deg,#fff7ed,#fee2e2)", border: "#fca5a5", hoverBorder: "#ef4444", hoverShadow: "rgba(239,68,68,.2)", animCls: "social-bob-3" },
    { cls: "wa", icon: "💬", name: "WhatsApp", handle: "Chat with Us", href: "https://wa.me/919999999999", bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "#86efac", hoverBorder: "#22c55e", hoverShadow: "rgba(34,197,94,.2)", animCls: "social-bob-4" },
  ];
  return (
    <section id="social" style={{ padding: "6rem 5%", background: "#fff8f3" }}>
      <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#f43f6a", fontWeight: 500 }}>💫 Stay Connected</span>
        <h2 className="z-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#1a0a14", marginTop: ".4rem" }}>Find Us On Social</h2>
      </div>
      <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.2rem" }}>
        {socials.map(s => <SocialCard key={s.name} {...s} />)}
      </div>
    </section>
  );
}

function SocialCard({ icon, name, handle, href, bg, border, hoverBorder, hoverShadow, animCls }: { icon: string; name: string; handle: string; href: string; bg: string; border: string; hoverBorder: string; hoverShadow: string; animCls: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 20, padding: "2rem 1.5rem", textAlign: "center", cursor: "pointer", transition: "all .4s cubic-bezier(.175,.885,.32,1.275)", border: `2px solid ${hovered ? hoverBorder : border}`, background: bg, textDecoration: "none", display: "block", transform: hovered ? "translateY(-8px) scale(1.03)" : "none", boxShadow: hovered ? `0 20px 40px ${hoverShadow}` : "none" }}>
      <div className={animCls} style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
      <div className="z-serif" style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a0a14" }}>{name}</div>
      <div style={{ fontSize: ".8rem", color: "#9a7080", marginTop: ".3rem" }}>{handle}</div>
    </a>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer id="footer" style={{ background: "linear-gradient(135deg,#1a0a14,#2d0a2e 30%,#1a0020 60%,#0d0018)", color: "white", padding: "5rem 8% 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 700, background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block", marginBottom: "1rem" }}>ZetsyBuy</span>
          <p style={{ fontSize: ".88rem", color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 260 }}>Beautiful gifts for every special moment. We craft unforgettable experiences with love, quality, and attention to every detail.</p>
          <div style={{ display: "flex", gap: ".8rem", marginTop: "1.5rem" }}>
            {[["📸", "https://www.instagram.com"], ["👍", "https://www.facebook.com"], ["▶️", "https://www.youtube.com"], ["💬", "https://wa.me/919999999999"]].map(([icon, href]) => (
              <a key={icon} href={href} target="_blank" rel="noopener noreferrer" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem", textDecoration: "none", color: "white", transition: "all .3s" }}>{icon}</a>
            ))}
          </div>
        </div>
        {[
          { title: "About Us", links: ["Our Story", "Why ZetsyBuy", "Testimonials", "Blog"] },
          { title: "Support", links: ["Shipping Info", "Returns Policy", "Track Order", "Contact Us"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="z-serif" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem" }}>{col.title}</h4>
            <ul style={{ listStyle: "none" }}>
              {col.links.map(link => (
                <li key={link} style={{ marginBottom: ".6rem" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,.5)", textDecoration: "none", fontSize: ".85rem", transition: "color .3s" }}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: ".8rem", color: "rgba(255,255,255,.4)" }}>
        <span>© 2024 ZetsyBuy. All rights reserved. Made with 💝</span>
        <span>Beautiful Gifts for Every Special Moment</span>
      </div>
    </footer>
  );
}

// ─── QUICK VIEW MODAL ─────────────────────────────────────
function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (product) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="modal-bg-anim" onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(10,0,20,.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div className="modal-anim" style={{ background: "white", borderRadius: 28, maxWidth: 800, width: "100%", maxHeight: "90vh", overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>
        <div style={{ background: "linear-gradient(135deg,#ffe4e1,#f3e0ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9rem", padding: "2rem", borderRadius: "28px 0 0 28px" }}>{product.emoji}</div>
        <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, background: "#f0e0f0", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}>✕</button>
          <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", color: "#9333ea", fontWeight: 500 }}>{product.category}</div>
          <h2 className="z-serif" style={{ fontSize: "1.6rem", fontWeight: 700, margin: ".5rem 0", color: "#1a0a14" }}>{product.title}</h2>
          <div style={{ color: "#f5a623", fontSize: ".9rem", marginBottom: "1rem" }}>{stars(product.rating)} ({product.rating})</div>
          <div className="z-serif" style={{ fontSize: "2rem", fontWeight: 700, background: "linear-gradient(135deg,#f43f6a,#c9945c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>{product.price}</div>
          <p style={{ fontSize: ".88rem", color: "#7a5060", lineHeight: 1.8, marginBottom: "1rem" }}>{product.description}</p>
          <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
            {product.features.map(f => <li key={f} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".85rem", color: "#5a3a4a", marginBottom: ".4rem" }}>✨ {f}</li>)}
          </ul>
          <div style={{ background: "linear-gradient(135deg,rgba(244,63,106,.05),rgba(147,51,234,.05))", padding: ".8rem 1rem", borderRadius: 12, fontSize: ".8rem", color: "#7a5060", marginBottom: "1.5rem", border: "1px solid rgba(244,63,106,.1)" }}>
            🚚 Free delivery within 3-5 business days · 📦 Premium gift packaging included · 💯 100% satisfaction guarantee
          </div>
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow"
            className="btn-shimmer"
            style={{ display: "flex", alignItems: "center", gap: ".7rem", background: "linear-gradient(135deg,#ffb703,#ff9900)", color: "#1a0a00", border: "none", padding: "1rem 2rem", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 30px rgba(255,153,0,.35)", transition: "all .3s", justifyContent: "center", position: "relative", overflow: "hidden", textDecoration: "none", letterSpacing: ".02em" }}>
            🛒 Shop on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────
export default function ZetsyBuyPage() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  // Hide loading
  const handleLoadDone = useCallback(() => setLoading(false), []);

  // Dark mode
  useEffect(() => {
    document.documentElement.style.background = dark ? "#0d0a14" : "#fff8f3";
  }, [dark]);

  // Custom cursor
  useEffect(() => {
    let fx = 0, fy = 0;
    const move = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
    };
    const iv = setInterval(() => {
      if (!followerRef.current) return;
      const cursor = cursorRef.current;
      if (!cursor) return;
      fx += (parseFloat(cursor.style.left || "0") - fx) * 0.15;
      fy += (parseFloat(cursor.style.top || "0") - fy) * 0.15;
      followerRef.current.style.left = fx + "px";
      followerRef.current.style.top = fy + "px";
    }, 16);
    document.addEventListener("mousemove", move);
    return () => { document.removeEventListener("mousemove", move); clearInterval(iv); };
  }, []);

  // Search filter
  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFilteredProducts(q ? PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : PRODUCTS);
  }, [search]);

  // Scroll reveal
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, filteredProducts]);

  // Category filter handler
  const handleCategoryFilter = useCallback((cat: string) => {
    const filtered = PRODUCTS.filter(p => p.category === cat);
    setFilteredProducts(filtered.length ? filtered : PRODUCTS);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* Loading */}
      {loading && <LoadingScreen onDone={handleLoadDone} />}

      {/* Custom cursor */}
      <div ref={cursorRef} className="zetsy-cursor" />
      <div ref={followerRef} className="zetsy-cursor-f" />

      {/* Navbar */}
      <Navbar dark={dark} setDark={setDark} search={search} setSearch={setSearch} />

      {/* Main content */}
      <main style={{ background: dark ? "#0d0a14" : "#fff8f3" }}>
        <Hero />
        <FeaturedGift />
        <TrendingSection products={filteredProducts} onQuickView={setModalProduct} />
        <CategoriesSection onFilter={handleCategoryFilter} />
        <AmazonSection />
        <InstagramSection />
        <SocialSection />
      </main>

      <Footer />

      {/* Sticky WhatsApp */}
      <a href="https://wa.me/919999999999?text=Hello%20ZetsyBuy!%20I%20want%20to%20explore%20your%20gifts%20%F0%9F%8E%81" target="_blank" rel="noopener noreferrer"
        className="sticky-wa-anim"
        style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 900, background: "linear-gradient(135deg,#25d366,#128c7e)", color: "white", border: "none", width: 58, height: 58, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", cursor: "pointer", textDecoration: "none", transition: "all .3s" }}>
        💬
      </a>

      {/* Quick View Modal */}
      <QuickViewModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </>
  );
}
