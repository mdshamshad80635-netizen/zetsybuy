"use client";
import { useState } from "react";

export default function Home() {
  const phone = "919999999999"; // apna whatsapp number daalna

  const products = [
    { name: "Explosion Box", price: 599 },
    { name: "Customized Mug", price: 299 },
    { name: "Gift Hamper", price: 399 }
  ];

  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const order = () => {
    const msg =
      `Hi ZetsyBuy! I want to order: ${selected.name} (₹${selected.price})%0A` +
      `Name: ${name}%0AAddress: ${address}%0ACity: ${city}`;
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>ZetsyBuy</h1>
      <h3>Handmade Gifts</h3>

      {products.map((p, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 15, margin: 10 }}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => setSelected(p)}>Order</button>
        </div>
      ))}

      {selected && (
        <div style={{ marginTop: 20 }}>
          <h2>Enter details</h2>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
          <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} /><br/>
          <input placeholder="City" onChange={(e) => setCity(e.target.value)} /><br/>
          <button onClick={order}>Send on WhatsApp</button>
        </div>
      )}
    </div>
  );
}
