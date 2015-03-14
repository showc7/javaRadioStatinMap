APP.initialize = function (event) {
    // create Core and Drawer objects
    this.core = new Core();
    this.drawer = new Drawer();
    // draw map
    this.drawer.createMap();
    // add mouse click event
}

APP.mouseClick = function (event) {
    // call Core calculate
    // drawer (calculated data)
}

window.addEventListener('load', function (event) {
    APP.initialize();
});
