"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Explosion Box",
    price: 599,
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: 2,
    name: "Customized Mug",
    price: 299,
    img: "https://images.unsplash.com/photo-1589987607627-1f5c8d3d1d4b",
  },
  {
    id: 3,
    name: "Gift Hamper",
    price: 399,
    img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
  },
];

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.logo}>ZetsyBuy</h1>
        <p style={styles.tagline}>Premium Handmade Creations 🎁</p>
        <button style={styles.heroBtn}>Explore Collection</button>
      </div>

      {/* Products */}
      <div style={styles.grid}>
        {products.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            style={styles.card}
          >
            <img src={item.img} alt={item.name} style={styles.image} />
            <h3 style={styles.productName}>{item.name}</h3>
            <p style={styles.price}>₹{item.price}</p>
            <button style={styles.button}>Order on WhatsApp</button>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <div style={styles.about}>
        <h2>Why Choose ZetsyBuy?</h2>
        <p>✔ Handmade with love</p>
        <p>✔ Premium Quality Materials</p>
        <p>✔ Fast Shipping Across India</p>
        <p>✔ Direct WhatsApp Support</p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2026 ZetsyBuy | All Rights Reserved</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    color: "#fff",
    minHeight: "100vh",
    paddingBottom: "50px",
    fontFamily: "sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },
  logo: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  tagline: {
    color: "#cbd5e1",
    margin: "10px 0",
  },
  heroBtn: {
    background: "#f59e0b",
    border: "none",
    padding: "12px 25px",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    padding: "40px 20px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    borderRadius: "15px",
  },
  productName: {
    marginTop: "15px",
  },
  price: {
    color: "#f59e0b",
    fontWeight: "bold",
    margin: "10px 0",
  },
  button: {
    background: "#f59e0b",
    border: "none",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  about: {
    textAlign: "center",
    padding: "50px 20px",
    background: "#111827",
  },
  footer: {
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    borderTop: "1px solid #1e293b",
  },
};