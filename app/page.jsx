<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>ZetsyBuy</title>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<style>

body{
background:#fafafa;
font-family:sans-serif;
}

.card{
transition:.3s;
}

.card:hover{
transform:translateY(-6px);
box-shadow:0 15px 30px rgba(0,0,0,0.2);
}

.featured{
background:linear-gradient(120deg,#ff8ecb,#a78bfa);
color:white;
}

.amazon-card{
border-top:4px solid #f59e0b;
}

</style>

</head>

<body>

<!-- NAVBAR -->

<nav class="flex justify-between p-4 bg-white shadow">

<h1 class="text-2xl font-bold text-pink-600">
🎁 ZetsyBuy
</h1>

<input id="search"
placeholder="Search gifts..."
class="border px-3 py-1 rounded"/>

</nav>

<!-- FEATURED PRODUCT -->

<section class="p-10">

<div class="featured p-8 rounded-xl flex flex-col md:flex-row items-center">

<img src="https://picsum.photos/400"
class="rounded-xl w-80">

<div class="md:ml-10 mt-4 md:mt-0">

<h2 class="text-3xl font-bold">
ZetsyBuy Special Gift Box
</h2>

<p class="mt-2">
Exclusive gift hamper available only on ZetsyBuy
</p>

<button onclick="order()"
class="mt-4 bg-green-500 px-6 py-3 rounded text-white">
Order on WhatsApp
</button>

</div>

</div>

</section>

<!-- AMAZON PRODUCTS -->

<section class="p-10">

<h2 class="text-3xl font-bold mb-6">
Shop Gifts on Amazon
</h2>

<p class="text-gray-500 mb-6">
ZetsyBuy participates in the Amazon Affiliate Program.
Purchases through our links may earn us a small commission.
</p>

<div id="products"
class="grid grid-cols-1 md:grid-cols-4 gap-6"></div>

</section>

<!-- INSTAGRAM -->

<section class="p-10 bg-gray-100 text-center">

<h2 class="text-3xl font-bold mb-6">
Instagram Gifts
</h2>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4">

<img src="https://picsum.photos/200?1">
<img src="https://picsum.photos/200?2">
<img src="https://picsum.photos/200?3">
<img src="https://picsum.photos/200?4">

</div>

<a href="#" class="inline-block mt-6 bg-pink-500 text-white px-6 py-2 rounded">
Follow on Instagram
</a>

</section>

<!-- FOOTER -->

<footer class="text-center p-10 bg-gray-900 text-white">

<h2 class="text-xl font-bold">
ZetsyBuy
</h2>

<p class="mt-2">
Beautiful gifts for every special moment
</p>

</footer>

<script>

const amazonProducts=[]

for(let i=1;i<=100;i++){

amazonProducts.push({

title:"Amazon Gift "+i,
img:"https://picsum.photos/300?"+i,
link:"https://amazon.in"

})

}

function renderProducts(list){

let html=""

list.forEach(p=>{

html+=`

<div class="card amazon-card bg-white p-4 rounded-xl">

<span class="text-xs bg-yellow-500 text-white px-2 py-1 rounded">
Amazon
</span>

<img src="${p.img}" class="mt-2 rounded">

<h3 class="mt-2 font-semibold">
${p.title}
</h3>

<button onclick="window.open('${p.link}')"
class="mt-3 w-full bg-yellow-500 text-white p-2 rounded">
View on Amazon
</button>

</div>

`

})

document.getElementById("products").innerHTML=html

}

function order(){

let msg="Hello ZetsyBuy I want to order the Special Gift Box"

let url=`https://wa.me/7050864561?text=${encodeURIComponent(msg)}`

window.open(url)

}

document.getElementById("search").addEventListener("input",e=>{

let value=e.target.value.toLowerCase()

let filtered=amazonProducts.filter(p=>p.title.toLowerCase().includes(value))

renderProducts(filtered)

})

renderProducts(amazonProducts)

</script>

</body>
</html>