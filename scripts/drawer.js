function Drawer() {
    this.mapContainer = document.querySelector('#mapContainer');
}

Drawer.prototype.createMap = function() {
    var mapOptions = {
      center: new google.maps.LatLng(APP.conf.defaultMapLocation.x, APP.conf.defaultMapLocation.y),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapContainer, mapOptions);
};