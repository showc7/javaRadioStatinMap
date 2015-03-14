function Drawer() {
    this.mapContainer = document.querySelector('#mapContainer');
    this.markers = [];
}

Drawer.prototype.createMap = function () {
    var mapOptions = {
        center: new google.maps.LatLng(APP.conf.defaultMapLocation.x, APP.conf.defaultMapLocation.y),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        draggableCursor: 'default'
    };
    this.map = new google.maps.Map(this.mapContainer, mapOptions);
};

Drawer.prototype.createEventListener = function (event, callback) {
    google.maps.event.addListener(this.map, event, callback);
};

Drawer.prototype.drawCells = function (cells) {
    var self = this;
    cells = [new Cell({leftUpCoordinate: new Point(64.32087157990324, 42.5390625), rightDownCoordinate: new Point(47.040182144806664, 136.0546875), opacity: 0.35}),
             new Cell({leftUpCoordinate: new Point(61.77312286453148, -105.46875), rightDownCoordinate: new Point(25.16517336866393, 18.984375), opacity: 0.35})];
    cells.forEach(function (item, index) {
        if (item.opacity && item.leftUpCoordinate && item.rightDownCoordinate) {
            self.markers.push(
                new google.maps.Rectangle({
                    fillColor: '#000000',
                    fillOpacity: item.opacity,
                    strokeWeight: 2,
                    strokeColor: '#FFFFFF',
                    map: self.map,
                    bounds: new google.maps.LatLngBounds(
                        new google.maps.LatLng(item.leftUpCoordinate.x, item.leftUpCoordinate.y),
                        new google.maps.LatLng(item.rightDownCoordinate.x, item.rightDownCoordinate.y))
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