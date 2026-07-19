import { productsData } from "../data/productData.js";
import { scrolling } from "./Scrolling.js";
import { State, Click, uiUpdate,CardsAllfilter } from "./renderProducts.js";

const data = await productsData()
const search = window.location.pathname

function productCount() {
    const counting = State()
    if (search === "/allGroceries.html") {
        counting.visibleCount = 6
        return counting
    }
    return counting;
}

const prices = document.querySelectorAll('.prices');
scrolling();

const allClickFind = productCount();

Click(data, allClickFind);
uiUpdate(data, allClickFind);

// input pricing sort
const minPrice = document.querySelector('.minPrice');
const maxPrice = document.querySelector('.maxPrice')
if (minPrice && maxPrice) {
    minPrice.addEventListener('input', () => {
        allClickFind.min = Number(minPrice.value) || 0;
        uiUpdate(data, allClickFind)
    })
    maxPrice.addEventListener('input', () => {
        allClickFind.max = Number(maxPrice.value) || Infinity;
        uiUpdate(data, allClickFind);
    })
    
}

// accending/decending with price sort
prices.forEach(input => {
    input.addEventListener('click', () => {
        prices.forEach(d => {
            d.classList.remove('border-green-500', 'border-2');
            d.classList.add('border');
            d.querySelector('input[type="radio"]').checked = false
        })
        input.classList.add('border-green-500', 'border-2');
        input.querySelector('input[type="radio"]').checked = true
        allClickFind.setSort = input.getAttribute('value');
        uiUpdate(data, allClickFind)
        
    });
});

CardsAllfilter(data, allClickFind );




