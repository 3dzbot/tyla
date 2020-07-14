const scrollPage = () => {

    const btnTop = document.querySelector('.btn-top'),
    socialFront = document.querySelector('.social-front'),
    header = document.getElementById('header');
    let winScroll = window.pageYOffset;

    //show btn goTop
    window.addEventListener('scroll', ()=>{
        winScroll = window.pageYOffset;
        if ((document.documentElement.clientHeight+300) <= winScroll){
            btnTop.style.display = 'block';
            btnTop.classList.add('fadeIn');
            socialFront.style.display = 'flex';
            socialFront.classList.add('fadeIn');
            header.classList.add('fixed',  'fadeInDown');

        } else if(document.documentElement.clientHeight+300 > winScroll){
            btnTop.style.display = '';
            btnTop.classList.remove('fadeIn');
            socialFront.style.display = '';
            socialFront.classList.remove('fadeIn');
            header.classList.remove('fixed',  'fadeInDown');
        }
    });

    function slowScroll(anchorsSelector, trigger = false, mobileBtn, parentWrapper) {
        const anchors = document.querySelectorAll(anchorsSelector);

        for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const blockID = anchor.getAttribute('href').substr(1);

                if (trigger) {
                    mobileBtn.classList.remove('menu-btn-active');
                    parentWrapper.style.left = '';
                    parentWrapper.style.opacity = '';
                    document.body.style.overflow = '';
                }

                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        }
    }

    slowScroll('.nav a[href*="#"]');
    slowScroll('a.btn-top[href*="#"]');
    slowScroll('a.logo');
    slowScroll('footer a[href*="#"]');
};

export default scrollPage;