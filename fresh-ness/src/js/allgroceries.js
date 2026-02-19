import { data } from "../data/productData";
import { ProductsCard } from "./productCard";
import { scrolling } from "./Scrolling";


async function allgroceries() {
    const datas = await data()
    scrolling()
    ProductsCard(datas)
    


}
allgroceries()
