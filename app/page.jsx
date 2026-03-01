import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ZetsyBuyLanding() {
  const phone = "919999999999"; // apna WhatsApp number daalo
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", city: "" });
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Eid Gift Hamper", price: 399, desc: "Chocolate, tasbih & greeting card", img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800" },
    { id: 2, name: "Explosion Box", price: 599, desc: "Customized photos & messages", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800" },
    { id: 3, name: "Customized Mug", price: 299, desc: "Your photo printed on mug", img: "https://images.unsplash.com/photo-1585386959984-a4155223161a?q=80&w=800" }
  ];

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const submitOrder = () => {
    const msg = `Hi ZetsyBuy! I want to order: ${selected.name} (₹${selected.price})%0AName: ${form.name}%0AAddress: ${form.address}%0ACity: ${form.city}`;
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-pink-600">ZetsyBuy</h1>
        <input
          placeholder="Search gifts..."
          className="border rounded-xl px-4 py-2 w-60"
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* Hero */}
      <div className="text-center py-16">
        <h2 className="text-4xl font-bold mb-3">Handmade Gifts for Every Occasion 🎁</h2>
        <p className="text-gray-600">Eid • Birthday • Anniversary • Surprise</p>
      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto pb-16">
        {filtered.map(p => (
          <motion.div key={p.id} whileHover={{scale:1.05}}>
            <Card className="rounded-2xl overflow-hidden shadow-lg">
              <img src={p.img} className="h-56 w-full object-cover" />
              <CardContent className="text-center p-4 space-y-2">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
                <p className="text-lg font-bold text-pink-600">₹{p.price}</p>
                <Button className="w-full" onClick={()=>setSelected(p)}>Order on WhatsApp</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Order Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 space-y-3">
            <h2 className="text-xl font-semibold">Enter Delivery Details</h2>
            <input placeholder="Name" className="border p-2 w-full" onChange={e=>setForm({...form,name:e.target.value})}/>
            <input placeholder="Address" className="border p-2 w-full" onChange={e=>setForm({...form,address:e.target.value})}/>
            <input placeholder="City" className="border p-2 w-full" onChange={e=>setForm({...form,city:e.target.value})}/>
            <Button className="w-full" onClick={submitOrder}>Send to WhatsApp</Button>
            <Button variant="ghost" className="w-full" onClick={()=>setSelected(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-sm text-gray-500">© {new Date().getFullYear()} ZetsyBuy</footer>
    </div>
  );
}
