import { data } from "../data/productData";
import { ProductsCard } from "./productCard";
import { scrolling } from "./Scrolling";
import { categorieses } from "./productCard";


const countCategories = document.querySelector('.countCategories');


async function allgroceries() {
    const datas = await data()
    scrolling()
    ProductsCard(datas)
    
    
    countCategories.textContent = categorieses().length

    
   


}
allgroceries()
