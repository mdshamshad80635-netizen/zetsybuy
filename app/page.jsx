"use client";
import { useState } from "react";

export default function Home() {
  const phone = "7050864561";

  const products = [
    {
      id: 1,
      name: "Explosion Box",
      price: 599,
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800"
    },
    {
      id: 2,
      name: "Customized Mug",
      price: 299,
      img: "https://images.unsplash.com/photo-1585386959984-a4155223161a?q=80&w=800"
    },
    {
      id: 3,
      name: "Gift Hamper",
      price: 399,
      img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800"
    }
  ];

  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    area: "",
    city: "",
    pincode: ""
  });

  const order = () => {
    const msg =
      `Hi ZetsyBuy! I want to order: ${selected.name} (₹${selected.price})%0A` +
      `Name: ${form.name}%0APhone: ${form.phone}%0AStreet: ${form.street}%0AArea: ${form.area}%0ACity: ${form.city}%0APincode: ${form.pincode}`;

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f8f9fa", minHeight: "100vh", padding: 20 }}>
      <h1 style={{ textAlign: "center", fontSize: 36 }}>ZetsyBuy</h1>
      <p style={{ textAlign: "center", marginBottom: 40 }}>Handmade Gifts 🎁</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#fff", borderRadius: 10, padding: 15, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
            <img src={p.img} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />
            <h3>{p.name}</h3>
            <p style={{ fontWeight: "bold" }}>₹{p.price}</p>
            <button onClick={() => setSelected(p)} style={{ padding: 10, background: "#25D366", color: "#fff", border: "none", borderRadius: 6 }}>
              Order on WhatsApp
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ marginTop: 40, background: "#fff", padding: 20, borderRadius: 10 }}>
          <h2>Enter Delivery Details</h2>
          {["name","phone","street","area","city","pincode"].map((field)=>(
            <input
              key={field}
              placeholder={field}
              style={{ display:"block", margin:"10px 0", padding:8, width:"100%" }}
              onChange={(e)=>setForm({...form,[field]:e.target.value})}
            />
          ))}
          <button onClick={order} style={{ padding:10, background:"#000", color:"#fff", border:"none", borderRadius:6 }}>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
