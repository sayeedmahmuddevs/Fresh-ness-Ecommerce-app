import { scrolling } from "./Scrolling";
import { allValues,Click, uiUpdate,} from "./renderProducts";
const search = window.location.pathname
console.log(search);
function productCount(){
    const counting = allValues()
    if(search ==="/allGroceries.html" ){
        counting.visiblCount = 6
        return counting
    }
    return counting 
}


 function allgroceries() {
    const prices = document.querySelectorAll('.prices')
    scrolling();

    const allClickFind = productCount();
    console.log(allClickFind);
    
    uiUpdate(allClickFind);

    // input pricing sort
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

        // accending/decending with price sort
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
          
           });
       });

    // click her event
    Click();

}
allgroceries()
