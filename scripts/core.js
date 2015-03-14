function Core() {
	this.markerScreenPoint;
}

// return number miters in pixel
Core.prototype.convertPixelsToMiters = function() {
	return -1;
};

Core.prototype.initialize = function() {
	
};
// return array of cells
Core.prototype.calculate = function(point) {
	console.log(point);
	var resultCells = [];

	// station place in cells X
	var stationX = 4;
	// station place in cells Y
	var stationY = 4;

	// distance between two points
	var Radius = 0;

	var width = APP.conf.maxStationSignalLength / APP.conf.cellSize + 4;
	var heigth = width;

	for(var i = 0; i < width; i++) {
		for(var j = 0; j < heigth; j++) {
			var radius = Math.sqrt(Math.pow(Math.abs(stationX - i),2) + Math.pow(Math.abs(stationY - j),2));
			resultCells[i + j * width].opacity = this.calculateOpacity(radius);

		}
	}

	return resultCells;
};

Core.prototype.calculateOpacity = function(radius) {
	return	APP.conf.powerOfTransmitter +
			APP.conf.receivingAntennaGain +
			APP.conf.transmittingAntennaGain -
			(Math.pow(4 * Math.PI * radius / APP.conf.waveLength,2) +
			APP.conf.lossesInReceivingAntenna +
			APP.conf.loosesInTransmittingAntenna) +
			freeSpacePowerLoose(radius) / APP.conf.transmittingAntennaGain;
};

Core.prototype.freeSpacePowerLoose = function(radius) {
	return 0.1;
};

// point in pixels
// converts pixels to google point and calls requesthelper
Core.prototype.setMark = function(point) {
	
};