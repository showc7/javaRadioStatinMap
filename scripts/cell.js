function Cell(options) {
	this.side = null;

	// in degrees
	this.leftUpCoordinate = options.x || APP.conf.defaultMapLocation.x;
	// in degrees
	this.rightDownCoordinate = options.y || APP.conf.defaultMapLocation.y;
	this.opacity = options.opacity || '0';
	this.height = 0;
}

Cell.prototype.distance = function(cell) {
    
};