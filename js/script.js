


const {
    active,
    none
} = {
    active: 'active',
    none: 'd-none'
}

AOS.init();


const windowHeight = $(window).height()


// Header


const headerSlider = [
    {
        name: "частные дома",
        url: "images/header-bg.png"
    },
    {
        name: "банные комплексы ",
        url: "images/header-img-1.jpg",
    },
    {
        name: "беседки",
        url: "images/header-img-2.jpg"
    },
    {
        name: "гаражи",
        url: "images/header-img-3.jpg"
    },
    {
        name: "пространства",
        url: "images/header-img-4.jpg"
    }
]


headerSlider.forEach((sliderItem, index) => {
    $('.header-image').append(`<img id="header_slide_${index}" src="${sliderItem.url}" class="${index === 0 ? 'opacity-1' : 'opacity-0'}"  alt="haeder">`)
    $('.header-info-top-buttons').append(`<button class="me-1 ${index === 0 ? 'active' : ''}">${sliderItem.name}</button>`)

    if(index === headerSlider.length - 1){
        startClickHeaderNavigationButtons();
    }
})

let sliderActiveIndex =0;
setInterval(() => {

    changeSlider(sliderActiveIndex)
    if(sliderActiveIndex === headerSlider.length - 1){
        sliderActiveIndex = -1;
    }
    sliderActiveIndex++;
}, 2000)



function startClickHeaderNavigationButtons(){
    const navigateButtons = $('.header-info-top-buttons button');

    navigateButtons.on('click', function (){
        const thisElem = $(this);
        const name = thisElem.text();

        headerSlider.forEach((item, index) => {
            if(item.name === name){
                sliderActiveIndex = index;
                changeSlider(sliderActiveIndex)
            }
        })
    })
}


function changeSlider(activeIndex){
    const navigateButtons = $('.header-info-top-buttons button');

    $('.header-image img').removeClass('opacity-1').addClass('opacity-0');
    $(`#header_slide_${activeIndex}`).removeClass('opacity-0').addClass('opacity-1');

    navigateButtons.removeClass(active)
    $(navigateButtons.get(activeIndex)).addClass(active)
}


const headerSliderArray = [
    'images/home.jpg',
    'images/home2.png',
    'images/home3.png',
    'images/home4.png',
    'images/home5.png',
]


$(window).on('load', function () {
    headerSliderArray.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => console.log('loaded')
    })
})

ScrollTrigger.create({
    start: `top -${windowHeight - 50}`,
    end: 99999,
    toggleClass: {className: 'nav--fixed', targets: '.menu '},
});



// $(window).on('load', function (){
//     const Works = $('#works').offset().top;
//     ScrollTrigger.create({
//         start: `top -${Works}`,
//         end: 8000,
//         toggleClass: {className: 'nav-works', targets: '.menu '},
//     });
//
// })


//. ...Accordion btn


$('.accordion-header').on('click', function (){
    // $(".btn-round").click({animateIn: "closeButton", animateOut: "plusButton"}, animate_function);
    const btnRound = $(this).find('.btn-round');
    if(btnRound.hasClass(active)){
        btnRound.removeClass(active)
    } else {
        btnRound.addClass(active)
    }

})


//.... Slider

const left_btn = document.querySelector('.left-btn')
const right_btn = document.querySelector('.right-btn')


left_btn.addEventListener('click', ()=>{
    ChangeSlider('minus')
})

right_btn.addEventListener('click', ()=>{
    ChangeSlider('plus')
})
let num = 0;



const headerImageBlock = document.querySelector('.slider-image');
const count_span = document.querySelector('.count span');
const count_samp = document.querySelector('.count samp');
count_span.innerHTML = `${num + 1} / ${headerSliderArray.length}`

function ChangeSlider(numStatus){

    numStatus === 'plus' ? num++ : num--
    console.log(num)
    if(num >= headerSliderArray.length){
        num = 0
    } else if(num < 0){
        num = headerSliderArray.length-1
    }
    count_span.innerText = `${num  + 1} / ${headerSliderArray.length}`
    headerImageBlock.style.backgroundImage = `url(${headerSliderArray[num]})`;


}



// team

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);


const menu = $('.menu');
const ourWork = $('.our-work');
const worksColBoxText = $('.works-col-box-text');
const worksHeading = $('.works-heading');
let secLeft = 650;

ScrollTrigger.create({
    trigger: "#works-box",
    start: `top top-=-200`,
    end: `top top-=1500`,
    pin: true,
    onUpdate: function (e){
        const percent = +(e.progress * 100).toFixed();

        ourWork.css('opacity', (1 - e.progress));
        worksColBoxText.css('opacity', (1 - e.progress));

        worksHeading.css({
            'opacity': e.progress,
            'left': `-${400 - (400 * percent) / 100}px`
        });

        const secPercent = (secLeft * percent) / 100;

        $('#works').css({
            'transform': `translateX(-${percent}vw)`,
            left: `-${secLeft - secPercent}px`,
            top: `${200 - (200 * percent) / 100}px`,
        })

        if(percent >= 99){
            menu.addClass('nav-works')
        } else {
            menu.removeClass('nav-works')
        }
    }
});



/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  panelsContainer2 = document.querySelector("#panels-container2"),
  panelsContainer2Panel = $("#panels-container #panel-2").offset().top,
  tween;
console.log(panelsContainer2Panel)

const panels = gsap.utils.toArray("#panels-container .panel");
tween = gsap.to(panels, {
    xPercent: -100 * ( panels.length - 1 ),
    ease: "none",
    scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top ",
        scrub: 1,
        snap: {
            snapTo: 1 / (panels.length - 1),
            inertia: false,
            duration: {min: 0.1, max: 0.1}
        },
        end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
    }
});

let fixHeading = 97;

ScrollTrigger.create({
    trigger: "#panels-container2",
    start: `top top-=-64` ,
    end: `top top-=5000`,
    pin: true,
    onUpdate: function (e){
        const percent = +(e.progress * 100).toFixed();

        $('#panels-container2 .head-box').css('transform', `translateX(${fixHeading - (percent * 3)}%)`);
        if(percent >= 80){
            $('#panels-container2 .button').css('opacity', 1);
        } else {
            $('#panels-container2 .button').css('opacity', 0);
        }
        console.log(percent)
    }
});
//. team End


// function animate_function(event){
//     if( $(this).hasClass(event.data.animateIn) ) {
//         $(this).removeClass(event.data.animateIn).addClass(event.data.animateOut);
//     }
//     else if( $(this).hasClass(event.data.animateOut) ) {
//         $(this).removeClass(event.data.animateOut).addClass(event.data.animateIn);
//     }
//     else {
//         $(this).addClass('animated ' + event.data.animateIn);
//     }
// }
//let activePanelNavIndex = 0;
//let activePanelNavSuccess = true;



//
// const headerSliderArray = [
//     'images/slider1.png',
//     'images/slider2.png',
//     'images/slider3.png',
//     'images/slider4.png',
//     'images/slider5.png',
// ]
//
//
//
// $(window).on('load', function (){
//     headerSliderArray.forEach((url) => {
//         const img = new Image();
//         img.src = url;
//         img.onload = () => console.log('loaded')
//     })
//
//
//     const Planning = $('#planning .heading').offset().top;
//     console.log(Planning)
//     ScrollTrigger.create({
//         start: `${Planning - 50}`,
//         end: `${Planning + 200}`,
//         toggleClass: {className: 'heading-open', targets: '.planning'},
//     });
//
//
//
//     const YoulGet = $('#youll-get').offset().top;
//     console.log(YoulGet, panelNav)
//

//
// ScrollTrigger.create({
//     start: 'top -50',
//     end: 99999,
//     toggleClass: {className: 'nav--fixed', targets: '.max-header'},
// });
//
// ScrollTrigger.create({
//     start: 'top -900',
//     end: 99999,
//     toggleClass: {className: 'nav-color-black', targets: '.max-header'}
// });
//
//
// const PannelsTop = $('#panels').offset().top;
// const panelWidths = $('#panels-container').width();
//
//
// ScrollTrigger.create({
//     start: `top -${PannelsTop + 500}` ,
//     end: `${panelWidths}`,
//     toggleClass: {className: 'nav-change', targets: '.max-header'}
// });
//
// $('.js-example-basic-single').select2({
//     minimumResultsForSearch: Infinity
// });
//
// $(window).scroll();
//
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
//
//
//
// /// Gallery
// gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
//
// /* Main navigation */
// let panelsSection = document.querySelector("#panels"),
//   panelsContainer = document.querySelector("#panels-container"),
//   tween;
//
//
//
// /* Panels */
//
//
// const panels = gsap.utils.toArray("#panels-container .panel");
// tween = gsap.to(panels, {
//     xPercent: -100 * ( panels.length - 1 ),
//     ease: "none",
//     scrollTrigger: {
//         trigger: "#panels-container",
//         pin: true,
//         start: "top top",
//         scrub: 1,
//         snap: {
//             snapTo: 1 / (panels.length - 1),
//             inertia: false,
//             duration: {min: 0.1, max: 0.1}
//         },
//         end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
//     }
// });
//
//
//
//
// // ....... planning
//
//
// const btn_col = document.querySelector('#col-box1-btn')
// const btn_buy = document.querySelector('#btn-buy')
// const btn_prev = document.querySelector('#btn-prev')
// const btn_prev_slider = document.querySelector('#btn-white-slider')
// const btn_buy_slider = document.querySelector('#btn-green-slider')
// const buttons_slider = document.querySelector('#buttons-slider')
// const col_box1 = document.querySelector('#col-box1')
// const col_box2 = document.querySelector('#col-box2')
// const switch_planning = document.querySelector('#switch-planning input')
// const container1 = document.querySelector('#container1')
// const slider_planning = document.querySelector('#slider-image')
// const open_close = document.querySelector('#open-close')
// const col_green2 = document.querySelector('#col-green2')
// const col_green = document.querySelector('#col-green')
//
// btn_col.addEventListener('click', ()=>{
//     col_box1.classList.remove('active')
//     col_box2.classList.add('active')
// })
//
//
// btn_prev.addEventListener('click', ()=>{
//     col_box1.classList.add('active')
//     col_box2.classList.remove('active')
// })
//
//
//
//
// switch_planning.addEventListener('change', (e)=>{
//     if(!e.currentTarget.checked){
//         container1.classList.add('active')
//         slider_planning.classList.remove('active')
//     } else {
//         slider_planning.classList.add('active')
//         container1.classList.remove('active')
//         open_close.classList.add('active')
//     }
// })
//
//
// open_close.addEventListener('click', ()=>{
//     col_green2.classList.toggle('active')
//     col_green.classList.toggle('active')
//
//     if(!col_green.classList.contains('active')){
//         buttons_slider.classList.add('active')
//         slider_planning.classList.add('ok')
//     } else {
//         buttons_slider.classList.remove('active')
//         slider_planning.classList.remove('ok')
//     }
//
// })
//
// btn_prev_slider.addEventListener('click', ()=>{
//     buttons_slider.classList.remove('active')
//     slider_planning.classList.remove('ok')
//     if(!col_green.classList.contains('active')){
//         col_green.classList.add('active')
//         col_green2.classList.add('active')
//     }
// })
//
//
// btn_buy_slider.addEventListener('click', ()=>{
//     col_box1.classList.remove('active')
//     col_box2.classList.add('active')
//     buttons_slider.classList.remove('active')
//     slider_planning.classList.remove('ok')
//     if(!col_green.classList.contains('active')){
//         col_green.classList.add('active')
//         col_green2.classList.add('active')
//     }
// })
//
// // ......
//
//
//
// const left_btn = document.querySelector('.left-btn')
// const right_btn = document.querySelector('.right-btn')
//
//
// left_btn.addEventListener('click', ()=>{
//     ChangeSlider('minus')
// })
//
// right_btn.addEventListener('click', ()=>{
//     ChangeSlider('plus')
// })
// let num = 0;
//
//
//
//
// const headerImageBlock = document.querySelector('.slider-image');
// const count_span = document.querySelector('.count span');
// const count_samp = document.querySelector('.count samp');
// count_span.innerHTML = `${num + 1} / ${headerSliderArray.length}`
//
// function ChangeSlider(numStatus){
//
//     numStatus === 'plus' ? num++ : num--
//     console.log(num)
//     if(num >= headerSliderArray.length){
//         num = 0
//     } else if(num < 0){
//         num = headerSliderArray.length-1
//     }
//     count_span.innerText = `${num  + 1} / ${headerSliderArray.length}`
//     headerImageBlock.style.backgroundImage = `url(${headerSliderArray[num]})`;
//
//
// }
//
//
//
// //......... Youll Get
//
//
//
//
//
// const panelYoul = $('.panel-youl');
// const panelNav = $('.section_nav a');
// const youlTexts = $('.box-title .title1');
//
//
//
// panelNav.on('click', function (e){
//     e.preventDefault();
// })
//
//
//
// // ........ slick
//
// const allslicLengt = document.querySelectorAll('.slider .image')
// const span_count = document.querySelector('.count samp')
// span_count.innerText = `/ ${allslicLengt.length} `
// let activeIndex = 1;
//
// $('.slider').slick({
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     customPaging: function (slider, i) {
//
//         return  (i + 1) + '/' + slider.slideCount;
//         // $('.slider-text .count span').text(`${activeIndex} `)
//     },
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 infinite: true,
//             }
//         },
//         {
//             breakpoint: 600,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//             }
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//             }
//         }
//
//     ]
// }).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
//
//     if(!slick.$dots){
//         return;
//     }
//
//     const i = (currentSlide ? currentSlide : 0) + 1;
//
//     $('.count-box .count').text(i + '/' + (slick.$dots[0].children.length));
// })
//
//
// //...... Modals
//
// const modal_links = document.querySelectorAll('#links a')
// const modal_menu = new bootstrap.Modal(document.getElementById('exampleModal'), {
//     keyboard: false
// })
// modal_links.forEach((link)=>{
//     link.addEventListener('click', ()=>{
//         modal_menu.hide()
//     })
// })
//
// const modal_purchase = new bootstrap.Modal(document.getElementById('modal-purchase'), {
//     keyboard: false
// })
// const modal_bd1 = document.getElementById('modal-bd1')
// const modal_bd2 = document.getElementById('modal-bd2')
// const modal_ft1 = document.getElementById('modal-ft1')
// const modal_ft2 = document.getElementById('modal-ft2')
// const modal_btn1 = document.getElementById('btn-ft1')
// const modal_btn2 = document.getElementById('btn-ft2')
//
//
// modal_btn1.addEventListener('click', ()=>{
//     modal_bd1.classList.remove('active')
//     modal_bd2.classList.add('active')
//     modal_ft1.classList.remove('active')
//     modal_ft2.classList.add('active')
// })
//
// modal_btn2.addEventListener('click', ()=>{
//     modal_purchase.hide()
// })
