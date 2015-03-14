function Drawer() {
    this.mapContainer = document.querySelector('#mapContainer');
    this.markers = [];
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
    var self = this;
    cells.forEach(function (item, index) {
        if (item.opacity && item.leftUpCoordinate && item.rightDownCoordinate) {
            self.markers.push(
                new google.maps.Rectangle({
                    fillColor: '#FF0000',
                    fillOpacity: item.opacity,
                    strokeWeight: 0,
                    map: self.map,
                    bounds: new google.maps.LatLngBounds(
                        new google.maps.LatLng(item.leftUpCoordinate.y, item.leftUpCoordinate.x),
                        new google.maps.LatLng(item.rightDownCoordinate.y, item.rightDownCoordinate.x))
            }));
        }
    });
};

Drawer.prototype.clearMarkers = function () {
    this.markers.forEach(function (item, index) {
        item.setMap(null);
    });
    this.markers.length = 0;
};

Drawer.prototype.drawMarker = function(event) {
    this.markers.push(new google.maps.Marker({
        position: event.latLng,
        title:"Radio Station",
        map: APP.drawer.map
    }));
};