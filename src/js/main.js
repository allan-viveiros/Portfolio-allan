// Get DOM items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBrand = document.querySelector('.menu-brand');
const menuNavItems = document.querySelectorAll('.nav-item');

//Initial state of main menu (Vanilla-js)
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);
function toggleMenu() {
    if(!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBrand.classList.add('show');

        menuNavItems.forEach(item => item.classList.add('show'));

        //Menu is open
        showMenu = true;
    }
    else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBrand.classList.remove('show');

        menuNavItems.forEach(item => item.classList.remove('show'));

        //Menu is close
        showMenu = false;
    }
}


const spans = document.querySelectorAll('h1 span')
spans.forEach(span => 
    span.addEventListener('mouseover', function(e) {
        span.classList.add('animated', 'rubberBand')
    })
);
spans.forEach(span => 
    span.addEventListener('mouseout', function(e) {
        span.classList.remove('animated', 'rubberBand')
    })
);