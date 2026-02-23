import { data } from "../data/productData";

// API Call data
const datas = await data();


// discountProduct function
export function discountProduct(price, discount) {
    const discountPrice = (discount * price) / 100
    const discounts = price - discountPrice
    return Number(discounts.toFixed())
}

// Categories by filter
export function categoriesFilter(products, categories = 'all') {
    if (categories === 'all') return products;
    return products.filter(card => card.categories === categories)
}

// inputprice by filter
export function filterByPrice(products, min = 0, max = Infinity) {
    return products.filter(val => {

        const discountPrice = discountProduct(val.price, val.discount)
        return discountPrice >= min && discountPrice <= max
    }
    )
}

// input Text by filter
export function searchFilter(products, searchText = "") {
    if (!searchText) return products
    return products.filter(card => card.title.toLowerCase().includes(searchText.toLowerCase()))
}

// dicending or assending by filter
export function sortFilter(products, setSort = 'arrival') {
    const sorted = [...products]
    if (setSort === 'low') {
        sorted.sort((a, b) => discountProduct(a.price, a.discount) - discountProduct(b.price, b.discount));
    } else if (setSort === 'high') {
        sorted.sort((a, b) => discountProduct(b.price, b.discount) - discountProduct(a.price, b.discount));
    }

    return sorted
}

// render Product
export function renderCards(products, visiblCount = 8, container) {
    container.innerHTML = "";
    products.slice(0, visiblCount).forEach(card => {
        const proDiscount = discountProduct(card.price, card.discount)
        container.innerHTML += `
                    <div data-cardIndex = ${card.id} class="relative col-span-1 hover:shadow-gray-200 gap-2 border rounded-2xl shadow-2xl p-2 h-[330px]">
                        <span class="absolute z-4 p-1 rounded-lg bg-amber-500 text-white font-bold">${card.discount}%</span>
                        <div class="absolute z-4 right-0 flex flex-col gap-5 text-2xl pr-1">
                            <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><i class="fa-regular fa-heart"></i></span>
                            <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><i class="fa-solid fa-rotate"></i></span>
                            <span class="bg-pink-300 p-1 rounded-full w-10 h-10 flex justify-center items-center hover:scale-120 transition-all"><a href="./cardDetails.html?id=${card.id}"><i class="fa-regular fa-eye"></i></a></span>
                        </div>  
                        <div class="h-[50%] text-center overflow-hidden"><img class="w-[100%] h-[100%] bg-pink-100 hover:scale-105 transition-all" src="${card.img}" alt=""></div>
                        <div>
                            <span class="text-sm font-semibold text-gray-400">${card.categories}</span>
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
                            <div class="cart flex justify-end text-2xl px-4 hover:scale-105 transition-transform"><i class="fa-solid fa-cart-shopping"></i></div>
                        </div>
                    </div>
    
            `});

    return products.slice(0, visiblCount)
}


// Cards All filter
export function CardsAllfilter(option = {}) {
    const allProductShow = document.getElementById('allProductsShow');
    let { categories = 'all', min = 0, max = Infinity, setSort = 'arrival', searchText = "", visiblCount = 8 } = option

    let filtered = categoriesFilter(datas, categories);
    filtered = filterByPrice(filtered, min, max);
    filtered = searchFilter(filtered, searchText);
    filtered = sortFilter(filtered, setSort);
    if (allProductShow) {
        renderCards(filtered, visiblCount, allProductShow);
    }
    return filtered
}


// uiUpdate function
export function uiUpdate(state) {
    const readMOreBtn = document.getElementById('readMoreCards');
    const countCategories = document.querySelector('.countCategories');

    const result = CardsAllfilter(state)
    if (countCategories) {
        countCategories.textContent = result.length
    }
    readMOreBtn.style.display = state.visiblCount >= result.length ? "none" : 'block';

};

const cartState = {cartCount:0}
// allClick function
export function allValues() {

    const state = {
        categories: 'all',
        min: 0,
        max: Infinity,
        setSort: 'arrival',
        searchText: '',
        visiblCount: 8,
    }

    return state;
}


export function Click() {

    const allProBtn = document.getElementById('allProducts');
    const vegetableBtn = document.getElementById('vegetables');
    const freshFrutsBtn = document.getElementById('freshFruits');
    const dessertBtn = document.getElementById('desserts');
    const readMOreBtn = document.getElementById('readMoreCards');
    const data = allValues()
    // Search input function
    const searchVal = document.querySelectorAll('.searchVal');
    if (searchVal) {
        searchVal.forEach((inp) => {
            inp.addEventListener('input', () => {
                data.searchText = inp.value.trim();
                uiUpdate(data);
            })


        })
    }

    // submenu stylish function of categories
    function setBtn(btn) {
        [allProBtn, vegetableBtn, freshFrutsBtn, dessertBtn].forEach(b =>
            b.classList.remove('after:w-[70%]', 'text-green-400')
        )
        btn.classList.add('after:w-[70%]', 'text-green-400');
    }

    // productMenu Click function
    if (allProBtn) {
        allProBtn.addEventListener('click', () => {
            data.visiblCount = 8
            data.categories = 'all'
            setBtn(allProBtn);
            uiUpdate(data);
        })
    }
    if (vegetableBtn) {
        vegetableBtn.addEventListener('click', () => {
            data.visiblCount = 8
            data.categories = 'Vegetable'
            setBtn(vegetableBtn);
            uiUpdate(data);

        })
    }
    if (freshFrutsBtn) {
        freshFrutsBtn.addEventListener('click', () => {
            data.visiblCount = 8
            data.categories = 'Fruit'
            setBtn(freshFrutsBtn);
            uiUpdate(data);

        })
    }
    if (dessertBtn) {
        dessertBtn.addEventListener('click', () => {
            data.visiblCount = 8
            data.categories = 'Dessert'
            setBtn(dessertBtn);
            uiUpdate(data);
            readMOreBtn.classList.add('hidden')
        })
    }


    // readMorebutton click funtion
    if (readMOreBtn) {
        readMOreBtn.addEventListener('click', () => {
            data.visiblCount += data.visiblCount === 6 ? 6 : 8
            uiUpdate(data);
        })
    }
    console.log(data.visiblCount);

    // ADD TO CART COUNT DOM ELEMENT
    const allProductShow = document.getElementById('allProductsShow');
    const relatedProducts = document.getElementById('cardDetailsMain');
    const cartCount = document.getElementById('cartCount');

    if(allProductShow){
        allProductShow.addEventListener('click', handleClick)
    }
    if(relatedProducts){
        relatedProducts.addEventListener('click', handleClick)
    }
    // CLICK COUNT CART logic
    function handleClick(e){
        const target = e.target.closest('.cart');

        if(!target) return;
        cartState.cartCount++;
        cartCount.textContent = cartState.cartCount
        console.log(target);
    }
       
    
    

}


