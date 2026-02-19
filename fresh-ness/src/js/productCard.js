let categories=[] ;

export function ProductsCard(datas){
        // product discount
        function discountProduct(price, discount){
        const discountPrice = (discount*price)/100
        const discounts = price-discountPrice
        return discounts.toFixed()

    }
    // Allproducts Show
    const allProductShow = document.getElementById('allProductsShow');  
    const allProBtn = document.getElementById('allProducts');
    const vegetableBtn = document.getElementById('vegetables');
    const freshFrutsBtn = document.getElementById('freshFruits');
    const dessertBtn = document.getElementById('desserts'); 
    const readMOreBtn = document.getElementById('readMoreCards');
    const countCategories = document.querySelector('.countCategories');
    let visiblCount = 8
    let setSort = 'arival'


// Shorting products on the All Categories page at descending prices
    const prices = document.querySelectorAll('.prices')
    if(prices){   
            prices.forEach(input => {
                input.addEventListener('click',()=>{
                    prices.forEach(d => {
                        d.classList.remove('border-green-500', 'border-2');
                        d.classList.add('border');
                        d.querySelector('input[type="radio"]').checked = false
                    })

                    input.classList.add('border-green-500', 'border-2');
                    input.querySelector('input[type="radio"]').checked = true
                    setSort = input.getAttribute('value')
                    renderProduct(productMenuIndex, searchVal.value.trim());
                   
                })
            })
            
         }

        //  filtering with ui input price
         const minPrice = document.querySelector('.minPrice');
         const maxPrice = document.querySelector('.maxPrice')
         if(minPrice || maxPrice){
             minPrice.addEventListener('input', ()=> renderProduct())
             maxPrice.addEventListener('input', ()=> renderProduct())

         }
         
       
    function renderProduct(filter = "all", searchText=""){
        allProductShow.innerHTML = "";

        // Filters will only be by categories.
         categories = datas.filter(card => filter === 'all' || card.categories === filter);

        //  filtering with input price
        if(maxPrice || minPrice){
            const min = parseFloat(minPrice.value)||0
            const max = parseFloat(maxPrice.value)
            categories = categories.filter(val => discountProduct(val.price,val.discount)>= min && (isNaN(max) || val.price <=max))
        }
         
        //  price decending sort btn
        if(setSort === 'low'){
            categories.sort((a,b) => a.price - b.price);
        }else if(setSort === 'high'){
            categories.sort((a,b) => b.price - a.price);
        }

        // product Search btn
        if(searchText){
            categories= categories.filter(card => 
                card.title.toLowerCase().includes(searchText.toLowerCase())
            )
        }
        
        // Render products to the UI
        categories.slice(0,visiblCount).map(card => {

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

        `}).join();

        // Show or hide the "Read More" button based on whether all products are visible
        readMOreBtn.style.display = visiblCount>= categories.length? "none":'block';
        console.log(categories);

        

    }
    
    
    let productMenuIndex ="all"

    // Search input function
    const searchVal = document.querySelector('.searchVal');
        searchVal.addEventListener('input', ()=> {
            const val = searchVal.value.trim()
            renderProduct(productMenuIndex, val)
            
        })

    const searchVal2 = document.querySelector('.searchVal2');
    if(searchVal2){
        searchVal2.addEventListener('input', ()=> {
            const val = searchVal2.value.trim()
            renderProduct(productMenuIndex, val)
        })
    }
    
    const searchVal3 = document.querySelector('.searchVal3');
        if(searchVal3){
            searchVal3.addEventListener('input', ()=> {
            const val = searchVal3.value.trim()
            renderProduct(productMenuIndex, val)
            })
        }
    
    // submenu stylish function of categories
    function setBtn(btn){
        [allProBtn, vegetableBtn, freshFrutsBtn, dessertBtn].forEach(b => 
            b.classList.remove('after:w-[70%]', 'text-green-400')
        )
        btn.classList.add('after:w-[70%]', 'text-green-400')
    }

    // productMenu Click function
    allProBtn.addEventListener('click', ()=>{
        visiblCount=8
        productMenuIndex ='all'
        setBtn(allProBtn)
        renderProduct();
        if(countCategories){
        countCategories.textContent = categories.length
    }
        
    })
    vegetableBtn.addEventListener('click', ()=>{
        visiblCount=8
        productMenuIndex ='Vegetable'
        setBtn(vegetableBtn);
        renderProduct('Vegetable');
        if(countCategories){
        countCategories.textContent = categories.length
    }

    })
    freshFrutsBtn.addEventListener('click', ()=>{
        visiblCount=8
        productMenuIndex ='Fruit'
        setBtn(freshFrutsBtn);
        renderProduct('Fruit');
        if(countCategories){
        countCategories.textContent = categories.length
    }

    })
    dessertBtn.addEventListener('click', ()=>{
        visiblCount=8
        productMenuIndex ='Dessert'
        setBtn(dessertBtn);
        renderProduct('Dessert');
        readMOreBtn.classList.add('hidden')
        if(countCategories){
        countCategories.textContent = categories.length
        }

    })
    
    // readMorebutton click funtion
    readMOreBtn.addEventListener('click', ()=> {
        visiblCount+=8          
        renderProduct(productMenuIndex)
    })
    
    // rendering Product
    renderProduct()
    
}

export function categorieses(){
    return categories
}