import swiperPage from "./modules/swiperSlider";
import scrollPage from "./modules/scrollPage";
import modals from "./modules/modals";
import lazyLoad from "./modules/lazyload";
import Validator from "./modules/validator";
import pasteMap from "./modules/googleMap";

window.addEventListener('DOMContentLoaded', ()=>{
    lazyLoad();
    swiperPage();
    scrollPage();
    modals();
    pasteMap();

    let tabsButton = document.querySelector('.tabs__header');

    // tabs window
    tabsButton.addEventListener('click', fTabs);

    function fTabs(event) {
        let dataTitle = document.getElementsByClassName('tab-h');
        let target = event.target;
        if(target.className === 'tab-h'){
            dataTitle[0].style.backgroundColor = '';
            let dataTab = target.getAttribute('data-tab');
            let tabBody = document.getElementsByClassName('tab-b');
            for( let i =0; i<tabBody.length; i++){
                if (dataTab == i){
                    tabBody[i].classList.add('tab-flex');
                    dataTitle[i].classList.add('tab-h-active');
                } else {
                    tabBody[i].classList.remove('tab-flex');
                    dataTitle[i].classList.remove('tab-h-active');
                }
            }
        }
    }

    //accordion
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active-acc");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    //valid modal-form
    const valid = new Validator(
        {
            id: 'form-modal',
            submit: 'modal-submit',
            pattern: {
                phone: /^\+380\w{9}$/,
                phone1: /^380\w{9}$/,
                phone2: /^0\w{9}$/
            },
            //какие  методы применяем для отдельных инпутов
            method: {
                'modal-phone': [
                    // ['notEmpty'],
                    ['pattern', 'phone'],
                    ['pattern', 'phone1'],
                    ['pattern', 'phone2']
                ]
            }
        }
    );
    //valid sales-form
    const valid2 = new Validator(
        {
            id: 'sale-form-modal',
            submit: 'footer-submit',
            pattern: {
                phone: /^\+380\w{9}$/,
                phone1: /^380\w{9}$/,
                phone2: /^0\w{9}$/
            },
            //какие  методы применяем для отдельных инпутов
            method: {
                'footer-phone': [
                    // ['notEmpty'],
                    ['pattern', 'phone'],
                    ['pattern', 'phone1'],
                    ['pattern', 'phone2']
                ]
            }
        }
    );
});
