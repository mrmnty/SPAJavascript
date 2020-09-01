'use strict';

(function () {
    function init() {
        const router = new Router([
            new Route('home', 'home.html', true),            
            new Route('shop', 'shop.html'),
            new Route('magazine', 'magazine.html'),
            new Route('productDescription', 'product-description.html')
        ]);
    }
    init();
}());
