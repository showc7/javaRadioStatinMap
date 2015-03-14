function Core() {
    APP.conf.numberOfCells =  APP.conf.maxStationSignalLength / APP.conf.cellSize;
}

// return number miters in pixel
Core.prototype.convertPixelsToMiters = function() {
	return -1;
};

Core.prototype.initialize = function() {
	
};
// return array of cells
Core.prototype.calculate = function(point) {
	//console.log(point);
	var resultCells = [];

	var width = APP.conf.maxStationSignalLength / APP.conf.cellSize * 2;
	var height = width;

	// station place in cells X
	var stationX =  width / 2;
	// station place in cells Y
	var stationY = height / 2;

	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			// distance in kilometers
			var radius = Math.sqrt(Math.pow(Math.abs(stationX - i),2) + Math.pow(Math.abs(stationY - j),2)) * APP.conf.cellSize;
			var mapCoordinate = this.getMapCoordinates(point,{x: i, y: j});
			APP.log(mapCoordinate);
			resultCells[i + j * width] = {};
			resultCells[i + j * width].opacity = this.calculateOpacity(radius);
			resultCells[i + j * width].leftUpCoordinate = new Point(mapCoordinate.latitude,mapCoordinate.longitude);
			mapCoordinate = this.getMapCoordinates(point,{x: i+1, y: j+1});
			resultCells[i + j * width].rightDownCoordinate = new Point(mapCoordinate.latitude,mapCoordinate.longitude);
		}
	}
	console.log(resultCells[8]);
	return [resultCells[8]];
};

Core.prototype.calculateOpacity = function(radius) {
	APP.log("radius : " + radius);
	return	(APP.conf.powerOfTransmitter +
			APP.conf.receivingAntennaGain +
			APP.conf.transmittingAntennaGain -
			(10 * Math.log10(Math.pow(4 * Math.PI * radius / APP.conf.waveLength,2)) +
			APP.conf.lossesInReceivingAntenna +
			APP.conf.loosesInTransmittingAntenna) +
			this.freeSpacePowerLoose(radius)) / APP.conf.powerOfTransmitter;
};

Core.prototype.getMapCoordinates = function(center, point) {
	var latitude = this.calculateLatitude(center, point);
	return {
		latitude: latitude,
		longitude: this.calculateLongitude(center, point, latitude)
	};
};

Core.prototype.calculateLatitude = function(center, point) {
	return center.x - Math.abs(APP.conf.numberOfCells - point.x) * APP.conf.cellSize / 1000 * APP.conf.kilometersInDegree;
};

Core.prototype.calculateLongitude = function(center, point, latitude) {
	return center.y - Math.abs(APP.conf.numberOfCells - point.y) * APP.conf.cellSize / 1000 * (1 / (111.320 * Math.cos(latitude)));
};

Core.prototype.freeSpacePowerLoose = function(radius) {
	return -0.1;
};

// point in pixels
// converts pixels to google point and calls requesthelper
Core.prototype.setMark = function(point) {
	
};