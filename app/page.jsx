"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "7050864561";

const PRODUCTS = [
  { id: 1, title: "Luxury Rose & Love Memory Box", description: "A timeless keepsake filled with handpicked preserved roses, personalized notes, premium chocolates, and a glowing LED heart frame.", price: "₹2,499", originalPrice: "₹3,999", category: "Romantic Gifts", emoji: "🌹", rating: 4.9, badge: "BESTSELLER", affiliateLink: "https://www.amazon.in/s?k=preserved+rose+memory+box&tag=zetsy-21", features: ["12 Preserved Roses", "LED Heart Frame", "Personalized Message Card", "Premium Velvet Box"], featured: true, inStock: true },
  { id: 2, title: "Birthday Surprise Hamper", description: "A delightful hamper with artisan chocolates, scented soy candle, leather journal, and handwritten note.", price: "₹1,299", originalPrice: "₹1,800", category: "Birthday Gifts", emoji: "🎂", rating: 4.8, badge: "NEW", affiliateLink: "https://www.amazon.in/s?k=birthday+hamper+gift+set&tag=zetsy-21", features: ["Artisan Chocolates", "Soy Wax Candle", "Gratitude Journal", "Silk Ribbon Wrap"], featured: false, inStock: true },
  { id: 3, title: "Couple Memory Jar", description: "A beautiful glass jar filled with 52 handwritten love notes and surprise date ideas. One for every week of the year.", price: "₹799", originalPrice: "₹1,200", category: "Couple Gifts", emoji: "💕", rating: 4.7, badge: null, affiliateLink: "https://www.amazon.in/s?k=couple+memory+jar&tag=zetsy-21", features: ["52 Love Notes", "Printed Date Ideas", "Decorated Mason Jar", "Custom Name Labels"], featured: false, inStock: true },
  { id: 4, title: "Anniversary Starmap Print", description: "Custom star map showing the exact night sky from your special date. Framed, high-quality print.", price: "₹2,199", originalPrice: "₹2,999", category: "Anniversary Gifts", emoji: "⭐", rating: 4.9, badge: "POPULAR", affiliateLink: "https://www.amazon.in/s?k=custom+star+map+anniversary&tag=zetsy-21", features: ["Custom Date & Location", "A3 Framed Print", "High-quality Paper", "Free Message Engraving"], featured: false, inStock: true },
  { id: 5, title: "Luxury Spa Gift Set", description: "Pamper her with rose bath salts, aromatherapy oils, silk face mask and exfoliating mitt.", price: "₹1,499", originalPrice: "₹2,200", category: "Romantic Gifts", emoji: "🌸", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=luxury+spa+gift+set&tag=zetsy-21", features: ["Rose Bath Salts", "3 Essential Oils", "Silk Eye Mask", "Exfoliating Mitt"], featured: false, inStock: false },
  { id: 6, title: "Personalised Photo Locket", description: "A sterling silver locket with space for two photos. Engraved with your message.", price: "₹1,799", originalPrice: "₹2,400", category: "Customized Gifts", emoji: "📿", rating: 4.9, badge: "TRENDING", affiliateLink: "https://www.amazon.in/s?k=personalised+photo+locket+silver&tag=zetsy-21", features: ["925 Sterling Silver", "2 Photo Slots", "Custom Engraving", "Gift Pouch Included"], featured: false, inStock: true },
  { id: 7, title: "Diwali Luxury Gift Hamper", description: "Premium festive hamper with dry fruits, artisan sweets, scented diyas, and a brass showpiece.", price: "₹3,499", originalPrice: "₹4,999", category: "Festival Gifts", emoji: "🪔", rating: 4.9, badge: "FESTIVAL", affiliateLink: "https://www.amazon.in/s?k=diwali+luxury+hamper&tag=zetsy-21", features: ["Premium Dry Fruits", "Artisan Mithai", "Scented Diyas", "Brass Showpiece"], featured: true, inStock: true },
  { id: 8, title: "Mystery Surprise Box", description: "A curated surprise box with 5–7 premium gifts worth ₹5000+. You never know what magic awaits!", price: "₹2,999", originalPrice: "₹5,000", category: "Surprise Boxes", emoji: "📦", rating: 4.7, badge: "MYSTERY", affiliateLink: "https://www.amazon.in/s?k=mystery+surprise+gift+box&tag=zetsy-21", features: ["5–7 Surprise Items", "₹5000+ Worth", "Premium Packaging", "Express Delivery"], featured: false, inStock: true },
  { id: 9, title: "Handmade Chocolate Tower", description: "A stunning 3-tier tower of 24 handcrafted Belgian chocolates in luxury packaging.", price: "₹1,699", originalPrice: "₹2,200", category: "Birthday Gifts", emoji: "🍫", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=chocolate+tower+gift+box&tag=zetsy-21", features: ["24 Belgian Chocolates", "3-Tier Box", "12 Flavour Varieties", "Custom Ribbon"], featured: false, inStock: true },
  { id: 10, title: "Couple Caricature Portrait", description: "A hand-drawn digital caricature of you and your partner, printed and framed.", price: "₹2,499", originalPrice: "₹3,000", category: "Couple Gifts", emoji: "🎨", rating: 4.9, badge: "CUSTOM", affiliateLink: "https://www.amazon.in/s?k=couple+caricature+portrait&tag=zetsy-21", features: ["Hand-drawn Digital Art", "A4 Framed Print", "3–4 Day Delivery", "Unlimited Revisions"], featured: false, inStock: true },
  { id: 11, title: "Silver Bangle Charm Set", description: "Rose gold plated charm bangles with heart, infinity, and moon charms.", price: "₹1,099", originalPrice: "₹1,500", category: "Romantic Gifts", emoji: "💍", rating: 4.8, badge: null, affiliateLink: "https://www.amazon.in/s?k=silver+bangle+charm+set&tag=zetsy-21", features: ["Set of 3 Bangles", "Anti-tarnish Coating", "Gift Box Included", "Adjustable Size"], featured: false, inStock: true },
  { id: 12, title: "Scented Candle Trio", description: "Three luxury soy wax candles in Rose, Jasmine, and Sandalwood fragrances.", price: "₹899", originalPrice: "₹1,200", category: "Romantic Gifts", emoji: "🕯️", rating: 4.7, badge: null, affiliateLink: "https://www.amazon.in/s?k=scented+candle+gift+set&tag=zetsy-21", features: ["3 × 200g Candles", "Natural Soy Wax", "Cotton Wick", "Ceramic Vessels"], featured: false, inStock: true },
];

const AMAZON_PRODUCTS = [
  { id: "amz1", title: "Birthday Explosion Box", description: "Pop-up memory gift box with photo slots, ribbons, and message cards.", emoji: "🎂", category: "Birthday Gifts", rating: 4.6, reviews: 3241, affiliateLink: "https://www.amazon.in/s?k=birthday+explosion+box&tag=zetsy-21", badge: "Amazon Deal" },
  { id: "amz2", title: "LED Rose Lamp Night Light", description: "Eternal rose inside an LED glass dome. Glows in 7 colours.", emoji: "🌹", category: "Couple Gifts", rating: 4.5, reviews: 5876, affiliateLink: "https://www.amazon.in/s?k=led+rose+lamp+gift&tag=zetsy-21", badge: "Best Seller" },
  { id: "amz3", title: "Wireless Earbuds Gift Set", description: "Premium TWS earbuds with charging case in elegant gift box.", emoji: "🎧", category: "Tech Gifts", rating: 4.4, reviews: 8921, affiliateLink: "https://www.amazon.in/s?k=wireless+earbuds+gift&tag=zetsy-21", badge: "Top Pick" },
  { id: "amz4", title: "Succulent Terrarium Kit", description: "Mini glass terrarium with three succulent plants, pebbles, and soil.", emoji: "🪴", category: "Home Decor Gifts", rating: 4.7, reviews: 2134, affiliateLink: "https://www.amazon.in/s?k=succulent+terrarium+kit&tag=zetsy-21", badge: "Trending" },
  { id: "amz5", title: "Diwali Kaju Katli Box", description: "500g of authentic kaju katli in a royal brass-finish gift box.", emoji: "🪔", category: "Festival Gifts", rating: 4.8, reviews: 4412, affiliateLink: "https://www.amazon.in/s?k=kaju+katli+gift+box&tag=zetsy-21", badge: "Festival Special" },
  { id: "amz6", title: "Couple Zodiac Mug Set", description: "Two ceramic mugs with zodiac signs. Microwave safe.", emoji: "☕", category: "Couple Gifts", rating: 4.3, reviews: 1897, affiliateLink: "https://www.amazon.in/s?k=couple+zodiac+mug+set&tag=zetsy-21", badge: "Amazon Deal" },
  { id: "amz7", title: "Smart LED Desk Lamp", description: "USB touch-dim desk lamp with wireless charging pad.", emoji: "💡", category: "Tech Gifts", rating: 4.5, reviews: 7634, affiliateLink: "https://www.amazon.in/s?k=smart+led+desk+lamp+wireless&tag=zetsy-21", badge: "Top Pick" },
  { id: "amz8", title: "Birthday Scrapbook Kit", description: "Memory-filled scrapbook with stickers, decorative tape, and envelopes.", emoji: "📔", category: "Birthday Gifts", rating: 4.5, reviews: 2867, affiliateLink: "https://www.amazon.in/s?k=birthday+scrapbook+diy+kit&tag=zetsy-21", badge: "Best Seller" },
];

const CATEGORIES = [
  { name: "Birthday Gifts", icon: "🎂", gradient: "linear-gradient(135deg,#ffd6e0,#ffb3c6)" },
  { name: "Couple Gifts", icon: "💑", gradient: "linear-gradient(135deg,#ffd6e7,#f8a9d8)" },
  { name: "Anniversary Gifts", icon: "💒", gradient: "linear-gradient(135deg,#e0c3fc,#d4a5f5)" },
  { name: "Romantic Gifts", icon: "❤️", gradient: "linear-gradient(135deg,#ffd6e0,#ffa3b5)" },
  { name: "Customized Gifts", icon: "✏️", gradient: "linear-gradient(135deg,#ffd700,#ffc400)" },
  { name: "Festival Gifts", icon: "🪔", gradient: "linear-gradient(135deg,#c3e8fc,#a0d0f0)" },
  { name: "Surprise Boxes", icon: "🎁", gradient: "linear-gradient(135deg,#d4f5c0,#b5eaa0)" },
];

const AMZ_CATEGORIES = ["All Gifts", "Birthday Gifts", "Couple Gifts", "Tech Gifts", "Home Decor Gifts", "Festival Gifts"];
const AMZ_ICONS = { "All Gifts": "🎁", "Birthday Gifts": "🎂", "Couple Gifts": "💑", "Tech Gifts": "📱", "Home Decor Gifts": "🏠", "Festival Gifts": "🪔" };
const AMZ_CAT_BG = { "Birthday Gifts": "linear-gradient(135deg,#fff3cd,#ffe082)", "Couple Gifts": "linear-gradient(135deg,#fce4ec,#f8bbd0)", "Tech Gifts": "linear-gradient(135deg,#e8f5e9,#c8e6c9)", "Home Decor Gifts": "linear-gradient(135deg,#e3f2fd,#bbdefb)", "Festival Gifts": "linear-gradient(135deg,#fff8e1,#ffecb3)" };
const HERO_EMOJIS = ["🎁","💝","🌹","💕","⭐","🎀","🎊","💖","🌸","✨","💍","🕯️","🍫","🎂"];
const INSTA_EMOJIS = ["🌹💝","🎁✨","💕🎀","⭐🌸","🍫💖","💍✨","🪔🎊","📦🎁"];

// ─── HELPERS ────────────────────────────────────────────────────────────
function stars(r) { return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : ""); }
function buildWA(name, price) {
  const msg = `Hello ZetsyBuy,%0AI want to order this gift.%0A%0AProduct Name: ${encodeURIComponent(name)}%0APrice: ${encodeURIComponent(price)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;overflow-x:hidden;cursor:none;background:#fff8f3}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#f0e6f0}::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#9333ea,#f43f6a);border-radius:3px}
.cur{position:fixed;width:12px;height:12px;background:#f43f6a;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s;mix-blend-mode:multiply}
.cur-f{position:fixed;width:36px;height:36px;border:2px solid #c9945c;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:all .15s ease;opacity:.6}
@media(pointer:coarse){.cur,.cur-f{display:none}body{cursor:auto}*{cursor:auto}}
@keyframes floatUp{0%{transform:translateY(110vh) rotate(0deg);opacity:0}10%{opacity:.15}90%{opacity:.15}100%{transform:translateY(-10vh) rotate(360deg);opacity:0}}
@keyframes giftBob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-20px) rotate(3deg)}}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes waPulse{0%,100%{box-shadow:0 8px 25px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.4)}50%{box-shadow:0 8px 25px rgba(37,211,102,.5),0 0 0 15px rgba(37,211,102,0)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes loadBar{from{width:0}to{width:100%}}
@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}
@keyframes amzPulse{0%,100%{box-shadow:0 4px 12px rgba(255,153,0,.4)}50%{box-shadow:0 4px 20px rgba(255,153,0,.7)}}
.serif{font-family:'Playfair Display',serif}
.cormorant{font-family:'Cormorant Garamond',serif}
.text-rose{background:linear-gradient(135deg,#f43f6a,#c9945c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.text-gold{background:linear-gradient(135deg,#c9945c,#f5d0b0,#c9945c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gift-bob{animation:giftBob 3s ease-in-out infinite}
.float-item{position:absolute;opacity:.15;animation:floatUp linear infinite;pointer-events:none;user-select:none}
.reveal{opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s}
.reveal.visible{opacity:1;transform:translateY(0)}
.btn-shimmer{position:relative;overflow:hidden}
.btn-shimmer::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.25),transparent);transform:translateX(-100%);animation:shimmer 2s infinite}
.wa-sticky{animation:waPulse 2.5s infinite}
.modal-bg{animation:fadeIn .3s}
.modal-box{animation:slideUp .4s cubic-bezier(.175,.885,.32,1.275)}
.hero-anim-1{animation:fadeInUp .8s .2s both}
.hero-anim-2{animation:fadeInUp .8s .4s both}
.hero-anim-3{animation:fadeInUp .8s .6s both}
.hero-anim-4{animation:fadeInUp .8s .8s both}
.hero-anim-5{animation:fadeInUp .8s 1s both}
.load-bar{animation:loadBar 2s ease-out forwards}
.amz-pulse{animation:amzPulse 3s ease-in-out infinite}
.product-card{transition:transform .4s cubic-bezier(.175,.885,.32,1.275),box-shadow .4s,border-color .4s}
.product-card:hover{transform:translateY(-10px) scale(1.02);box-shadow:0 20px 60px rgba(244,63,106,.18)}
.cat-card{transition:all .4s cubic-bezier(.175,.885,.32,1.275)}
.cat-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 60px rgba(244,63,106,.18)}
.amz-card{transition:all .4s cubic-bezier(.175,.885,.32,1.275)}
.amz-card:hover{transform:translateY(-10px) scale(1.02)}
.social-card{transition:all .4s cubic-bezier(.175,.885,.32,1.275)}
.social-card:hover{transform:translateY(-8px) scale(1.03)}
.confetti-piece{position:fixed;pointer-events:none;z-index:9000;animation:confettiFall linear forwards}
`;

// ─── LOADING SCREEN ───────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const colors = ["#f43f6a","#c9945c","#9333ea","#22c55e","#f5d0b0","#fda4af"];
    for (let i = 0; i < 60; i++) {
      const p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.cssText = `left:${Math.random()*100}vw;top:-10px;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?"50%":"2px"};animation-duration:${2+Math.random()*3}s;animation-delay:${1.8+Math.random()*.4}s;`;
      el.appendChild(p);
    }
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div ref={ref} style={{ position:"fixed",inset:0,zIndex:9999,background:"linear-gradient(135deg,#1a0a14,#2d0a2e,#1a0020,#0d0018)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.5rem" }}>
      <div className="serif" style={{ fontSize:"2.5rem",fontWeight:700,background:"linear-gradient(135deg,#f43f6a,#c9945c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>ZetsyBuy ✨</div>
      <div style={{ width:192,height:4,background:"rgba(255,255,255,.1)",borderRadius:2,overflow:"hidden" }}>
        <div className="load-bar" style={{ height:"100%",background:"linear-gradient(135deg,#f43f6a,#c9945c)",borderRadius:2 }} />
      </div>
      <div style={{ fontSize:"1.5rem",animation:"loadBar 2s linear infinite" }}>🎁</div>
      <p style={{ color:"rgba(255,255,255,.4)",fontSize:".85rem",letterSpacing:".15em",textTransform:"uppercase" }}>Loading gifts...</p>
    </div>
  );
}

// ─── CURSOR ──────────────────────────────────────────────────────────
function Cursor() {
  const cRef = useRef(null);
  const fRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    let fx = 0, fy = 0;
    const onMove = (e) => {
      if (cRef.current) { cRef.current.style.left = e.clientX + "px"; cRef.current.style.top = e.clientY + "px"; }
    };
    const iv = setInterval(() => {
      if (!cRef.current || !fRef.current) return;
      fx += (parseFloat(cRef.current.style.left||"0") - fx) * .15;
      fy += (parseFloat(cRef.current.style.top||"0") - fy) * .15;
      fRef.current.style.left = fx + "px"; fRef.current.style.top = fy + "px";
    }, 16);
    document.addEventListener("mousemove", onMove);
    return () => { clearInterval(iv); document.removeEventListener("mousemove", onMove); };
  }, []);
  return (<><div ref={cRef} className="cur" style={{ left:"-100px",top:"-100px" }}/><div ref={fRef} className="cur-f" style={{ left:"-100px",top:"-100px" }}/></>);
}

// ─── NAVBAR ───────────────────────────────────────────────────────────
function Navbar({ dark, setDark, search, setSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const navBg = scrolled ? (dark ? "rgba(13,10,20,.95)" : "rgba(255,248,243,.92)") : "transparent";
  const lc = scrolled ? (dark ? "white" : "#1a0a14") : "white";
  const links = [["Home","#hero"],["Shop","#trending"],["Categories","#categories"],["Amazon Gifts","#amazon-gifts"],["Instagram","#instagram"],["Contact","#footer"]];
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 5%",height:70,display:"flex",alignItems:"center",justifyContent:"space-between",background:navBg,backdropFilter:scrolled?"blur(20px)":"none",boxShadow:scrolled?"0 4px 30px rgba(244,63,106,.1)":"none",transition:"all .4s" }}>
      <a href="#hero" className="serif" style={{ fontSize:"1.6rem",fontWeight:700,background:"linear-gradient(135deg,#f43f6a,#c9945c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textDecoration:"none" }}>ZetsyBuy</a>
      <ul style={{ display:"flex",gap:"1.8rem",listStyle:"none",alignItems:"center" }} className="hide-mobile">
        {links.map(([label,href]) => (
          <li key={label}><a href={href} style={{ color:lc,fontSize:".88rem",fontWeight:500,textDecoration:"none",transition:"color .3s" }}>{label}</a></li>
        ))}
      </ul>
      <div style={{ display:"flex",alignItems:"center",gap:"1rem" }}>
        <div className="hide-mobile" style={{ background:scrolled?"rgba(244,63,106,.08)":"rgba(255,255,255,.12)",border:`1px solid ${scrolled?"rgba(244,63,106,.2)":"rgba(255,255,255,.25)"}`,borderRadius:50,padding:".4rem 1rem",display:"flex",alignItems:"center",gap:".4rem" }}>
          <span>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search gifts..." style={{ background:"none",border:"none",outline:"none",fontFamily:"'DM Sans',sans-serif",fontSize:".82rem",color:lc,width:130 }} />
        </div>
        <button onClick={()=>setDark(!dark)} style={{ width:38,height:38,borderRadius:"50%",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",cursor:"pointer",fontSize:"1rem" }}>{dark?"☀️":"🌙"}</button>
        <button onClick={()=>setMobileOpen(!mobileOpen)} className="show-mobile" style={{ background:"none",border:"none",cursor:"pointer",fontSize:"1.5rem",color:lc }}>☰</button>
      </div>
      {mobileOpen && (
        <div style={{ position:"absolute",top:70,left:0,right:0,background:dark?"rgba(13,10,20,.97)":"rgba(255,248,243,.97)",backdropFilter:"blur(20px)",padding:"1.5rem 5%",display:"flex",flexDirection:"column",gap:"1rem",borderBottom:"1px solid rgba(244,63,106,.1)" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search gifts..." style={{ width:"100%",padding:".5rem 1rem",borderRadius:50,border:"1px solid rgba(244,63,106,.2)",background:dark?"rgba(255,255,255,.08)":"white",color:dark?"white":"#1a0a14",fontFamily:"'DM Sans',sans-serif",outline:"none" }} />
          {links.map(([label,href]) => (
            <a key={label} href={href} onClick={()=>setMobileOpen(false)} style={{ color:dark?"rgba(255,255,255,.8)":"#1a0a14",fontWeight:500,textDecoration:"none" }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────
function Hero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const create = () => {
      const el = document.createElement("div");
      el.className = "float-item";
      el.textContent = HERO_EMOJIS[Math.floor(Math.random()*HERO_EMOJIS.length)];
      el.style.cssText = `left:${Math.random()*100}%;font-size:${1.5+Math.random()*2}rem;animation-duration:${8+Math.random()*12}s;animation-delay:-${Math.random()*10}s;`;
      canvas.appendChild(el);
      setTimeout(()=>{ try{canvas.removeChild(el)}catch(_){} },22000);
    };
    for(let i=0;i<25;i++) create();
    const iv = setInterval(create, 1200);
    return ()=>clearInterval(iv);
  }, []);
  return (
    <section id="hero" style={{ minHeight:"100vh",background:"linear-gradient(135deg,#1a0a14,#2d0a2e 30%,#1a0020 60%,#0d0018)",position:"relative",overflow:"hidden",display:"flex",alignItems:"center" }}>
      <div ref={canvasRef} style={{ position:"absolute",inset:0,overflow:"hidden" }} />
      <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 20% 50%,rgba(244,63,106,.12),transparent)" }} />
      <div style={{ position:"relative",zIndex:10,padding:"0 8%",maxWidth:900 }}>
        <div className="hero-anim-1" style={{ display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(244,63,106,.15)",border:"1px solid rgba(244,63,106,.3)",padding:".4rem 1rem",borderRadius:50,fontSize:".8rem",color:"#fda4af",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1.5rem" }}>🎁 Premium Gift Boutique • 2024</div>
        <h1 className="serif hero-anim-2" style={{ fontSize:"clamp(2.8rem,7vw,6rem)",fontWeight:700,color:"white",lineHeight:1.05,marginBottom:"1.5rem" }}>
          Find the <span className="text-rose" style={{ fontStyle:"italic" }}>Perfect Gift</span><br/>for Every Occasion
        </h1>
        <p className="cormorant hero-anim-3" style={{ fontSize:"1.3rem",color:"rgba(255,255,255,.65)",lineHeight:1.7,maxWidth:520,marginBottom:"2.5rem" }}>Unique gifts for birthdays, couples, anniversaries and surprises. Crafted with love, delivered with joy.</p>
        <div className="hero-anim-4" style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
          <a href="#trending" style={{ background:"linear-gradient(135deg,#f43f6a,#c9945c)",color:"white",padding:".85rem 2rem",borderRadius:50,fontFamily:"'DM Sans',sans-serif",fontSize:".95rem",fontWeight:500,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:".5rem",boxShadow:"0 20px 60px rgba(244,63,106,.18)" }}>🎁 Shop Gifts</a>
          <a href="#categories" style={{ background:"transparent",color:"white",border:"1px solid rgba(255,255,255,.3)",padding:".85rem 2rem",borderRadius:50,fontFamily:"'DM Sans',sans-serif",fontSize:".95rem",fontWeight:500,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:".5rem",backdropFilter:"blur(10px)" }}>✨ Explore Collections</a>
        </div>
      </div>
      <div className="hero-anim-5 hide-mobile" style={{ position:"absolute",bottom:"8%",right:"8%",display:"flex",gap:"2rem" }}>
        {[["5K+","Happy Customers"],["200+","Gift Options"],["4.9★","Rating"]].map(([num,label])=>(
          <div key={label} style={{ textAlign:"center" }}>
            <div className="serif text-gold" style={{ fontSize:"2rem",fontWeight:700 }}>{num}</div>
            <div style={{ fontSize:".75rem",color:"rgba(255,255,255,.5)",letterSpacing:".08em",textTransform:"uppercase" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ORDER FORM MODAL ─────────────────────────────────────────────────
function OrderFormModal({ product, onClose }) {
  const [form, setForm] = useState({ name:"", phone:"", address:"", pincode:"", qty:"1", note:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const fn = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!product) return null;

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return;
    const msg =
      `Hello ZetsyBuy! 🎁 I want to place an order.%0A%0A` +
      `📦 *Product:* ${encodeURIComponent(product.title)}%0A` +
      `💰 *Price:* ${encodeURIComponent(product.price)}%0A` +
      `🔢 *Quantity:* ${form.qty}%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(form.name)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `🏠 *Address:* ${encodeURIComponent(form.address)}%0A` +
      `📮 *Pincode:* ${encodeURIComponent(form.pincode)}%0A` +
      (form.note ? `📝 *Note:* ${encodeURIComponent(form.note)}` : ``);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 1800);
  };

  const inp = { width:"100%", border:"1.5px solid #ede0f5", borderRadius:10, padding:".55rem .85rem", fontFamily:"'DM Sans',sans-serif", fontSize:".85rem", color:"#1a0a14", outline:"none", background:"white", boxSizing:"border-box" };
  const label = { display:"block", fontSize:".68rem", fontWeight:700, color:"#9333ea", letterSpacing:".08em", textTransform:"uppercase", marginBottom:".3rem" };
  const group = { marginBottom:".85rem" };
  const valid = form.name.trim() && form.phone.trim() && form.address.trim();

  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:"fixed",inset:0,zIndex:2100,background:"rgba(10,0,20,.8)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem",animation:"fadeIn .3s" }}>
      <div style={{ background:"white",borderRadius:24,width:"100%",maxWidth:460,maxHeight:"92vh",overflowY:"auto",animation:"slideUp .35s cubic-bezier(.175,.885,.32,1.275)" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#1a0a14,#2d0a2e)",padding:"1.4rem 1.6rem 1.2rem",borderRadius:"24px 24px 0 0",position:"relative" }}>
          <button onClick={onClose} style={{ position:"absolute",top:14,right:14,width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,.15)",border:"none",color:"white",cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
          <div style={{ display:"flex",alignItems:"center",gap:"1rem" }}>
            <span style={{ fontSize:"2.8rem" }}>{product.emoji}</span>
            <div>
              <div style={{ fontSize:".68rem",color:"#fda4af",textTransform:"uppercase",letterSpacing:".1em",marginBottom:".2rem" }}>📱 Order via WhatsApp</div>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:"white",lineHeight:1.3 }}>{product.title}</div>
              <div style={{ fontSize:".85rem",color:"#25d366",fontWeight:700,marginTop:".25rem" }}>{product.price}</div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div style={{ padding:"2.5rem",textAlign:"center" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>✅</div>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:700,color:"#1a0a14",marginBottom:".5rem" }}>Opening WhatsApp...</div>
            <div style={{ fontSize:".85rem",color:"#7a5060" }}>Your order details have been prepared. Complete it on WhatsApp!</div>
          </div>
        ) : (
          <div style={{ padding:"1.4rem 1.6rem 1.6rem" }}>
            <p style={{ fontSize:".78rem",color:"#9a7090",marginBottom:"1.2rem",lineHeight:1.6 }}>Fill your details below — we will confirm your order on WhatsApp after review. 🎁</p>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 .8rem" }}>
              <div style={group}>
                <label style={label}>Full Name *</label>
                <input style={inp} placeholder="Aapka naam" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} onFocus={e=>e.target.style.borderColor="#c084fc"} onBlur={e=>e.target.style.borderColor="#ede0f5"} />
              </div>
              <div style={group}>
                <label style={label}>Phone Number *</label>
                <input style={inp} placeholder="10-digit number" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} onFocus={e=>e.target.style.borderColor="#c084fc"} onBlur={e=>e.target.style.borderColor="#ede0f5"} />
              </div>
            </div>

            <div style={group}>
              <label style={label}>Delivery Address *</label>
              <textarea style={{...inp,resize:"none",minHeight:68}} placeholder="Ghar ka pura address" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))} onFocus={e=>e.target.style.borderColor="#c084fc"} onBlur={e=>e.target.style.borderColor="#ede0f5"} />
            </div>

            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 .8rem" }}>
              <div style={group}>
                <label style={label}>Pincode</label>
                <input style={inp} placeholder="e.g. 110001" value={form.pincode} onChange={e=>setForm(f=>({...f,pincode:e.target.value}))} onFocus={e=>e.target.style.borderColor="#c084fc"} onBlur={e=>e.target.style.borderColor="#ede0f5"} />
              </div>
              <div style={group}>
                <label style={label}>Quantity</label>
                <select style={{...inp,cursor:"pointer"}} value={form.qty} onChange={e=>setForm(f=>({...f,qty:e.target.value}))}>
                  {["1","2","3","4","5"].map(n=><option key={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div style={group}>
              <label style={label}>Special Note (optional)</label>
              <input style={inp} placeholder="Koi special message ya customization?" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} onFocus={e=>e.target.style.borderColor="#c084fc"} onBlur={e=>e.target.style.borderColor="#ede0f5"} />
            </div>

            <button onClick={handleSubmit} disabled={!valid}
              style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:".6rem",background:valid?"linear-gradient(135deg,#25d366,#128c7e)":"#e2d8f0",color:valid?"white":"#b8a0c8",border:"none",padding:".85rem 1rem",borderRadius:12,fontFamily:"'DM Sans',sans-serif",fontSize:".95rem",fontWeight:700,cursor:valid?"pointer":"not-allowed",boxShadow:valid?"0 8px 24px rgba(37,211,102,.4)":"none",transition:"all .25s",letterSpacing:".02em",marginTop:".3rem" }}>
              📱 Send Order on WhatsApp
            </button>

            <p style={{ fontSize:".68rem",color:"#b8a0c8",textAlign:"center",marginTop:".75rem",lineHeight:1.5 }}>
              Clicking will open WhatsApp with your order details. Owner will confirm the order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FEATURED GIFT ────────────────────────────────────────────────────
function FeaturedGift() {
  const p = PRODUCTS.find(x=>x.featured) || PRODUCTS[0];
  const [orderOpen, setOrderOpen] = useState(false);
  const [hov, setHov] = useState(false);

  return (
    <section id="featured" style={{ padding:"4rem 5%",background:"linear-gradient(135deg,#1a0a14,#2d0a2e 50%,#0d0018)" }}>
      <div className="reveal" style={{ marginBottom:"2rem" }}>
        <span style={{ fontSize:".72rem",letterSpacing:".2em",textTransform:"uppercase",color:"#fda4af",fontWeight:500 }}>✨ Editor&apos;s Pick</span>
        <h2 className="serif" style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:700,color:"white",marginTop:".3rem" }}>🎁 ZetsyBuy Special Gift</h2>
      </div>

      {/* Card — same size style as Amazon/product cards */}
      <div className="reveal" style={{ maxWidth:320 }}>
        <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
          style={{ background:"rgba(255,255,255,.07)",border:`1.5px solid ${hov?"rgba(244,63,106,.5)":"rgba(255,255,255,.15)"}`,borderRadius:22,overflow:"hidden",display:"flex",flexDirection:"column",transition:"all .35s",transform:hov?"translateY(-8px)":"none",boxShadow:hov?"0 20px 50px rgba(244,63,106,.25)":"0 4px 20px rgba(0,0,0,.2)" }}>

          {/* Emoji image area */}
          <div style={{ height:180,background:"linear-gradient(135deg,rgba(244,63,106,.25),rgba(147,51,234,.25))",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
            <span className="gift-bob" style={{ fontSize:"5.5rem",filter:"drop-shadow(0 10px 20px rgba(244,63,106,.4))" }}>{p.emoji}</span>
            {p.badge && (
              <div style={{ position:"absolute",top:12,left:12,background:"linear-gradient(135deg,#f43f6a,#c9945c)",color:"white",padding:".22rem .7rem",borderRadius:50,fontSize:".68rem",fontWeight:700 }}>
                ✨ {p.badge}
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ padding:"1rem 1.2rem 1.3rem",display:"flex",flexDirection:"column" }}>
            <div style={{ fontSize:".62rem",textTransform:"uppercase",letterSpacing:".12em",color:"#fda4af",fontWeight:700,marginBottom:".2rem" }}>🌸 Signature Collection</div>
            <div className="serif" style={{ fontSize:"1rem",fontWeight:700,color:"white",lineHeight:1.3,marginBottom:".35rem" }}>{p.title}</div>
            <div style={{ fontSize:".75rem",color:"rgba(255,255,255,.55)",lineHeight:1.55,marginBottom:".7rem" }}>{p.description.substring(0,70)}...</div>

            {/* Price row */}
            <div style={{ display:"flex",alignItems:"baseline",gap:".6rem",marginBottom:"1rem" }}>
              <span className="serif text-gold" style={{ fontSize:"1.3rem",fontWeight:700 }}>{p.price}</span>
              {p.originalPrice && <span style={{ fontSize:".75rem",textDecoration:"line-through",color:"rgba(255,255,255,.3)" }}>{p.originalPrice}</span>}
            </div>

            {/* WhatsApp Order button — at bottom of card */}
            <button className="btn-shimmer" onClick={()=>setOrderOpen(true)}
              style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:".55rem",background:"linear-gradient(135deg,#25d366,#1da851,#128c7e)",color:"white",border:"none",padding:".72rem 1rem",borderRadius:12,fontFamily:"'DM Sans',sans-serif",fontSize:".88rem",fontWeight:700,cursor:"pointer",width:"100%",boxShadow:"0 8px 20px rgba(37,211,102,.4)",transition:"all .25s",position:"relative",overflow:"hidden",letterSpacing:".02em" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(37,211,102,.55)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 8px 20px rgba(37,211,102,.4)"; }}>
              📱 Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <OrderFormModal product={orderOpen ? p : null} onClose={()=>setOrderOpen(false)} />
    </section>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────
function ProductCard({ p, onQuickView }) {
  const [wl, setWl] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div className="product-card reveal" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"white",borderRadius:18,overflow:"hidden",border:`1.5px solid ${hov?"rgba(244,63,106,.25)":"rgba(244,63,106,.07)"}`,cursor:"default",position:"relative",display:"flex",flexDirection:"column",boxShadow:hov?"0 14px 36px rgba(244,63,106,.13)":"0 2px 12px rgba(0,0,0,.04)" }}>

      {/* ── Image area ── */}
      <div onClick={()=>onQuickView(p)}
        style={{ height:155,background:"linear-gradient(135deg,#ffe4e1,#f3e0ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",position:"relative",overflow:"hidden",transition:"transform .4s",transform:hov?"scale(1.04)":"scale(1)",cursor:"pointer" }}>
        <span style={{ transition:"transform .4s",transform:hov?"scale(1.2) rotate(6deg)":"scale(1)" }}>{p.emoji}</span>
        {p.badge && (
          <div style={{ position:"absolute",top:10,left:10,background:"linear-gradient(135deg,#f43f6a,#c9945c)",color:"white",padding:".18rem .6rem",borderRadius:50,fontSize:".62rem",fontWeight:700 }}>
            {p.badge}
          </div>
        )}
        <button onClick={e=>{e.stopPropagation();setWl(!wl)}}
          style={{ position:"absolute",top:10,right:10,width:28,height:28,background:wl?"#f43f6a":"rgba(255,255,255,.9)",border:"none",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",cursor:"pointer",transition:"all .3s",opacity:hov?1:0,transform:hov?"scale(1)":"scale(.7)" }}>
          {wl?"❤️":"🤍"}
        </button>
        {hov && (
          <div onClick={()=>onQuickView(p)}
            style={{ position:"absolute",bottom:0,left:0,right:0,background:"rgba(26,10,20,.8)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",gap:".3rem",padding:".45rem",fontSize:".72rem",fontWeight:500 }}>
            👁 Quick View
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding:".85rem 1rem 1rem",display:"flex",flexDirection:"column",flex:1 }}>
        <div style={{ fontSize:".6rem",textTransform:"uppercase",letterSpacing:".1em",color:"#9333ea",fontWeight:700,marginBottom:".2rem" }}>{p.category}</div>
        <div className="serif" style={{ fontSize:".92rem",fontWeight:700,color:"#1a0a14",lineHeight:1.3,marginBottom:".3rem" }}>{p.title}</div>
        <div style={{ fontSize:".72rem",color:"#9a7080",lineHeight:1.5,flex:1,marginBottom:".55rem" }}>{p.description.substring(0,65)}...</div>

        {/* Price + Rating */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:".75rem" }}>
          <div className="serif text-rose" style={{ fontSize:"1.08rem",fontWeight:700 }}>{p.price}</div>
          <div style={{ fontSize:".7rem",color:"#f5a623",fontWeight:600 }}>{stars(p.rating)} <span style={{ color:"#c4aac0",fontSize:".65rem" }}>{p.rating}</span></div>
        </div>

        {/* ── Only Amazon button ── */}
        <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer nofollow"
          className="btn-shimmer"
          style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:".45rem",background:"linear-gradient(135deg,#ffb703,#ff9900,#ff6600)",color:"#1a0a00",border:"none",padding:".58rem .9rem",borderRadius:12,fontSize:".78rem",fontWeight:700,cursor:"pointer",width:"100%",boxShadow:"0 5px 14px rgba(255,153,0,.32)",transition:"all .25s",textDecoration:"none",position:"relative",overflow:"hidden",letterSpacing:".02em" }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 9px 22px rgba(255,153,0,.48)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 5px 14px rgba(255,153,0,.32)"; }}
        >
          🛒 Shop on Amazon
        </a>

        {!p.inStock && (
          <div style={{ textAlign:"center",fontSize:".68rem",color:"#f43f6a",fontWeight:600,marginTop:".35rem" }}>⚠️ Out of Stock</div>
        )}
      </div>
    </div>
  );
}

// ─── TRENDING SECTION ──────────────────────────────────────────────────
function TrendingSection({ products, onQuickView }) {
  return (
    <section id="trending" style={{ padding:"5rem 5%",background:"#fff8f3" }}>
      <div className="reveal" style={{ marginBottom:"3rem" }}>
        <span style={{ fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#f43f6a",fontWeight:500 }}>🔥 Most Loved</span>
        <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#1a0a14",marginTop:".4rem" }}>Trending Gifts</h2>
        <p className="cormorant" style={{ fontSize:"1.15rem",color:"#7a5060",marginTop:".5rem" }}>Discover what everyone is gifting right now.</p>
      </div>
      {products.length===0 ? (
        <div style={{ textAlign:"center",padding:"4rem",color:"#b8a0c8" }}>
          <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>🔍</div>
          <p>No gifts found. Try a different search!</p>
        </div>
      ) : (
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1.8rem" }}>
          {products.map(p=><ProductCard key={p.id} p={p} onQuickView={onQuickView}/>)}
        </div>
      )}
    </section>
  );
}

// ─── CATEGORIES ────────────────────────────────────────────────────────
function CategoriesSection({ onFilter }) {
  return (
    <section id="categories" style={{ padding:"5rem 5%",background:"linear-gradient(135deg,#fff8f3,#fdf0f8)" }}>
      <div className="reveal" style={{ marginBottom:"3rem" }}>
        <span style={{ fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#f43f6a",fontWeight:500 }}>🎀 Browse By Occasion</span>
        <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#1a0a14",marginTop:".4rem" }}>Gift Collections</h2>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1.2rem" }}>
        {CATEGORIES.map(cat=>(
          <div key={cat.name} className="cat-card reveal" onClick={()=>{onFilter(cat.name);document.getElementById("trending")?.scrollIntoView({behavior:"smooth"})}}
            style={{ borderRadius:20,overflow:"hidden",position:"relative",height:180,cursor:"pointer",border:"1px solid rgba(244,63,106,.1)" }}>
            <div style={{ position:"absolute",inset:0,background:cat.gradient,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem" }}>{cat.icon}</div>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,10,20,.8),transparent 60%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1.2rem" }}>
              <div className="serif" style={{ fontSize:"1rem",fontWeight:600,color:"white" }}>{cat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── AMAZON SECTION ────────────────────────────────────────────────────
function AmazonSection() {
  const [tab, setTab] = useState("All Gifts");
  const filtered = tab==="All Gifts" ? AMAZON_PRODUCTS : AMAZON_PRODUCTS.filter(p=>p.category===tab);
  return (
    <section id="amazon-gifts" style={{ padding:"5rem 5%",background:"linear-gradient(160deg,#fff8f0,#fff3e8 40%,#fef9f0)" }}>
      <div className="reveal" style={{ marginBottom:"2.5rem" }}>
        <span style={{ fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#ff9900",fontWeight:500 }}>🛒 Affiliate Partner</span>
        <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#1a0a14",marginTop:".4rem" }}>Shop Gifts on Amazon</h2>
      </div>
      <div className="reveal" style={{ background:"#fff3cd",border:"1px solid rgba(255,153,0,.3)",borderLeft:"4px solid #ff9900",borderRadius:14,padding:"1rem 1.4rem",marginBottom:"2rem",display:"flex",alignItems:"flex-start",gap:"1rem",fontSize:".83rem",color:"#7a5020",lineHeight:1.6 }}>
        <span style={{ fontSize:"1.3rem" }}>ℹ️</span>
        <div><strong style={{ color:"#b36a00",display:"block",marginBottom:".2rem" }}>Affiliate Disclosure</strong>ZetsyBuy participates in the Amazon Affiliate Program. As an Amazon Associate, ZetsyBuy earns from qualifying purchases at no extra cost to you.</div>
      </div>
      <div className="reveal" style={{ display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"2rem" }}>
        {AMZ_CATEGORIES.map(cat=>(
          <button key={cat} onClick={()=>setTab(cat)} style={{ padding:".45rem 1.1rem",borderRadius:50,border:tab===cat?"none":"1.5px solid rgba(255,153,0,.3)",background:tab===cat?"linear-gradient(135deg,#ff9900,#ff6600)":"white",color:tab===cat?"white":"#b36a00",fontSize:".8rem",fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all .25s",boxShadow:tab===cat?"0 6px 20px rgba(255,153,0,.35)":"none",transform:tab===cat?"translateY(-2px)":"none" }}>
            {AMZ_ICONS[cat]} {cat}
          </button>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"1.6rem" }}>
        {filtered.map(p=><AmazonCard key={p.id} p={p}/>)}
      </div>
      <div className="reveal" style={{ textAlign:"center",marginTop:"2rem",fontSize:".78rem",color:"#b8926a" }}>🔗 All buttons redirect to Amazon.in. ZetsyBuy does not process payments for these products.</div>
      <div className="reveal" style={{ marginTop:"3rem",background:"rgba(255,153,0,.08)",border:"1px solid rgba(255,153,0,.15)",borderRadius:20,padding:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem" }}>
        <div>
          <div className="serif" style={{ fontSize:"1.3rem",fontWeight:700,color:"#1a0a14",marginBottom:".4rem" }}>Best Gifts on Amazon 🎁</div>
          <p style={{ fontSize:".85rem",color:"#9a7060",maxWidth:380 }}>Explore hundreds of gift ideas for every occasion on Amazon with fast delivery.</p>
        </div>
        <a href="https://www.amazon.in/s?k=gifts&tag=zetsy-21" target="_blank" rel="noopener noreferrer nofollow" style={{ display:"inline-flex",alignItems:"center",gap:".6rem",background:"linear-gradient(135deg,#ff9900,#ff6600)",color:"white",border:"none",padding:".8rem 1.8rem",borderRadius:50,fontSize:".88rem",fontWeight:600,cursor:"pointer",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",boxShadow:"0 8px 25px rgba(255,153,0,.35)",whiteSpace:"nowrap" }}>
          🛒 Browse All on Amazon
        </a>
      </div>
    </section>
  );
}

function AmazonCard({ p }) {
  const [hov, setHov] = useState(false);
  const bg = AMZ_CAT_BG[p.category] || "linear-gradient(135deg,#fff3cd,#ffe082)";
  return (
    <a href={p.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="amz-card reveal"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"white",borderRadius:22,overflow:"hidden",border:`1px solid ${hov?"rgba(255,153,0,.35)":"rgba(255,153,0,.12)"}`,boxShadow:hov?"0 24px 60px rgba(255,153,0,.2)":"none",position:"relative",textDecoration:"none",display:"block" }}>
      <div className="amz-pulse" style={{ position:"absolute",top:12,left:12,zIndex:3,background:"linear-gradient(135deg,#ff9900,#ff6600)",color:"white",padding:".28rem .75rem",borderRadius:50,fontSize:".68rem",fontWeight:700 }}>🛒 {p.badge}</div>
      <div style={{ height:200,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"5.5rem",transition:"transform .4s",transform:hov?"scale(1.04)":"scale(1)" }}>
        <span style={{ transition:"transform .5s",transform:hov?"scale(1.2) rotate(8deg)":"scale(1)" }}>{p.emoji}</span>
      </div>
      <div style={{ padding:"1.1rem 1.3rem 1.4rem" }}>
        <div style={{ fontSize:".68rem",textTransform:"uppercase",letterSpacing:".12em",color:"#ff9900",fontWeight:600,marginBottom:".3rem" }}>{p.category}</div>
        <div className="serif" style={{ fontSize:"1rem",fontWeight:600,color:"#1a0a14",lineHeight:1.35,marginBottom:".4rem" }}>{p.title}</div>
        <div style={{ fontSize:".78rem",color:"#9a7060",lineHeight:1.65,marginBottom:".8rem" }}>{p.description}</div>
        <div style={{ fontSize:".82rem",color:"#ff9900",marginBottom:".7rem" }}>{stars(p.rating)} <span style={{ fontSize:".72rem",color:"#b8926a" }}>({p.reviews.toLocaleString()})</span></div>
        <div style={{ fontSize:".7rem",color:"#b8926a",fontStyle:"italic",marginBottom:".9rem" }}>ℹ️ Price &amp; availability on Amazon</div>
        <div className="btn-shimmer" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:".55rem",background:"linear-gradient(135deg,#ffb703,#ff9900)",color:"#1a0a00",borderRadius:50,padding:".65rem 1rem",fontSize:".82rem",fontWeight:700,boxShadow:"0 6px 20px rgba(255,153,0,.3)",position:"relative",overflow:"hidden" }}>
          🛒 View on Amazon
        </div>
      </div>
    </a>
  );
}

// ─── INSTAGRAM ─────────────────────────────────────────────────────────
function InstagramSection() {
  const bgs = ["linear-gradient(135deg,#ffd6e0,#f8a9c8)","linear-gradient(135deg,#e0c3fc,#c084fc)","linear-gradient(135deg,#fed7aa,#fb923c)","linear-gradient(135deg,#d1fae5,#6ee7b7)","linear-gradient(135deg,#fce7f3,#f9a8d4)","linear-gradient(135deg,#ede9fe,#a78bfa)","linear-gradient(135deg,#fef9c3,#fde047)","linear-gradient(135deg,#ffd6e0,#fb7185)"];
  return (
    <section id="instagram" style={{ padding:"5rem 5%",background:"linear-gradient(135deg,#1a0a14,#2d0a2e,#0d0018)" }}>
      <div className="reveal" style={{ textAlign:"center",marginBottom:"3rem" }}>
        <span style={{ fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#fda4af",fontWeight:500 }}>📸 Follow Our Journey</span>
        <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"white",marginTop:".4rem" }}>ZetsyBuy Instagram</h2>
        <p className="cormorant" style={{ fontSize:"1.15rem",color:"rgba(255,255,255,.6)",marginTop:".5rem" }}>Real moments, real smiles. Follow us for daily gift inspo.</p>
      </div>
      <div className="reveal" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:".8rem",marginBottom:"2.5rem" }}>
        {INSTA_EMOJIS.map((em,i)=>(
          <div key={i} onClick={()=>window.open("https://www.instagram.com","_blank")}
            style={{ aspectRatio:"1",borderRadius:16,overflow:"hidden",position:"relative",cursor:"pointer",background:bgs[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3.5rem",transition:"transform .3s" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            {em}
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center" }}>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",gap:".7rem",background:"linear-gradient(135deg,#f43f6a,#c9945c)",color:"white",padding:".85rem 2rem",borderRadius:50,fontFamily:"'DM Sans',sans-serif",fontWeight:500,textDecoration:"none",boxShadow:"0 20px 60px rgba(244,63,106,.18)" }}>
          📸 Follow @ZetsyBuy on Instagram
        </a>
      </div>
    </section>
  );
}

// ─── SOCIAL ─────────────────────────────────────────────────────────────
function SocialSection() {
  const socials = [
    { icon:"📸",name:"Instagram",handle:"@ZetsyBuy",href:"https://www.instagram.com",bg:"linear-gradient(135deg,#fce7f3,#ede9fe)",border:"#f9a8d4",hb:"#ec4899" },
    { icon:"👍",name:"Facebook",handle:"/ZetsyBuy",href:"https://www.facebook.com",bg:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"#93c5fd",hb:"#3b82f6" },
    { icon:"▶️",name:"YouTube",handle:"ZetsyBuy Official",href:"https://www.youtube.com",bg:"linear-gradient(135deg,#fff7ed,#fee2e2)",border:"#fca5a5",hb:"#ef4444" },
    { icon:"💬",name:"WhatsApp",handle:"Chat with Us",href:`https://wa.me/${WHATSAPP_NUMBER}`,bg:"linear-gradient(135deg,#f0fdf4,#dcfce7)",border:"#86efac",hb:"#22c55e" },
  ];
  return (
    <section id="social" style={{ padding:"5rem 5%",background:"#fff8f3" }}>
      <div className="reveal" style={{ textAlign:"center",marginBottom:"3rem" }}>
        <span style={{ fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#f43f6a",fontWeight:500 }}>💫 Stay Connected</span>
        <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#1a0a14",marginTop:".4rem" }}>Find Us On Social</h2>
      </div>
      <div className="reveal" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1.2rem" }}>
        {socials.map(s=>(
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social-card"
            style={{ borderRadius:20,padding:"2rem 1.5rem",textAlign:"center",textDecoration:"none",display:"block",background:s.bg,border:`2px solid ${s.border}`,transition:"all .4s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=s.hb;e.currentTarget.style.transform="translateY(-8px) scale(1.03)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=s.border;e.currentTarget.style.transform="none";}}>
            <div style={{ fontSize:"2.5rem",marginBottom:"1rem" }}>{s.icon}</div>
            <div className="serif" style={{ fontSize:"1.1rem",fontWeight:600,color:"#1a0a14" }}>{s.name}</div>
            <div style={{ fontSize:".8rem",color:"#9a7080",marginTop:".3rem" }}>{s.handle}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="footer" style={{ background:"linear-gradient(135deg,#1a0a14,#2d0a2e 30%,#0d0018)",color:"white",paddingTop:"5rem",paddingBottom:"2rem",padding:"5rem 8% 2rem" }}>
      <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"3rem",marginBottom:"3rem" }} className="footer-grid">
        <div>
          <span className="serif text-rose" style={{ fontSize:"1.8rem",fontWeight:700,display:"block",marginBottom:"1rem" }}>ZetsyBuy</span>
          <p style={{ fontSize:".88rem",color:"rgba(255,255,255,.55)",lineHeight:1.8,maxWidth:260 }}>Beautiful gifts for every special moment. Crafted with love, delivered with joy.</p>
        </div>
        {[["About Us",["Our Story","Why ZetsyBuy","Blog","Testimonials"]],["Support",["Shipping Info","Returns Policy","Track Order","Contact Us"]],["Legal",["Privacy Policy","Terms of Service","Cookie Policy","Disclaimer"]]].map(([title,links])=>(
          <div key={title}>
            <h4 className="serif" style={{ fontSize:"1rem",fontWeight:600,marginBottom:"1.2rem" }}>{title}</h4>
            <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:".6rem" }}>
              {links.map(l=><li key={l}><a href="#" style={{ color:"rgba(255,255,255,.5)",textDecoration:"none",fontSize:".85rem" }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:"1.5rem",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:".5rem",fontSize:".8rem",color:"rgba(255,255,255,.4)" }}>
        <span>© 2024 ZetsyBuy. All rights reserved. Made with 💝</span>
        <span>Beautiful Gifts for Every Special Moment</span>
      </div>
    </footer>
  );
}

// ─── QUICK VIEW MODAL ────────────────────────────────────────────────────
function QuickViewModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return ()=>{document.body.style.overflow=""};
  }, [product]);
  useEffect(() => {
    const fn = e => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  }, [onClose]);
  if (!product) return null;
  return (
    <div className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{ position:"fixed",inset:0,zIndex:2000,background:"rgba(10,0,20,.85)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem" }}>
      <div className="modal-box" style={{ background:"white",borderRadius:28,maxWidth:800,width:"100%",maxHeight:"90vh",overflowY:"auto",display:"grid",gridTemplateColumns:"1fr 1fr",position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute",top:16,right:16,width:36,height:36,background:"#f0e0f0",border:"none",borderRadius:"50%",cursor:"pointer",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center",zIndex:5,transition:"all .3s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#f43f6a";e.currentTarget.style.color="white";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#f0e0f0";e.currentTarget.style.color="inherit";}}>✕</button>
        <div style={{ background:"linear-gradient(135deg,#ffe4e1,#f3e0ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9rem",padding:"2rem",borderRadius:"28px 0 0 28px",minHeight:280 }}>{product.emoji}</div>
        <div style={{ padding:"2.5rem 2rem",display:"flex",flexDirection:"column" }}>
          <div style={{ fontSize:".75rem",textTransform:"uppercase",letterSpacing:".1em",color:"#9333ea",fontWeight:500 }}>{product.category}</div>
          <h2 className="serif" style={{ fontSize:"1.6rem",fontWeight:700,margin:".5rem 0",color:"#1a0a14" }}>{product.title}</h2>
          <div style={{ color:"#f5a623",fontSize:".9rem",marginBottom:"1rem" }}>{stars(product.rating)} ({product.rating})</div>
          <div className="serif text-rose" style={{ fontSize:"2rem",fontWeight:700,marginBottom:"1rem" }}>{product.price}</div>
          <p style={{ fontSize:".88rem",color:"#7a5060",lineHeight:1.8,marginBottom:"1rem" }}>{product.description}</p>
          <ul style={{ listStyle:"none",marginBottom:"1.5rem",display:"flex",flexDirection:"column",gap:".4rem" }}>
            {product.features.map(f=><li key={f} style={{ fontSize:".85rem",color:"#5a3a4a" }}>✨ {f}</li>)}
          </ul>
          <div style={{ background:"linear-gradient(135deg,rgba(244,63,106,.05),rgba(147,51,234,.05))",border:"1px solid rgba(244,63,106,.1)",borderRadius:12,padding:".8rem 1rem",fontSize:".8rem",color:"#7a5060",marginBottom:"1.5rem" }}>
            🚚 Free delivery within 3–5 days · 📦 Premium packaging · 💯 100% satisfaction
          </div>
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer nofollow" className="btn-shimmer"
            style={{ display:"flex",alignItems:"center",gap:".7rem",background:"linear-gradient(135deg,#ffb703,#ff9900)",color:"#1a0a00",border:"none",padding:"1rem 2rem",borderRadius:50,fontFamily:"'DM Sans',sans-serif",fontSize:"1rem",fontWeight:700,cursor:"pointer",boxShadow:"0 10px 30px rgba(255,153,0,.35)",justifyContent:"center",textDecoration:"none",position:"relative",overflow:"hidden" }}>
            🛒 Shop on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(null);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) setTimeout(()=>entry.target.classList.add("visible"), i*80);
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  }, [loading]);

  const handleDone = useCallback(() => setLoading(false), []);

  const filtered = PRODUCTS.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat = !catFilter || p.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <style>{`
        .hide-mobile{display:flex}.show-mobile{display:none}
        .footer-grid{grid-template-columns:2fr 1fr 1fr 1fr}
        @media(max-width:900px){.hide-mobile{display:none!important}.show-mobile{display:flex!important}}
        @media(max-width:700px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>

      {loading && <LoadingScreen onDone={handleDone} />}
      <Cursor />

      <Navbar dark={dark} setDark={setDark} search={search} setSearch={v=>{setSearch(v);setCatFilter(null)}} />

      <main>
        <Hero />
        <FeaturedGift />

        {catFilter && (
          <div style={{ padding:".75rem 5%",background:"#fff8f3",display:"flex",alignItems:"center",gap:".75rem" }}>
            <span style={{ fontSize:".85rem",color:"#7a5060" }}>Showing:</span>
            <div style={{ display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(244,63,106,.1)",border:"1px solid rgba(244,63,106,.2)",color:"#f43f6a",padding:".3rem .85rem",borderRadius:50,fontSize:".82rem",fontWeight:600 }}>
              {catFilter}
              <button onClick={()=>setCatFilter(null)} style={{ background:"none",border:"none",color:"#f43f6a",cursor:"pointer",fontWeight:700,fontSize:".9rem",lineHeight:1 }}>✕</button>
            </div>
          </div>
        )}

        <TrendingSection products={filtered} onQuickView={setModal} />
        <CategoriesSection onFilter={cat=>{setCatFilter(cat);setSearch("");}} />
        <AmazonSection />
        <InstagramSection />
        <SocialSection />
      </main>

      <Footer />



      <QuickViewModal product={modal} onClose={()=>setModal(null)} />
    </>
  );
}
