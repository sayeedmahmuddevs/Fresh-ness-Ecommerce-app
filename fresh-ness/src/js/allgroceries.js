import { scrolling } from "./Scrolling";
import { allClick, uiUpdate,} from "./renderProducts";


async function allgroceries() {
    const prices = document.querySelectorAll('.prices')
    scrolling();

    const allClickFind = allClick()
    uiUpdate(allClickFind);

      const minPrice = document.querySelector('.minPrice');
         const maxPrice = document.querySelector('.maxPrice')
         if(minPrice && maxPrice){
             minPrice.addEventListener('input', ()=> {
                allClickFind.min = Number(minPrice.value)|| 0;
                uiUpdate(allClickFind)
             })
             maxPrice.addEventListener('input', ()=> {
                allClickFind.max = Number(maxPrice.value) || Infinity;
                uiUpdate(allClickFind)
             })

         }

       prices.forEach(input => {
           input.addEventListener('click',()=>{
               prices.forEach(d => {
                   d.classList.remove('border-green-500', 'border-2');
                   d.classList.add('border');
                   d.querySelector('input[type="radio"]').checked = false
               })
           input.classList.add('border-green-500', 'border-2');
               input.querySelector('input[type="radio"]').checked = true
               allClickFind.setSort = input.getAttribute('value');
               uiUpdate(allClickFind)
          
           })
       })
    

}
allgroceries()
