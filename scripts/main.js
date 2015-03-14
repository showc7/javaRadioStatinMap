APP.initialize = function (event) {
    // create Core and Drawer objects
    this.core = new Core();
    this.drawer = new Drawer();
    // draw map
    this.drawer.createMap();
    // add mouse click event
    this.drawer.createEventListener(APP.mouseClick.bind(APP));
}

APP.mouseClick = function (event) {
    this.drawer.drawCells(this.core.calculate(new Point(event.latLng.D, event.latLng.k)));
}

window.addEventListener('load', function (event) {
    APP.initialize();
});
