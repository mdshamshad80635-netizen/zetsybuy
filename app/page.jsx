import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ZetsyBuyLanding() {
  const phone = "919999999999";
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", city: "" });
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Eid Gift Hamper", price: 399, desc: "Chocolate, tasbih & greeting card included", img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=600" },
    { id: 2, name: "Explosion Box", price: 599, desc: "Customized photos & messages", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600" },
    { id: 3, name: "Customized Mug", price: 299, desc: "Your photo printed on mug", img: "https://images.unsplash.com/photo-1585386959984-a4155223161a?q=80&w=600" }
  ];

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const submitOrder = () => {
    const msg = `Hi ZetsyBuy! I want to order: ${selected.name} (₹${selected.price})%0AName: ${form.name}%0AAddress: ${form.address}%0ACity: ${form.city}`;
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">ZetsyBuy</h1>
          <input
            placeholder="Search gifts..."
            className="border rounded-xl px-3 py-2 w-56"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* HERO / AD BANNER */}
      <section className="grid md:grid-cols-2 items-center max-w-6xl mx-auto py-14 px-6 gap-10">
        <motion.div initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}}>
          <h2 className="text-4xl font-bold mb-4">Perfect Gifts for Every Occasion</h2>
          <p className="text-neutral-600 mb-6">Handmade & customized surprises delivered with love</p>
          <Button>Explore Gifts</Button>
        </motion.div>
        <motion.img
          initial={{opacity:0,x:40}}
          animate={{opacity:1,x:0}}
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"
          className="rounded-3xl shadow-xl"
        />
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((p) => (
          <motion.div key={p.id} whileHover={{scale:1.05}}>
            <Card className="rounded-2xl shadow-sm hover:shadow-xl transition">
              <img src={p.img} alt={p.name} className="rounded-t-2xl h-56 w-full object-cover" />
              <CardContent className="p-4 text-center">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-neutral-600 text-sm mt-1">{p.desc}</p>
                <p className="text-lg font-medium mt-2">₹{p.price}</p>
                <Button className="mt-3 w-full" onClick={()=>setSelected(p)}>Order</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* ORDER POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-3">
            <h2 className="text-2xl font-semibold">Enter delivery details</h2>
            <input placeholder="Name" className="border p-2 w-full" onChange={e=>setForm({...form,name:e.target.value})}/>
            <input placeholder="Address" className="border p-2 w-full" onChange={e=>setForm({...form,address:e.target.value})}/>
            <input placeholder="City" className="border p-2 w-full" onChange={e=>setForm({...form,city:e.target.value})}/>
            <Button className="w-full" onClick={submitOrder}>Send Order on WhatsApp</Button>
            <Button variant="ghost" className="w-full" onClick={()=>setSelected(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <footer className="text-center text-sm text-neutral-500 py-6">© {new Date().getFullYear()} ZetsyBuy</footer>
    </div>
  );
}
