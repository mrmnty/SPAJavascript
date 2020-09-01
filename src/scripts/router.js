'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var routeArray = this.routes;
        (function(scope, routeArray) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, routeArray);
            });
        })(this, routeArray);
        this.hasChanged(this, routeArray);
    },
    hasChanged: function(scope, routeArray){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = routeArray.length; i < length; i++) {
                var route = routeArray[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = routeArray.length; i < length; i++) {
                var route = routeArray[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function(scope) { 
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    if(htmlName === 'home.html') {
                        fetch("./model/products.json").then(r=>r.json()).then(data => {
                            data.forEach(product => {
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
                        });
                    }  
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);
    }
};