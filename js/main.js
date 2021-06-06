"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // inputmask

    let phone = document.querySelectorAll("input[type='tel']"),
        im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);


    const swiperThumbs = new Swiper('.our-proj__thumbs', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: '.our-proj__thumbs-next',
            prevEl: '.our-proj__thumbs-prev',
        },
        breakpoints: {
            450: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 4,
            },
        }
    });


    const swiperProj = new Swiper('.our-proj__slider', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: '.our-proj__slider-next',
            prevEl: '.our-proj__slider-prev',
        },
        breakpoints: {
            1300: {
                slidesPerView: 2,
            },
        }
    });

    const swiperCompProj = new Swiper('.complited-proj__slider', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: '.our-proj__slider-next',
            prevEl: '.our-proj__slider-prev',
        },
        breakpoints: {
            1300: {
                slidesPerView: 2,
            },
        }
    });

    const swiperLicenses = new Swiper('.licenses__slider', {
        speed: 400,
        spaceBetween: 16,
        slidesPerView: 1,
        navigation: {
            nextEl: '.licenses__next',
            prevEl: '.licenses__prev',
        },
        
        breakpoints: {
            540: {
                slidesPerView: 2,
            },
        }
    });

    const swiperProjInner = new Swiper('.proj-slider', {
        speed: 400,
        spaceBetween: 16,
        slidesPerView: 1,
        navigation: {
            nextEl: '.proj-page__next',
            prevEl: '.proj-page__prev',
        },
        breakpoints: {
            540: {
                slidesPerView: 2,
            },
        }
    });

    const swiperProjThumbs = new Swiper('.proj-page__thumbs', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: '.our-proj__thumbs-next',
            prevEl: '.our-proj__thumbs-prev',
        },
        breakpoints: {
            450: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 4,
            },
        }
    });


    

    // tabs
    let tabBtn = document.querySelectorAll('.tab-btn'),
        tabControl = document.querySelector('.tab-control'),
        tabContent = document.querySelectorAll('.tab-content');

    if (tabControl != null) {

        tabs(tabBtn, tabControl, tabContent);

        function tabs(tab, info, tabContent) {
            function hideTab(a) {
                for (let i = a; i < tabContent.length; i++) {
                    tabContent[i].classList.remove('show');
                    tabContent[i].classList.add('hide');

                }
            }

            hideTab(1);

            function showTab(b) {
                if (tabContent[b].classList.contains('hide')) {
                    tabContent[b].classList.remove('hide');
                    tabContent[b].classList.add('show');
                }
            }
            tabControl.addEventListener('click', function (e) {
                let target = e.target;
                if (target && target.classList.contains('tab-btn')) {
                    for (let i = 0; i < tabBtn.length; i++) {
                        tabBtn[i].classList.remove('tab-btn--act');
                        if (target == tabBtn[i]) {
                            tabBtn[i].classList.add('tab-btn--act');
                            hideTab(0);
                            showTab(i);
                        }
                    }
                }
            });
        }

    }

    //E-mail Ajax Send
    $(".form-send").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['submit-modal'],
    });

    submitModal.setContent('<div class="modal__content"><h2 class="title modal__title">Спасибо за заявку!</h2><span class="modal__subtitle">Наш специалист свяжется с вами <b>в течение 20 минут</b></span></div>');


    // sub-menu

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    const body = document.querySelector('body'),
        itemHasChildren = document.querySelectorAll('.menu-item-has-children');
    if (isMobile.any()) {
        body.classList.add('touch');
        itemHasChildren.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    } else {
        body.classList.add('mouse');
    }

    // scroll menu
    const menuBlock = document.querySelector('.header'),
        wrapper = document.querySelector('.wrapper');

    let menuBlockHeight = menuBlock.scrollHeight;

    window.addEventListener('scroll', function () {

        if (window.pageYOffset >= 300) {
            menuBlock.classList.add('header--fixed');
            wrapper.style.paddingTop = `${menuBlockHeight}px`;
        } else if (window.pageYOffset < 300) {
            menuBlock.classList.remove('header--fixed');
            wrapper.style.paddingTop = 0;
        }
    });

    // mobile menu

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu__close'),
        menu = document.querySelector('.menu__inner');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.remove('lock');
    });


});