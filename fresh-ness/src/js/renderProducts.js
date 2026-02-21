import { data } from "../data/productData";

const datas = await data();


export function discountProduct(price, discount) {
    const discountPrice = (discount * price) / 100
    const discounts = price - discountPrice
    return Number(discounts.toFixed())
}

export function categoriesFilter(products, categories = 'all') {
    if (categories === 'all') return products;

    return products.filter(card => card.categories === categories)
}

export function filterByPrice(products, min = 0, max = Infinity) {
    return products.filter(val => {

        const discountPrice = discountProduct(val.price, val.discount)
        return discountPrice >= min && discountPrice <= max
    }
    )
}

export function searchFilter(products, searchText = "") {
    if (!searchText) return products
    return products.filter(card => card.title.toLowerCase().includes(searchText.toLowerCase()))
}

export function sortFilter(products, setSort = 'arrival') {
    const sorted = [...products]
    if (setSort === 'low') {
        sorted.sort((a, b) => discountProduct(a.price , a.discount)-discountProduct(b.price , b.discount));
    } else if (setSort === 'high') {
        sorted.sort((a, b) => discountProduct(b.price , b.discount)-discountProduct(a.price , b.discount));
    }

    return sorted
}

export function renderCards(products, visiblCount = 8, container) {
    container.innerHTML = ''
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
                            <div class="flex justify-end text-2xl px-4 hover:scale-105 transition-transform"><i class="fa-solid fa-cart-shopping"></i></div>
                        </div>
                    </div>
    
            `});

    return products.slice(0, visiblCount)
}

export function CardsAll(option = {}) {
    const allProductShow = document.getElementById('allProductsShow');
    let { categories = 'all', min = 0, max = Infinity, setSort = 'arrival', searchText = "", visiblCount = 8 } = option

    let filtered = categoriesFilter(datas, categories);

    filtered = filterByPrice(filtered, min, max);
    filtered = searchFilter(filtered, searchText);
    filtered = sortFilter(filtered, setSort)

    renderCards(filtered, visiblCount, allProductShow);

    return filtered

}
const readMOreBtn = document.getElementById('readMoreCards');
export function uiUpdate(state){
    const countCategories = document.querySelector('.countCategories');
    
        const result = CardsAll(state)
        if (countCategories) {
            countCategories.textContent = result.length
        }
        readMOreBtn.style.display = state.visiblCount>= result.length? "none":'block';

    }
export function allClick() {

    const allProBtn = document.getElementById('allProducts');
    const vegetableBtn = document.getElementById('vegetables');
    const freshFrutsBtn = document.getElementById('freshFruits');
    const dessertBtn = document.getElementById('desserts');
    
    
    
    const state = {
        categories: 'all',
        min: 0,
        max: Infinity,
        setSort: 'arrival',
        searchText: '',
        visiblCount: 8
    }


    // Search input function
    const searchVal = document.querySelector('.searchVal');
    searchVal.addEventListener('input', () => {
        state.searchText = searchVal.value.trim()
        uiUpdate(state)

    })

    const searchVal2 = document.querySelector('.searchVal2');
    if (searchVal2) {
        searchVal2.addEventListener('input', () => {
            state.searchText = searchVal2.value.trim()
            uiUpdate(state)
        })
    }

    const searchVal3 = document.querySelector('.searchVal3');
    if (searchVal3) {
        searchVal3.addEventListener('input', () => {
            state.searchText = searchVal3.value.trim()
            uiUpdate(state)
        })
    }

    // submenu stylish function of categories
    function setBtn(btn) {
        [allProBtn, vegetableBtn, freshFrutsBtn, dessertBtn].forEach(b =>
            b.classList.remove('after:w-[70%]', 'text-green-400')
        )
        btn.classList.add('after:w-[70%]', 'text-green-400')
    }

    // productMenu Click function
    allProBtn.addEventListener('click', () => {
        state.visiblCount = 8
        state.categories = 'all'
        setBtn(allProBtn)
        uiUpdate(state)
        

    })
    vegetableBtn.addEventListener('click', () => {
        state.visiblCount = 8
        state.categories = 'Vegetable'
        setBtn(vegetableBtn);
        uiUpdate(state);

    })
    freshFrutsBtn.addEventListener('click', () => {
        state.visiblCount = 8
        state.categories = 'Fruit'
        setBtn(freshFrutsBtn);
        uiUpdate(state)

    })
    dessertBtn.addEventListener('click', () => {
        state.visiblCount = 8
        state.categories = 'Dessert'
        setBtn(dessertBtn);
        uiUpdate(state)
        readMOreBtn.classList.add('hidden')

    })

    // readMorebutton click funtion
    readMOreBtn.addEventListener('click', () => {
        state.visiblCount += 8
        uiUpdate(state)
    })
    return state
}




