function Drawer() {
    this.mapContainer = document.querySelector('#mapContainer');
}

Drawer.prototype.createMap = function () {
    var mapOptions = {
      center: new google.maps.LatLng(APP.conf.defaultMapLocation.x, APP.conf.defaultMapLocation.y),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapContainer, mapOptions);
};

Drawer.prototype.createEventListener = function (callback) {
    google.maps.event.addListener(this.map, 'click', callback);
};

Drawer.prototype.drawCells = function (cells) {
    var rectangle,
        rectOptions = {
          fillColor: '#00FFFF',
          fillOpacity: 0.5,
          strokeWeight: 0,
          map: APP.drawer.map
        };
    cells.forEach(function (item, index) {
        rectangle = new google.maps.Rectangle();
        rectOptions.fillOpacity = item.opacity;
        rectOptions.bounds = new google.maps.LatLngBounds(item.leftUpCoordinate, item.leftUpCoordinate);
        rectangle.setOptions(rectOptions);
    });
};