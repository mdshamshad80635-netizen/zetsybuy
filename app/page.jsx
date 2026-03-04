"use client";

export default function Page() {

const whatsapp = "919999999999"; // अपना WhatsApp number डालें

const amazonProducts = [
{
title:"Cute Teddy Gift",
img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
link:"https://www.amazon.in/"
},
{
title:"Romantic Gift Box",
img:"https://images.unsplash.com/photo-1519682337058-a94d519337bc",
link:"https://www.amazon.in/"
},
{
title:"Birthday Surprise Box",
img:"https://images.unsplash.com/photo-1607083206968-13611e3d76db",
link:"https://www.amazon.in/"
}
];

return (

<div style={{fontFamily:"sans-serif",padding:"40px"}}>

<h1>ZetsyBuy 🎁</h1>
<p>Unique Gifts Store</p>

{/* Own Product */}

<div style={{
border:"2px solid #ff4d6d",
padding:"20px",
borderRadius:"12px",
marginBottom:"40px"
}}>

<h2>Featured Gift</h2>

<img
src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
width="200"
/>

<p>Special Surprise Gift Box</p>

<a
href={`https://wa.me/${whatsapp}?text=I want to order the gift`}
target="_blank"
>

<button
style={{
background:"#25D366",
color:"#fff",
padding:"10px 20px",
border:"none",
borderRadius:"6px"
}}
>
Order on WhatsApp
</button>

</a>

</div>

{/* Amazon Gifts */}

<h2>Shop Gifts on Amazon</h2>

<div style={{display:"flex",gap:"20px"}}>

{amazonProducts.map((p,i)=>(
<div
key={i}
style={{
border:"1px solid #ddd",
padding:"10px",
borderRadius:"10px"
}}
>

<img src={p.img} width="150"/>

<h4>{p.title}</h4>

<a href={p.link} target="_blank">

<button>View on Amazon</button>

</a>

</div>
))}

</div>

</div>

);

}