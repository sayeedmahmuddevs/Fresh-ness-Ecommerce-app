import { data } from "../data/productData";
import { ProductsCard } from "./productCard";
import { scrolling } from "./Scrolling";
import { categorieses } from "./productCard";

const arivalPro = document.querySelector('.arivalPro');
    const priceLow = document.querySelector('.priceLow');
    const priceHigh = document.querySelector('.priceHigh');
    const arivalRadio = document.getElementById('arivalRadio');
    const priceLowRadio = document.getElementById('priceLowRadio');
    const priceHighRadio = document.getElementById('priceHighRadio')


async function allgroceries() {
    const datas = await data()
    scrolling()
    
    const product = categorieses()
    product.sort((a,b) => a.price-b.price)
    ProductsCard(datas)
   


}
allgroceries()
