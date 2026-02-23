import {CardsAllfilter, renderCards, Click } from "./renderProducts";
import { discountProduct } from "./renderProducts";


const cardDetails = document.getElementById('cardDetails')

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const cardsData = CardsAllfilter();
const selectedCard = cardsData.find(c => c.id == id);
const discount = discountProduct(selectedCard.price, selectedCard.discount)
let counting = 1

cardDetails.innerHTML = `
    <div id="" data-cardIndex = ${selectedCard.id} class="relative col-span-1 hover:shadow-gray-200 gap-10 border rounded-2xl shadow-2xl p-2 grid grid-cols-1 md:grid-cols-2">
            <div class="col-span-1">
                <span class="absolute z-4 p-1 rounded-lg bg-amber-500 text-white font-bold">${selectedCard.discount}%</span>
                <div class="w-[100%] h-[68vh] text-center overflow-hidden rounded-3xl"><img class="mainPicUp w-[100%] h-[100%] bg-pink-100 object-contain hover:scale-105 transition-all" src="${selectedCard.img}" alt=""></div>
                <div class="grid grid-cols-12 gap-2 mt-2">
                    <div class="h-50 col-span-4 overflow-hidden rounded-4xl border">
                        <img class="picUp object-contain w-[100%] h-[100%]" src="${selectedCard.img}" alt="">
                    </div>
                    <div class="h-50 col-span-4 overflow-hidden bg-pink-100 rounded-4xl">
                        <img class="picUp object-contain w-[100%] h-[100%]" src="${selectedCard.img2}" alt="">
                    </div>
                    <div class="h-50 col-span-4 overflow-hidden bg-pink-100 rounded-4xl">
                        <img class="picUp object-contain w-[100%] h-[100%]" src="${selectedCard.img3}" alt="">
                    </div>
                </div>
            </div>     
                <div class="col-span-1">
                    <span class="text-sm font-semibold text-gray-400 text-pink-500 capitalize mb-3 inline-block ">natural best ${selectedCard.categories}</span>
                    <h2  class="text-2xl font-bold mb-3">Fresh organic ${selectedCard.title}</h2>
                    <div class="flex gap-1 mb-5">
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="fa-regular fa-star"></i></span>
                    <span>(2.4)</span>
                    </div>
                    <div class="font-bold text-xl mb-7">$${discount} <del class="text-[13px]">$${selectedCard.price}</del></div>
                    <span class="inline-block mb-3 font-semibold text-gray-500">${selectedCard.details}</span>
                    <ul class="list-disc ml-5 w-100 grid grid-cols-2  font-semibold mb-10">
                        <li class="col-span-1 text-lg mb-4">Soil Grown</li>
                        <li class="col-span-1 text-lg">High Fiber</li>
                        <li class="col-span-1 text-lg">Eye Health</li>
                    </ul>
                    <div class="flex justify-between items-center">
                        <div class="flex gap-2 bg-gray-300 p-4 rounded-xl">
                            <span class="productDecrement size-6 flex justify-center items-center text-3xl font-bold cursor-pointer hover:text-green-500">-</span>
                            <span class="updateValue size-6 flex justify-center items-center text-2xl font-bold">${counting}</span>
                            <span class="productIncrement size-6 flex justify-center items-center text-3xl font-bold cursor-pointer hover:text-green-500">+</span>
                        </div>
                        <div class="cart flex justify-center items-center gap-5 rounded-2xl text-md lg:text-2xl hover:scale-105 bg-green-600 text-white md:px-13 px-8 py-3 font-bold cursor-pointer"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</div>
                        <div class="flex gap-5 text-3xl">
                            <span class="size-10 hover:text-green-500"><i class="fa-solid fa-heart"></i> </span>
                            <span class="size-10 hover:text-green-500"><i class="fa-solid fa-rotate"></i> </span>
                        </div>
                    </div>
                    
                </div>
        </div>`

// Click on this image to open it.
const picUp = document.querySelectorAll('.picUp');
const mainPicUp = document.querySelector('.mainPicUp');
picUp.forEach((img) => {
    img.addEventListener('click', () => {
        picUp.forEach((item)=>{
            item.parentElement.classList.remove('border', 'bg-white')
            picUp[0].parentElement.classList.add('bg-pink-100')
        })
        mainPicUp.src = img.src;
        img.parentElement.classList.add('border', 'bg-white')
    });
});

// updateValue
const productIncrement = document.querySelector('.productIncrement');
const productDecrement = document.querySelector('.productDecrement');
const updateValue = document.querySelector('.updateValue');
function updateCount(val){
    counting +=val
    if(counting<1) counting =1
    updateValue.textContent = counting
}
productIncrement.addEventListener('click', ()=> updateCount(1))
productDecrement.addEventListener('click', ()=> updateCount(-1))

// related card show
const relatedProducts = document.getElementById('relatedProducts');
const filteredProducts = cardsData.filter(card =>{
        return card.categories === selectedCard.categories &&
        card.id !== selectedCard.id
});
renderCards(filteredProducts, 4, relatedProducts)
Click()

export default counting