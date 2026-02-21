import { ProductsCard, card } from "./productCard.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const cardsData = ProductsCard();
const selectedCard = cardsData.find(c => c.id == id);
console.log(cardsData);

if(selectedCard){
    // DOM element update
    document.getElementById("title").textContent = selectedCard.title;
    document.getElementById("price").textContent = `$${selectedCard.price}`;
    document.getElementById("discount").textContent = `${selectedCard.discount}%`;
    document.getElementById("description").textContent = selectedCard.description || "";
    document.getElementById("img").src = selectedCard.img;
}

const picUp = document.querySelectorAll('.picUp');
const mainPicUp = document.querySelector('.mainPicUp');

console.log(card);

picUp.forEach((img) => {
    img.addEventListener('click', () => {
        picUp.forEach((item)=>{
            item.parentElement.classList.remove('border')
        })
        mainPicUp.src = img.src;
        img.parentElement.classList.add('border')
    });
});

