function Core() {
    APP.conf.numberOfCells =  APP.conf.maxStationSignalLength / APP.conf.cellSize * 2;
}

// return array of cells
Core.prototype.calculate = function(point) {
	//console.log(point);
	var resultCells = [];

	// map width and height in cells
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
			// coordiante of current cell
			var mapCoordinate = this.getMapCoordinates(point,{x: i, y: j});
			console.log(mapCoordinate);
			resultCells[i + j * width] = {};
			resultCells[i + j * width].opacity = this.calculateOpacity(radius);
			resultCells[i + j * width].opacity = resultCells[i + j * width].opacity < 0 ? 0 : resultCells[i + j * width].opacity;
			//resultCells[i + j * width].rightDownCoordinate = new Point(mapCoordinate.latitude,mapCoordinate.longitude);
			//resultCells[i + j * width].rightDownCoordinate = new Point(mapCoordinate.longitude,mapCoordinate.latitude);
			resultCells[i + j * width].leftUpCoordinate = new Point(mapCoordinate.longitude,mapCoordinate.latitude);
			
			// coordinate of next cell
			mapCoordinate = this.getMapCoordinates(point,{x: i+1, y: j+1});
			//resultCells[i + j * width].leftUpCoordinate = new Point(mapCoordinate.latitude,mapCoordinate.longitude);
			//resultCells[i + j * width].leftUpCoordinate = new Point(mapCoordinate.longitude,mapCoordinate.latitude);
			resultCells[i + j * width].rightDownCoordinate = new Point(mapCoordinate.longitude,mapCoordinate.latitude);
		}
	}
	console.log(resultCells);
	return resultCells;//.slice(1, 2);
};

Core.prototype.calculateOpacity = function(radius) {
	console.log("radius : " + radius);
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
	//return center.x - Math.abs(APP.conf.numberOfCells / 2 - point.x) * APP.conf.cellSize / 1000 * APP.conf.kilometersInDegree;
	return center.x - (APP.conf.numberOfCells / 2 - point.x) * APP.conf.cellSize / 1000 * APP.conf.kilometersInDegree;
};

Core.prototype.calculateLongitude = function(center, point, latitude) {
	//return center.y - Math.abs(APP.conf.numberOfCells / 2 - point.y) * APP.conf.cellSize / 1000 * (1 / (111.320/* * Math.cos(latitude)*/));
	return center.y - (APP.conf.numberOfCells / 2 - point.y) * APP.conf.cellSize / 1000 * (1 / (111.320/* * Math.cos(latitude)*/));
};

Core.prototype.freeSpacePowerLoose = function(radius) {
	return -0.1;
};

// point in pixels
// converts pixels to google point and calls requesthelper
Core.prototype.setMark = function(point) {
	
};