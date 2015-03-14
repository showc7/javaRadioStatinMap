this.APP = {};
APP.conf = {
    defaultMapLocation: new Point(53.902, 27.556),

    // size of visibility square in mitres
    cellSize: 1000000,

    // max station signal length in miters
    maxStationSignalLength: 5000000,

    // powero f transmitter in watts
    powerOfTransmitter: 400,

    // gain of the receiving antenna
    receivingAntennaGain: 7,

    // gain of the transmitting antenna
    transmittingAntennaGain: 6,

    // looses in receiving antenna
    lossesInReceivingAntenna: 5,

    // looses in transmitting antenna
    loosesInTransmittingAntenna: 0,

    // station wave length
    waveLength: 0.353,

    kilometersInDegree: 1 / 110.54,

    disableLogs: true
};