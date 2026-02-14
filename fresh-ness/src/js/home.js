import { data } from "../data/productData.js";

const totalFruits = [
    {
        id: '1',
        categories:'Vegetable',
        name: 'Vegetables',
        img: '/src/assets/total1.png'

    },
    {
        id: '2',
        name: 'Fresh Fruits',
        categories: 'Fruit',
        img: '/src/assets/total2.png'

    },
    {
        id: '3',
        name: 'Desserts',
        categories:'Dessert',
        img: '/src/assets/total3.png'

    },
    {
        id: '4',
        name: 'Drink & Juice',
        categories:'Drink',
        img: '/src/assets/total4.png'

    },
    {
        id: '5',
        name: 'Fish & Meats',
        categories:"Meat / Pet",
        img: '/src/assets/total5.png'

    },
    {
        id: '6',
        name: 'Pet & Animalsa',
        img: '/src/assets/total6.png'
    }
];


export async function home(){
    const datas = await data();
    console.log(datas);

    // mobileMenu
    const mobileMenu = document.getElementById('mobileMenu')
    mobileMenu.addEventListener('click', ()=>{
        const mobileNav = document.getElementById('mobileNav')
        mobileNav.classList.toggle('-translate-x-100')
        

    })



    // mavbar scroll hide show
    let lastScroll = window.scrollY;
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        let currentScroll = window.scrollY;
        const mobileNav = document.getElementById('mobileNav')
        if (currentScroll > lastScroll && window.scrollY > 150) {
            mobileNav.classList.add('-translate-y-200')
            header.classList.add('-translate-y-100');


        } else {
            header.classList.remove('-translate-y-100');
            mobileNav.classList.remove('-translate-y-200')
        }

        lastScroll = currentScroll;
    });


    const totalProducts = document.getElementById('totalProducts');

    // Start Get unique categories and all item names
    totalProducts.innerHTML = "";
    
    totalFruits.map((val, index) => {
        totalProducts.innerHTML += `
        <div data-totalPro =${index + 1} class="pl-1 hover:scale-102 transition-all cursor-pointer min-w-[180px] flex gap-2 items-center">
            <span class="inline-block size-10 border rounded-full p-1 bg-pink-200"><img class="w-[100%]" src="${val.img}" alt=""></span>
        <div>
        <h4 class="font-bold">${val.name}</h4>
        <h5 class="text-sm"><span class="categoriesTotal">${totalCategories(val.categories)}</span> Products</h5>

      </div>
    </div>
    `}).join()

    // function unique catergories total
    function totalCategories(val){
        let count = 0
        datas.filter(data => {
            if(data.name===val){
                count++
            }
        })
        return count
    }

    //  End Get unique categories and all item names

    // ====================== productsShowing Start ==========================    
    // product discount
    function discountProduct(price, discount){
        const discountPrice = (discount*price)/100
        const discounts = price-discountPrice
        return discounts

    }
    // Allproducts Show
    const allProductShow = document.getElementById('allProductsShow');  
    const allProBtn = document.getElementById('allProducts');
    const vegetableBtn = document.getElementById('vegetables');
    const freshFrutsBtn = document.getElementById('freshFruits');
    const dessertBtn = document.getElementById('desserts'); 
    const readMOreBtn = document.getElementById('readMoreCards');
    let visiblCount = 8
    
    function showingPro(filter = "all"){
        allProductShow.innerHTML = "";

        // filtering categories
        const categories = datas.filter(card => filter === 'all' || card.name === filter)
        
        // showing product if filtering
        categories.slice(0,visiblCount).forEach(card => {
            const proDiscount = discountProduct(card.price, card.discount)
        
            allProductShow.innerHTML += `
                <div data-cardIndex = ${card.id} class="relative col-span-1 hover:shadow-gray-200 gap-2 border rounded-2xl shadow-2xl p-2 h-[330px]">
                <span class="absolute z-4 p-1 rounded-lg bg-amber-500 text-white font-bold">${card.discount}%</span>
                <div class="absolute z-4 right-0 flex flex-col gap-5 text-2xl pr-1">
                    <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><i class="fa-regular fa-heart"></i></span>
                    <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><i class="fa-solid fa-rotate"></i></span>
                    <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><i class="fa-regular fa-eye"></i></span>
                </div>  
                <div class="h-[50%] text-center overflow-hidden"><img class="w-[100%] h-[100%] bg-pink-100 hover:scale-105 transition-all" src="${card.img}" alt=""></div>
                <div>
                    <span class="text-sm font-semibold text-gray-400">${card.name}</span>
                    <h2  class="text-xl font-bold mb-1">${card.title}</h2>
                    <div class="flex gap-1 mb-2">
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="text-yellow-300 fa-solid fa-star"></i></span>
                    <span><i class="fa-regular fa-star"></i></span>
                    <span>(2.4)</span>
                    </div>
                    <div class="font-bold">$${proDiscount} <del class="text-[13px]">$${card.price}</del></div>
                    <div class="flex justify-end text-2xl px-4 hover:scale-105 transition-transform"><i class="fa-solid fa-cart-shopping"></i></div>
                </div>
                </div>

        `}).join();

        readMOreBtn.style.display = visiblCount>= categories.length? "none":'block';

    }
    
    let productMenuIndex ="all"
    
    function setBtn(btn){
        [allProBtn, vegetableBtn, freshFrutsBtn, dessertBtn].forEach(b => 
            b.classList.remove('after:w-[70%]', 'text-green-400')
        )
        btn.classList.add('after:w-[70%]', 'text-green-400')
    }

    // productMenu Click
    allProBtn.addEventListener('click', ()=>{
        productMenuIndex ='all'
        setBtn(allProBtn)
        showingPro()
        
    })
    vegetableBtn.addEventListener('click', ()=>{
        productMenuIndex ='Vegetable'
        setBtn(vegetableBtn)
        showingPro('Vegetable')       

    })
    freshFrutsBtn.addEventListener('click', ()=>{
        productMenuIndex ='Fruit'
        setBtn(freshFrutsBtn)
        showingPro('Fruit')        

    })
    dessertBtn.addEventListener('click', ()=>{
        productMenuIndex ='Dessert'
        setBtn(dessertBtn);
        showingPro('Dessert');
        readMOreBtn.classList.add('hidden')

    })
    
    // readMore
    readMOreBtn.addEventListener('click', ()=> {
              
        visiblCount+=8          
        showingPro(productMenuIndex)
    })
    // renderProduct
    showingPro()
// ====================== productsShowing End ==========================



// ============================ Card Slider Start ===============================
// const slider = document.getElementById('slider')
// const cards = slider.children;
// let indexCard = 0

// function cardResponsive(){
//     if(window.innerWidth>=1024) return 3;
//     if(window.innerWidth>=768) return 2;
//     return 1

// }

// function nextSlider(){
//     const showCard = cardResponsive();
//     indexCard++;

//     if(indexCard>cards.length-showCard){
//         indexCard= 0
//     }
//     const translateX = -(indexCard * (100/showCard));
//     slider.style.transform = `translateX(${translateX}%)`

// }

// setInterval(nextSlider,3000)

// window.addEventListener('resize', ()=>{
//     const showCard = cardResponsive();
//     const translateX = -(indexCard*(100/showCard));
//     slider.style.transform = `translateX(${translateX}%)`
// })

const slider = document.getElementById('slider');
const cards = slider.children;
let indexCard = 0;

function cardResponsive() {
  if (window.innerWidth >= 1024) return 3; // lg
  if (window.innerWidth >= 768) return 2;  // md
  return 1;                                 // sm
}

function nextSlider() {
  const showCard = cardResponsive();
  indexCard++;

  if (indexCard > cards.length - showCard) {
    indexCard = 0;
  }

  const translateX = -(indexCard * (100 / showCard));
  slider.style.transform = `translateX(${translateX}%)`;
}

// Auto slide every 3s
setInterval(nextSlider, 3000);

// Update on window resize
window.addEventListener('resize', () => {
  const showCard = cardResponsive();
  const translateX = -(indexCard * (100 / showCard));
  slider.style.transform = `translateX(${translateX}%)`;
});

    








}

