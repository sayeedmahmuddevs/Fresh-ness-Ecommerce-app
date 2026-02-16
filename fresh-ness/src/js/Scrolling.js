export function scrolling(){
    // mobile menu
        const mobileMenu = document.getElementById('mobileMenu')
    mobileMenu.addEventListener('click', ()=>{
        const mobileNav = document.getElementById('mobileNav');
        mobileNav.classList.toggle('-translate-x-100');
        

    })

    // mavbar scroll hide show
    let lastScroll = window.scrollY;
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        let currentScroll = window.scrollY;
        const mobileNav = document.getElementById('mobileNav')
        if (currentScroll > lastScroll && window.scrollY > 150) {
            mobileNav.classList.add('-translate-y-200')
            header.classList.add('-translate-y-100');


        } else {
            header.classList.remove('-translate-y-100');
            mobileNav.classList.remove('-translate-y-200')
        }

        lastScroll = currentScroll;
    });

}