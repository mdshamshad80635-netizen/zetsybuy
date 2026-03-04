"use client";
import { useState } from "react";

export default function Page() {

const whatsappNumber = "919999999999"; // अपना WhatsApp number डालें

const products = [
{
title:"Cute Teddy Gift",
img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
link:"https://www.amazon.in/"
},
{
title:"Romantic Couple Gift",
img:"https://images.unsplash.com/photo-1519682337058-a94d519337bc",
link:"https://www.amazon.in/"
},
{
title:"Luxury Birthday Gift Box",
img:"https://images.unsplash.com/photo-1607083206968-13611e3d76db",
link:"https://www.amazon.in/"
},
{
title:"Tech Gadget Gift",
img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
link:"https://www.amazon.in/"
}
];

const [search,setSearch]=useState("");

const filtered = products.filter(p =>
p.title.toLowerCase().includes(search.toLowerCase())
);

function orderWhatsapp(){
window.open(`https://wa.me/${whatsappNumber}?text=Hello I want to order your featured gift`);
}

return(

<div style={{fontFamily:"sans-serif"}}>

{/* HERO */}
<div style={{
background:"linear-gradient(135deg,#0f172a,#1e293b,#020617)",
color:"white",
padding:"60px",
textAlign:"center"
}}>
<h1 style={{fontSize:"40px"}}>ZetsyBuy 🎁</h1>
<p>Beautiful Gifts for Every Occasion</p>

<input
placeholder="Search gifts..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
marginTop:"20px",
padding:"10px",
width:"300px",
borderRadius:"8px",
border:"none"
}}
/>
</div>


{/* FEATURED PRODUCT */}
<div style={{
display:"flex",
justifyContent:"center",
marginTop:"40px"
}}>

<div style={{
background:"#0f172a",
color:"white",
padding:"20px",
borderRadius:"20px",
width:"600px",
display:"flex",
gap:"20px",
boxShadow:"0 20px 40px rgba(0,0,0,0.4)"
}}>

<img
src="https://images.unsplash.com/photo-1585386959984-a415522316f1"
style={{
width:"200px",
borderRadius:"15px"
}}
/>

<div>
<h2>Zetsy Premium Gift Box</h2>
<p>Luxury curated surprise gift box</p>
<h3 style={{color:"#22c55e"}}>₹1499</h3>

<button
onClick={orderWhatsapp}
style={{
background:"#22c55e",
padding:"12px 20px",
border:"none",
borderRadius:"10px",
color:"white",
cursor:"pointer",
marginTop:"10px"
}}
>
Order on WhatsApp
</button>

</div>

</div>
</div>


{/* AMAZON SECTION */}
<div style={{padding:"60px"}}>

<h2 style={{textAlign:"center"}}>Shop by Amazon</h2>

<p style={{
textAlign:"center",
color:"gray",
fontSize:"14px"
}}>
ZetsyBuy participates in the Amazon Affiliate Program.
We may earn commission from qualifying purchases.
</p>


<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginTop:"30px"
}}>

{filtered.map((p,i)=>(
<a
key={i}
href={p.link}
target="_blank"
style={{
textDecoration:"none",
color:"black"
}}
>

<div style={{
background:"white",
borderRadius:"15px",
overflow:"hidden",
boxShadow:"0 10px 20px rgba(0,0,0,0.2)",
transition:"0.3s"
}}>

<img
src={p.img}
style={{
width:"100%",
height:"200px",
objectFit:"cover"
}}
/>

<div style={{padding:"10px"}}>
<h3>{p.title}</h3>
<button style={{
background:"#f59e0b",
border:"none",
padding:"8px 12px",
borderRadius:"8px",
cursor:"pointer"
}}>
View on Amazon
</button>
</div>

</div>

</a>
))}

</div>

</div>


{/* FOOTER */}
<div style={{
background:"#020617",
color:"white",
padding:"30px",
textAlign:"center"
}}>

<p>© 2026 ZetsyBuy</p>
<p style={{fontSize:"12px",color:"gray"}}>
As an Amazon Associate we earn from qualifying purchases.
</p>

</div>

</div>

)
}
