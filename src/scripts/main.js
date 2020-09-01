'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('shop', 'shop.html'),
            new Route('magazine', 'magazine.html'),
            new Route('productDescription', 'product-description.html')
        ]);
    }
    init();
}());

const promiseOfSomeData = fetch("./model/products.json").then(r=>r.json()).then(data => {
    return data;
});
window.onload = async () => {
    let someData = await promiseOfSomeData;
    createproductCards(someData);
};

function createproductCards(someData) {
    console.log(someData);
    someData.forEach(product => {
        document.getElementById("product-conatiner").innerHTML +=
        `<div class="col-12 col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="${product.image}" alt=""></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#productDescription">${product.title}</a>
            </h4>
            <h5>${product.price}</h5>
            <p class="card-text">${product.category}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
          </div>
        </div>
      </div>`
    });
}