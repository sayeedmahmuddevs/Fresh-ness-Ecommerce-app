import { data } from "../data/productData.js";
// import { ProductsCard } from "./productCard.js";
import { scrolling } from "./Scrolling.js";
import { CardsAll } from "./renderProducts.js";
import { allClick } from "./renderProducts.js";

// fruitsNav
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


// question Item
const askQuestion = [
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    }
];



export async function allJs(){
    const datas = await data();
    console.log(datas);

    // page scrolling 
    scrolling()
    
    
    const totalProducts = document.getElementById('totalProducts');
    // Start Get unique categories and all item names
    if(totalProducts){
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

    }

    // function unique catergories total
    function totalCategories(val){
        return datas.filter(item => item.categories === val).length
    }
    //  End Get unique categories and all item names


    // ====================== productsShowing Start ==========================       
    CardsAll()
    allClick()
    // ====================== productsShowing End ==========================
    

const questionBox = document.getElementById("qstBox");
    questionBox.innerHTML = "";
    askQuestion.map((item, index)=>{
        questionBox.innerHTML += `
            <div data-askqst="${index+1}" class="p-5 rounded-xl border border-green-500 bg-white mb-4">
                <div class="qstItem flex justify-between items-center ">
                <h3 class="qst text-xl font-bold shadow-3xl">${item.question}</h3>
                <span class="qstCheckBox size-10 bg-gray-200 flex justify-center items-center rounded-full p-1  relative"> 
                <span class="qstCheck absolute w-3 h-3 border-2 inline-block border-l-0 border-t-0 rotate-45 transition-transform">
                </span> </span>
                </div>
                <p class="qstAns mt-8 text-xl text-gray-600 hidden">${item.ans}</p>
            </div>

        `}).join();
    

    // showQuestion
    const qstCheckBox = document.querySelectorAll('.qstCheckBox');
    
        qstCheckBox.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
                const qstItem = e.target.closest('[data-askqst]');
                const qstAns = qstItem.querySelector('.qstAns');
                const qst = qstItem.querySelector('.qst');
                const qstCheck = qstItem.querySelector('.qstCheck');


                        
                qst.classList.toggle('text-green-500');
                qstCheck.classList.toggle('rotate-222');
                qstAns.classList.toggle('hidden');
                btn.classList.toggle('bg-green-100');

            })
        })
}
allJs()


