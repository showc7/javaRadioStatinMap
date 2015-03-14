function Cell(options) {
	this.side = null;

	// in degrees
	this.leftUpCoordinate = options.leftUpCoordinate || 0;
	// in degrees
	this.rightDownCoordinate = options.rightDownCoordinate || 0;
	this.opacity = options.opacity || 0;
	this.height = 0;
}