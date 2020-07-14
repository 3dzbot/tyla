const pasteMap = () => {
    const mapContainer = document.querySelector('.google-map');
    const mapCode = `
        <iframe height="620" src="https://maps.google.com/maps?width=900&amp;height=620&amp;hl=en&amp;q=%D0%A2%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%B0%D1%8F%20108+(%D0%9D%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed"></iframe>
    `;

    mapContainer.insertAdjacentHTML('beforeEnd', mapCode)
};

export default pasteMap;