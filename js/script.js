


const {
    active,
    none
} = {
    active: 'active',
    none: 'd-none'
}

AOS.init();


const windowHeight = $(window).height();


$(window).on('resize', function (){
    checkPositionCall()
})

checkPositionCall();
function checkPositionCall(){
    const iconPhoneBack = $('#icon-phone-back').offset();
    const iconPhone = $('.icon-phone');

    iconPhone.css({
        left: iconPhoneBack.left,
        top: iconPhoneBack.top,
    })
}

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
    $('.header-image').append(`<img width="100%" height="100%" id="header_slide_${index}" src="${sliderItem.url}" class="${index === 0 ? 'opacity-1' : 'opacity-0'}"  alt="haeder">`)
    $('.header-info-top-buttons').append(
      `<div class="me-1 btn-loading">
        ${sliderItem.name}
        <div class="loading">${sliderItem.name}</div>
      </div>
    `)

    if(index === headerSlider.length - 1){
        startClickHeaderNavigationButtons();
    }
})



let activeIndex = 0;
StartSliderHeader()
function StartSliderHeader(){
    const navigateButtons = $('.header-info-top-buttons .btn-loading');
    let count = 0;

    setInterval(() => {

        $(navigateButtons.get(activeIndex)).children('.loading').css('width', `${count}%`);
        if(count === 0){
            changeSlider(activeIndex);
        }


        if(count === 100){
            activeIndex++;
            count = -5;

            if(activeIndex === headerSlider.length){
                activeIndex = 0;
                navigateButtons.children('.loading').css('width', 0)
            }

        }

        count += 5;

    }, 200)
}



function startClickHeaderNavigationButtons(){
    const navigateButtons = $('.header-info-top-buttons .btn-loading');

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
    $('.header-image img').removeClass('opacity-1').addClass('opacity-0');
    $(`#header_slide_${activeIndex}`).removeClass('opacity-0').addClass('opacity-1');


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
    const Services = $('#services').offset().top
    ScrollTrigger.create({
        trigger: "#services",
        start: `top top`,
        end: 20,
        onEnter: () => {
            menu.removeClass('nav-works')
        },
        onEnterBack: () => {
            menu.addClass('nav-works')
        }
    });
})

ScrollTrigger.create({
    start: `top -${windowHeight - 50}`,
    end: 99999,
    toggleClass: {className: 'nav--fixed', targets: '.menu '},
});





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

//.... Step

const steps = $('#steps')
const stepsTitle = $('#steps .steps-title')
const stepsBloc = $('#steps .steps-bloc')
const stepsHeading1 = $('#steps .steps-heading-1')
const stepsHeading2 = $('#steps .steps-heading-2')
ScrollTrigger.create({
    trigger: "#steps",
    start: `top top-=-200`,
    end: `top top-=1500`,
    pin: true,
    onUpdate: function (e){
        const percent = +(e.progress * 100).toFixed();

        stepsTitle.css('opacity', (1 - e.progress));
        stepsBloc.css({
            'opacity': `${0 + e.progress}`,
            'transform': `translateX(${80 - (80 * percent / 100)}%)`,
        });

        stepsHeading1.css({
            'transform': `translateX(${50 - (50 * percent / 100)}%)`,
            'opacity': `${0 + e.progress}`,
        });

        stepsHeading2.css({
            'transform': `translateX(${30 - (30 * percent / 100)}%)`,
            'opacity': `${0 + e.progress}`,
        });

        if(percent > 80){
            $('.gradient').removeClass(none)
        } else {
            $('.gradient').addClass(none)
        }

        const secPercent = (secLeft * percent) / 100;



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
        start: `top +${50}`,
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



//... Modal

const modal_links = document.querySelectorAll('#modal-links a')
const modal_menu_buttons = document.querySelectorAll('#modal-menu-buttons button')

const modal_menu = new bootstrap.Modal(document.getElementById('modal-menu'), {
    keyboard: false
})
const modal_project = new bootstrap.Modal(document.getElementById('modal-project'), {
    keyboard: false
})


modal_links.forEach((link)=>{
    link.addEventListener('click', ()=>{
        modal_menu.hide()
    })
})

modal_menu_buttons.forEach((el =>{
    el.addEventListener('click', ()=> {
        modal_menu.hide()
        setTimeout(()=>{
            modal_project.show()
        },200)
    })
}))


$(window).on('scroll', function (){
    const stepsBlocItem = document.querySelectorAll('.steps-bloc-item');
    const windowTop = $(window).scrollTop();

    stepsBlocItem.forEach((item) => {
        const top = $(item).offset().top;

        if(windowTop >= top - 400){
            item.classList.add('open')
        } else{
            item.classList.remove('open')
        }
    })
})