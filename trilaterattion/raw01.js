var trilateration = require('./index.js');
 
# Adding three beacons
trilateration.addBeacon(0, trilateration.vector(2, 4));
trilateration.addBeacon(1, trilateration.vector(5.5, 13));
trilateration.addBeacon(2, trilateration.vector(11.5, 2));
 
# Setting the beacons distances
trilateration.setDistance(0, 5.7);
trilateration.setDistance(1, 6.8);
trilateration.setDistance(2, 6.4);
 
# Start Calculation
var pos = trilateration.calculatePosition();
 
console.log("X: " + pos.x + "; Y: " + pos.y); // X: 7; Y: 6.5
