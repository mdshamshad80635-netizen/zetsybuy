"use client";

import { useState } from "react";

export default function Home() {
  const phone = "919999999999"; // 🔴 Replace with your WhatsApp number

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const ownProduct = {
    name: "Zetsy Cable Organizer Pro",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200",
    desc: "Compact waterproof cable organizer for daily use.",
  };

  const sendToWhatsApp = () => {
    const message = `Hello ZetsyBuy!%0AProduct: ${ownProduct.name}%0AName: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0ACity: ${form.city}%0APincode: ${form.pincode}`;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div className="container">

      {/* ================= HEADER ================= */}
      <header className="header glass">
        <div className="logo">ZetsyBuy</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#amazon">Shop by Amazon</a>
          <a href="#policy">Policies</a>
        </nav>
      </header>

      {/* Search */}
      <div className="searchBar glass">
        <input type="text" placeholder="Search products..." />
      </div>

      {/* ================= OWN PRODUCT (BIG) ================= */}
      <section id="home" className="section">
        <div className="ownCard glass">
          <img src={ownProduct.image} />
          <div className="ownContent">
            <h2>{ownProduct.name}</h2>
            <p className="desc">{ownProduct.desc}</p>
            <p className="price">₹{ownProduct.price}</p>

            <div className="formBox">
              <input placeholder="Full Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
              <input placeholder="Phone Number" onChange={(e)=>setForm({...form,phone:e.target.value})} />
              <input placeholder="Full Address" onChange={(e)=>setForm({...form,address:e.target.value})} />
              <input placeholder="City" onChange={(e)=>setForm({...form,city:e.target.value})} />
              <input placeholder="Pincode" onChange={(e)=>setForm({...form,pincode:e.target.value})} />
              <button onClick={sendToWhatsApp} className="whatsappBtn">
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SHOP BY AMAZON ================= */}
      <section id="amazon" className="section">
        <h2 className="sectionTitle">Shop by Amazon</h2>

        <div className="amazonGrid">
          <div className="amazonCard glass">
            <img src="/allah-lamp.jpg" />
            <h4>Crystal LED Lamp</h4>
            {/* 🔴 Replace with your affiliate link */}
            <a
              href="https://amzn.in/d/00jhaVf7"
              target="_blank"
              rel="noopener noreferrer"
              className="amazonBtn"
            >
              View on Amazon
            </a>
          </div>

          <div className="amazonCard glass">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800" />
            <h4>Gift Decoration Lights</h4>
            <a
              href="https://amzn.in/YOUR-LINK-HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="amazonBtn"
            >
              View on Amazon
            </a>
          </div>
        </div>

        <p className="affiliateNote">
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
      </section>

      {/* ================= POLICIES ================= */}
      <section id="policy" className="section glass policyBox">
        <h3>Terms & Conditions</h3>
        <p>
          By placing an order, you agree to provide accurate information. Orders once confirmed via WhatsApp cannot be cancelled after dispatch.
        </p>

        <h3>Privacy Policy</h3>
        <p>
          We collect your name, phone number and address only for order processing and delivery purposes. We do not sell or share your personal data.
        </p>

        <h3>Refund & Return</h3>
        <p>
          Returns are accepted only for damaged products reported within 48 hours of delivery with proof.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ZetsyBuy. All Rights Reserved.</p>
        <p>Contact: your@email.com</p>
      </footer>

      <style jsx global>{`
        body { margin:0; font-family: 'Inter', sans-serif; }

        .container {
          min-height:100vh;
          background: linear-gradient(135deg,#0f172a,#1e293b);
          color:white;
        }

        .glass {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        .header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:15px 25px;
          position:sticky;
          top:0;
          z-index:100;
        }
        .header nav a {
          margin-left:20px;
          text-decoration:none;
          color:white;
          font-size:14px;
        }

        .searchBar {
          margin:20px auto;
          padding:15px;
          max-width:500px;
          border-radius:50px;
        }
        .searchBar input {
          width:100%;
          background:transparent;
          border:none;
          outline:none;
          color:white;
        }

        .section { padding:50px 20px; }
        .sectionTitle { text-align:center; margin-bottom:30px; }

        /* BIG OWN PRODUCT */
        .ownCard {
          max-width:900px;
          margin:auto;
          padding:30px;
          border-radius:30px;
          display:flex;
          gap:30px;
          flex-wrap:wrap;
        }
        .ownCard img {
          width:100%;
          max-width:400px;
          border-radius:20px;
        }
        .ownContent { flex:1; }
        .price { color:#f59e0b; font-size:24px; font-weight:600; }

        .formBox input {
          width:100%;
          margin:8px 0;
          padding:10px;
          border-radius:12px;
          border:none;
          background: rgba(255,255,255,0.08);
          color:white;
        }

        .whatsappBtn {
          width:100%;
          padding:12px;
          margin-top:10px;
          border-radius:30px;
          border:none;
          background: linear-gradient(90deg,#25D366,#16a34a);
          color:white;
          font-weight:600;
        }

        /* SMALL AMAZON CARDS */
        .amazonGrid {
          display:grid;
          grid-template-columns: repeat(2,1fr);
          gap:20px;
          max-width:800px;
          margin:auto;
        }

        .amazonCard {
          padding:12px;
          border-radius:18px;
          text-align:center;
          font-size:14px;
        }
        .amazonCard img {
          width:100%;
          height:160px;
          object-fit:cover;
          border-radius:14px;
        }

        .amazonBtn {
          display:inline-block;
          margin-top:8px;
          padding:6px 12px;
          border-radius:18px;
          background: linear-gradient(90deg,#f59e0b,#fbbf24);
          color:black;
          font-weight:600;
          text-decoration:none;
          font-size:13px;
        }

        .affiliateNote {
          margin-top:20px;
          font-size:12px;
          color:#94a3b8;
          text-align:center;
        }

        .policyBox {
          max-width:900px;
          margin:auto;
          padding:30px;
          border-radius:25px;
          font-size:14px;
        }

        .footer {
          text-align:center;
          padding:25px;
          border-top:1px solid rgba(255,255,255,0.1);
          font-size:13px;
        }
      `}</style>
    </div>
  );
}
