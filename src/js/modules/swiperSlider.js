const swiperPage = () => {
    //swiper-slider
    var swiperPlans = new Swiper('.swiper-container', {
        zoom: true,
        spaceBetween: 50,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};

export default swiperPage;