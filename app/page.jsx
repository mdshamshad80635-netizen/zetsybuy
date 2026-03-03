"use client";

import { useState } from "react";

export default function Home() {
  const phone = "919999999999"; // Apna WhatsApp number daalo
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const product = {
    name: "Zetsy Cable Organizer Pro",
    price: 199,
    original: 249,
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000",
    desc: "Compact waterproof cable organizer for charger, earphones & accessories.",
  };

  const orderNow = () => {
    const message = `Hello ZetsyBuy!%0A
Product: ${product.name}%0APrice: ₹${product.price}%0A
Name: ${form.name}%0APhone: ${form.phone}%0AAddress: ${form.address}%0ACity: ${form.city}%0APincode: ${form.pincode}`;

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div style={styles.container}>
      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.logo}>ZetsyBuy</h1>
        <p style={styles.tagline}>No More Messy Wires 🎒</p>
      </section>

      {/* Product Section */}
      <section style={styles.productSection}>
        <div style={styles.card}>
          <img src={product.img} alt="Cable Organizer" style={styles.image} />
          <h2>{product.name}</h2>
          <p style={styles.desc}>{product.desc}</p>
          <p>
            <span style={styles.price}>₹{product.price}</span>
            <span style={styles.original}>₹{product.original}</span>
          </p>
          <button style={styles.button} onClick={() => setShowForm(!showForm)}>
            Order Now
          </button>

          {showForm && (
            <div style={styles.formBox}>
              <input placeholder="Name" style={styles.input} onChange={(e)=>setForm({...form,name:e.target.value})} />
              <input placeholder="Phone" style={styles.input} onChange={(e)=>setForm({...form,phone:e.target.value})} />
              <input placeholder="Address" style={styles.input} onChange={(e)=>setForm({...form,address:e.target.value})} />
              <input placeholder="City" style={styles.input} onChange={(e)=>setForm({...form,city:e.target.value})} />
              <input placeholder="Pincode" style={styles.input} onChange={(e)=>setForm({...form,pincode:e.target.value})} />
              <button style={styles.whatsappBtn} onClick={orderNow}>
                Send Order on WhatsApp
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} ZetsyBuy | Handmade with Care
      </footer>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
  },
  logo: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  tagline: {
    color: "#cbd5e1",
  },
  productSection: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "20px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },
  image: {
    width: "100%",
    borderRadius: "15px",
  },
  desc: {
    fontSize: "14px",
    color: "#cbd5e1",
  },
  price: {
    color: "#f59e0b",
    fontSize: "22px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  original: {
    textDecoration: "line-through",
    color: "#888",
  },
  button: {
    background: "#f59e0b",
    border: "none",
    padding: "10px 20px",
    borderRadius: "30px",
    marginTop: "15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  formBox: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "6px 0",
    borderRadius: "8px",
    border: "none",
  },
  whatsappBtn: {
    background: "#25D366",
    border: "none",
    padding: "10px",
    borderRadius: "25px",
    width: "100%",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    marginTop: "40px",
    borderTop: "1px solid #1e293b",
  },
};
