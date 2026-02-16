// question Item
const askQuestion = [
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    },
    {
        question: 'How do I place an order on FreshNess?',
        ans: "Ordering at FreshNess is simple! Browse our categories, add your desired organic products to the cart, and proceed to checkout. You will need to provide your delivery address and choose a payment method. Once confirmed, you'll receive an order ID and real-time updates via SMS and email until your fresh groceries reach your doorstep."
    }
];

    
// ============================ Ask question Start ======================================

const questionBox = document.getElementById("qstBox");
  
    questionBox.innerHTML = "";
    askQuestion.map((item, index)=>{
        questionBox.innerHTML += `
            <div data-askqst="${index+1}" class="p-5 rounded-xl border border-green-500 bg-white mb-4">
                <div class="qstItem flex justify-between items-center ">
                <h3 class="qst text-xl font-bold shadow-3xl">${item.question}</h3>
                <span class="qstCheckBox size-10 bg-gray-200 flex justify-center items-center rounded-full p-1  relative"> 
                <span class="qstCheck absolute w-3 h-3 border-2 inline-block border-l-0 border-t-0 rotate-45 transition-transform">
                </span> </span>
                </div>
                <p class="qstAns mt-8 text-xl text-gray-600 hidden">${item.ans}</p>
            </div>

        `}).join();
    

    // showQuestion
    const qstCheckBox = document.querySelectorAll('.qstCheckBox');
    
        qstCheckBox.forEach(btn =>{
            btn.addEventListener('click', (e)=>{
                const qstItem = e.target.closest('[data-askqst]');
                const qstAns = qstItem.querySelector('.qstAns');
                const qst = qstItem.querySelector('.qst');
                const qstCheck = qstItem.querySelector('.qstCheck');
                        
                qst.classList.toggle('text-green-500');
                qstCheck.classList.toggle('rotate-222');
                qstAns.classList.toggle('hidden');
                btn.classList.toggle('bg-green-100');

            })
        })
    


