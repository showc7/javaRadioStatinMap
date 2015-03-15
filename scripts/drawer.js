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

Drawer.prototype.drawCells = function (cells, event, callback) {
    var self = this;
   cells.forEach(function (item, index) {
        if (item.opacity && item.leftUpCoordinate && item.rightDownCoordinate) {
            self.markers.push(
                new google.maps.Rectangle({
                    fillColor: '#000000',
                    fillOpacity: item.opacity,
                    strokeWeight: 0,
                    map: self.map,
                    bounds: new google.maps.LatLngBounds(
                        new google.maps.LatLng(item.leftUpCoordinate.x, item.leftUpCoordinate.y),
                        new google.maps.LatLng(item.rightDownCoordinate.x, item.rightDownCoordinate.y))
            }));

            // markers at the top-left and bot-down DEBUG
            self.markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(item.leftUpCoordinate.x, item.leftUpCoordinate.y),
                title:"Left",
                map: self.map
            }));

            self.markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(item.rightDownCoordinate.x, item.rightDownCoordinate.y),
                title:"Right",
                map: self.map
            }));

            google.maps.event.addListener(self.markers[self.markers.length - 1], 'click', callback);
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