// function runWithRandomErrorLargestRadius()
// {
//     var tester = require("./Triangulation.js");
//     var aError = 4;
//     var bError = 6;
//     var cError = 4;
//     var dError = 20.3269996643066;

//     var aAngle = 0.0;
//     var bAngle = 0.0;
//     var cAngle = 0.0;
//     var dAngle = 0.0;

//     var xChangeA = 0.0;
//     var xChangeB = 0.0;
//     var xChangeC = 0.0;
//     var xChangeD = 0.0;

//     var yChangeA = 0.0;
//     var yChangeB = 0.0;
//     var yChangeC = 0.0;
//     var yChangeD = 0.0;

//     var degreesPerMeterLatitude = tester.degreesPerMeterLatitude(41.7758578);
//     var degreesPerMeterLongitude = tester.degreesPerMeterLongitude(41.7758578);
//     var metersPerDegreeLatitude = tester.metersPerDegreeLatitude(41.7758578);
//     var metersPerDegreeLongitude = tester.metersPerDegreeLongitude(41.7758578);

//     var actualSourceValue = {
//         latitude: 41.77602048935562,
//         longitude: -72.6087337732315,
//         strength: 5000
//     };

//     var largestDistanceFromSource = 0.0;
//     var averageDistanceFromSource =0.0;
//     var counter = 0;
//     var averageLatValue = 0.0;
//     var averageLongValue = 0.0;
//     var averageStrengthValue = 0.0;

//     for(let i = 0; i < 10; i++)
//     {
//         aAngle = Math.random()*360;
//         xChangeA = aError*Math.cos(aAngle)*degreesPerMeterLatitude;
//         yChangeA = aError*Math.sin(aAngle)*degreesPerMeterLongitude;
//         for(let j = 0; j < 10; j++) 
//         {
//             bAngle = Math.random()*360;
//             xChangeB = bError*Math.cos(bAngle)*degreesPerMeterLatitude;
//             yChangeB = bError*Math.sin(bAngle)*degreesPerMeterLongitude;
//             for(let k = 0; k < 10; k++)
//             {
//                 cAngle = Math.random()*360;
//                 xChangeC = cError*Math.cos(cAngle)*degreesPerMeterLatitude;
//                 yChangeC = cError*Math.sin(cAngle)*degreesPerMeterLongitude;
//                 for(let l = 0; l < 10; l++)
//                 {
//                     counter++;
//                     dAngle = Math.random()*360;
//                     xChangeD = dError*Math.cos(dAngle)*degreesPerMeterLatitude;
//                     yChangeD = dError*Math.sin(dAngle)*degreesPerMeterLongitude;
//                     var pointA = {
//                         latitude: 41.7758578 + xChangeA,
//                         longitude: -72.6090535 + yChangeA,
//                         strength: (0.0425438582897186*114)
//                     };
//                     var pointB = {
//                         latitude: 41.7760296 + xChangeB,
//                         longitude: -72.6090069 + yChangeB,
//                         strength: (0.0853508710861206*114)
//                     };
//                     var pointC = { 
//                         latitude: 41.7761454 + xChangeC,
//                         longitude: -72.6091478 + yChangeC,
//                         strength: (0.0320175439119339*114)
//                     };
//                     var pointD = {
//                         latitude: 41.7762127 + xChangeD,
//                         longitude: -72.6094377 + yChangeD,
//                         strength: (0.0113157890737057*114)
//                     };
//                     var source = tester.calculate(pointA, pointB, pointC, pointD);
//                     //console.log("Latitude: " + source.latitude + "   Longitude: " + source.longitude + "   Strength " + source.strength);
//                     averageLatValue = averageLatValue + source.latitude;
//                     averageLongValue = averageLongValue + source.longitude;
//                     averageStrengthValue = averageStrengthValue + source.strength;
//                     var latitudeDistanceFoundToActual = Math.abs(actualSourceValue.latitude - source.latitude);
//                     var longitudeDistanceFoundToActual = Math.abs(actualSourceValue.longitude - source.longitude);
//                     var xDistanceFoundToActual = longitudeDistanceFoundToActual*metersPerDegreeLongitude;
//                     var yDistanceFoundToActual = latitudeDistanceFoundToActual*metersPerDegreeLatitude;

//                     var distanceFoundToActualMeters = Math.sqrt(xDistanceFoundToActual*xDistanceFoundToActual + yDistanceFoundToActual*yDistanceFoundToActual);
//                     if(largestDistanceFromSource < distanceFoundToActualMeters)
//                     {
//                         largestDistanceFromSource = distanceFoundToActualMeters;
//                     }
//                     averageDistanceFromSource = averageDistanceFromSource + distanceFoundToActualMeters;

//                 }
//             }
//         }
//     }
//     averageDistanceFromSource = averageDistanceFromSource/counter;
//     averageLatValue = averageLatValue/counter;
//     averageLongValue = averageLongValue/counter;
//     averageStrengthValue = averageStrengthValue/counter;
//     var distances = [largestDistanceFromSource, averageDistanceFromSource, averageLatValue, averageLongValue, averageStrengthValue];
//     return distances;
// }

// function runWithRandomErrorDifferentRadius()
// {
//     var tester = require("./Triangulation.js");
//     var chooser = require("./choose4.js");
//     var aError = 4;
//     var bError = 6;
//     var cError = 4;
//     var dError = 20.3269996643066;
//     var eError = 12

//     var aAngle = 0.0;
//     var bAngle = 0.0;
//     var cAngle = 0.0;
//     var dAngle = 0.0;
//     var eAngle = 0.0

//     var xChangeA = 0.0;
//     var xChangeB = 0.0;
//     var xChangeC = 0.0;
//     var xChangeD = 0.0;
//     var xChangeE = 0.0;

//     var yChangeA = 0.0;
//     var yChangeB = 0.0;
//     var yChangeC = 0.0;
//     var yChangeD = 0.0;
//     var yChangeE = 0.0;

//     var degreesPerMeterLatitude = tester.degreesPerMeterLatitude(41.7758578);
//     var degreesPerMeterLongitude = tester.degreesPerMeterLongitude(41.7758578);
//     var metersPerDegreeLatitude = tester.metersPerDegreeLatitude(41.7758578);
//     var metersPerDegreeLongitude = tester.metersPerDegreeLongitude(41.7758578);

//     var actualSourceValue = {
//         latitude: 41.77602048935562,
//         longitude: -72.6087337732315,
//         strength: 5000
//     };

//     var largestDistanceFromSource = 0.0;
//     var averageDistanceFromSource =0.0;
//     var counter = 0;
//     var averageLatValue = 0.0;
//     var averageLongValue = 0.0;
//     var averageStrengthValue = 0.0;

//     for(let i = 0; i < 4; i++)
//     {
//         var aRadius = Math.random()*aError;
//         aAngle = Math.random()*360;
//         xChangeA = aRadius*Math.cos(aAngle)*degreesPerMeterLatitude;
//         yChangeA = aRadius*Math.sin(aAngle)*degreesPerMeterLongitude;
//         for(let j = 0; j < 4; j++) 
//         {
//             var bRadius = Math.random()*bError;
//             bAngle = Math.random()*360;
//             xChangeB = bRadius*Math.cos(bAngle)*degreesPerMeterLatitude;
//             yChangeB = bRadius*Math.sin(bAngle)*degreesPerMeterLongitude;
//             for(let k = 0; k < 4; k++)
//             {
//                 var cRadius = Math.random()*cError;
//                 cAngle = Math.random()*360;
//                 xChangeC = cRadius*Math.cos(cAngle)*degreesPerMeterLatitude;
//                 yChangeC = cRadius*Math.sin(cAngle)*degreesPerMeterLongitude;
//                 for(let l = 0; l < 4; l++)
//                 {
//                     var dRadius = Math.random()*dError;
//                     dAngle = Math.random()*360;
//                     xChangeD = dRadius*Math.cos(dAngle)*degreesPerMeterLatitude;
//                     yChangeD = dRadius*Math.sin(dAngle)*degreesPerMeterLongitude;
//                     for(let m = 0; m < 4; m++)
//                     {
//                         counter++;
//                         var eRadius = Math.random()*eError;
//                         eAngle = Math.random()*360;
//                         xChangeE = dRadius*Math.cos(dAngle)*degreesPerMeterLatitude;
//                         yChangeE = eRadius*Math.sin(eAngle)*degreesPerMeterLongitude;
//                         var pointA = {
//                             latitude: 41.7758578 + xChangeA,
//                             longitude: -72.6090535 + yChangeA,
//                             strength: (0.0425438582897186*114),
//                             ID:6685
//                         };
//                         var pointB = {
//                             latitude: 41.7760296 + xChangeB,
//                             longitude: -72.6090069 + yChangeB,
//                             strength: (0.0853508710861206*114),
//                             ID:6686
//                         };
//                         var pointC = { 
//                             latitude: 41.7761454 + xChangeC,
//                             longitude: -72.6091478 + yChangeC,
//                             strength: (0.0320175439119339*114),
//                             ID:6687
//                         };
//                         var pointD = {
//                             latitude: 41.7762127 + xChangeD,
//                             longitude: -72.6094377 + yChangeD,
//                             strength: (0.0113157890737057*114),
//                             ID:6688
//                         };
//                         var pointE = { 
//                             latitude: 41.7762915 + xChangeE,
//                             longitude: -72.6091033 + yChangeE,
//                             strength: (2.7100000753998734),
//                             ID: 6689
//                         };
//                         var points = [pointA, pointB, pointC, pointD, pointE];
//                         var combinations = chooser.main(points);
//                         for(let i = 0; i < combinations.length; i++)
//                         {
//                             console.log("");
//                             console.log("For source " + i + ":");
//                             //arrayOut(solution[i]);
//                             var source = tester.calculate(combinations[i][0], combinations[i][1], combinations[i][2], combinations[i][3]);
//                             console.log("Latitude: " + source.latitude + "   Longitude: " + source.longitude + "   Strength " + source.strength);
//                         }
//                         // averageLatValue = averageLatValue + source.latitude;
//                         // averageLongValue = averageLongValue + source.longitude;
//                         // averageStrengthValue = averageStrengthValue + source.strength;
//                         var latitudeDistanceFoundToActual = Math.abs(actualSourceValue.latitude - source.latitude);
//                         var longitudeDistanceFoundToActual = Math.abs(actualSourceValue.longitude - source.longitude);
//                         var xDistanceFoundToActual = longitudeDistanceFoundToActual*metersPerDegreeLongitude;
//                         var yDistanceFoundToActual = latitudeDistanceFoundToActual*metersPerDegreeLatitude;

//                         var distanceFoundToActualMeters = Math.sqrt(xDistanceFoundToActual*xDistanceFoundToActual + yDistanceFoundToActual*yDistanceFoundToActual);
//                         if(largestDistanceFromSource < distanceFoundToActualMeters)
//                         {
//                             largestDistanceFromSource = distanceFoundToActualMeters;
//                         }
//                         // averageDistanceFromSource = averageDistanceFromSource + distanceFoundToActualMeters;
//                     }
//                 }
//             }
//         }
//     }
//     averageDistanceFromSource = averageDistanceFromSource/counter;
//     averageLatValue = averageLatValue/counter;
//     averageLongValue = averageLongValue/counter;
//     averageStrengthValue = averageStrengthValue/counter;
//     var distances = [largestDistanceFromSource, averageDistanceFromSource, averageLatValue, averageLongValue, averageStrengthValue];
//     return distances;
// }

function runWithRandomError()
{
    var tester = require("./Triangulation.js");
    var chooser = require("./choose4.js");

    var errors = [8, 12, 6, 6, 6, 4, 8, 6, 8.82199954986572, 4, 4, 4, 4, 6, 8];
    
    var angles = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    var radius = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    var xChange = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    var yChange = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];


}



// function begin()
// {
//     // var tester = require("./Triangulation.js");
//     // var chooser = require("./choose4.js").
//     // var actualSourceValue = {
//     //     latitude: 41.77602048935562,
//     //     longitude: -72.6087337732315,
//     //     strength: 5000
//     // };
//     //distancesLargestRad = runWithRandomErrorLargestRadius();
//     distancesDifferentRad = runWithRandomErrorDifferentRadius();

//     // var deltaXDistanceLargestRad = (Math.abs(distancesLargestRad[2] - actualSourceValue.latitude))*tester.metersPerDegreeLatitude(41.7758578);
//     // var deltaYDistanceLargestRad = (Math.abs(distancesLargestRad[3] - actualSourceValue.longitude))*tester.metersPerDegreeLongitude(41.7758578);
//     // var deltaStrengthLargestRad = Math.abs(distancesLargestRad[4] - actualSourceValue.strength);

//     // var deltaXDistanceDifferentRad = (Math.abs(distancesDifferentRad[2] - actualSourceValue.latitude))*tester.metersPerDegreeLatitude(41.7758578);
//     // var deltaYDistanceDifferentRad = (Math.abs(distancesDifferentRad[3] - actualSourceValue.longitude))*tester.metersPerDegreeLongitude(41.7758578);
//     // var deltaStrengthDifferentRad = Math.abs(distancesDifferentRad[4] - actualSourceValue.strength);

//     // console.log("Largest Distance: " + distancesLargestRad[0] + "   Average Distance: " + distancesLargestRad[1]);
//     // console.log("");
//     // console.log("Average Lat: " + distancesLargestRad[2] + "  Average Long: " + distancesLargestRad[3] + "   Average Strength: " + distancesLargestRad[4]);
//     // console.log("");
//     // console.log("Largest Distance: " + distancesDifferentRad[0] + "  Average Distance: " + distancesDifferentRad[1])
//     // console.log("");
//     // console.log("Largest Lat: " + distancesDifferentRad[2] + "  Average Long: " + distancesDifferentRad[3] + "   Average Strength: " + distancesDifferentRad[4]);

//     // console.log("");
//     // console.log(deltaXDistanceLargestRad + "    " + deltaYDistanceLargestRad + "    " + deltaStrengthLargestRad);
//     // console.log("");
//     // console.log(deltaXDistanceDifferentRad + "    " + deltaYDistanceDifferentRad + "   " + deltaStrengthDifferentRad);
// }
// begin();


function begin()
{
    var tester = require("./Triangulation.js");
    var chooser = require("./choose4.js");
    var pointA = {
        latitude: 41.7758888,
        longitude: -72.6091428,
        strength: (3.6299999803304632),
        ID:6690
    };
    var pointB = {
        latitude: 41.7760243,
        longitude: -72.609071,
        strength: (2.809999991208315),
        ID:6691
    };
    var pointC = { 
        latitude: 41.7761539,
        longitude: -72.6090659,
        strength: (1.9400001503527164),
        ID:6692
    };
    var pointD = {
        latitude: 41.7762988,
        longitude: -72.609277,
        strength: (1.1200000550597904),
        ID:6693
    };
    var pointE = { 
        latitude: 41.7760993,
        longitude: -72.6092077,
        strength: (1.8700000606477236),
        ID: 6694
    };
    var pointF = {
        latitude: 41.7763473,
        longitude: -72.6089727,
        strength: 1.2699999287724486,
        ID:6695
    };
    var pointG = {
        latitude: 41.7764043,
        longitude: -72.6086203,
        strength: 1.2000000514090088,
        ID:6696
    };
    var pointH = {
        latitude: 41.7762642,
        longitude: -72.6084333,
        strength: 1.6499999910593088,
        ID:6697
    };
    var pointI = {
        latitude: 41.7763245,
        longitude: -72.6082486,
        strength: 1.2600000221282244,
        ID:6698
    };
    var pointJ = {
        latitude: 41.7763801,
        longitude: -72.6084853,
        strength: 1.2399999964982231,
        ID:6699
    };
    var pointK = {
        latitude: 41.7764719,
        longitude: -72.6087911,
        strength: 1.0100000202655797,
        ID:6700
    };
    var pointL = {
        latitude: 41.7765069,
        longitude: -72.6092944,
        strength: 0.7519999975338579,
        ID:6701
    };
    var pointM = {
        latitude: 41.7762597,
        longitude: -72.6091637,
        strength: 1.350000031292442,
        ID:6702
    };
    var pointN = {
        latitude: 41.7760631,
        longitude: -72.6090379,
        strength: 2.6199999600648907,
        ID:6703
    };
    var pointO = {
        latitude: 41.7759571,
        longitude: -72.6090822,
        strength: 3.390000097453589,
        ID:6704
    };
    var points = [pointJ, pointK, pointM, pointO];
    //var points = [pointA, pointB, pointC, pointD, pointE, pointF, pointG, pointH, pointI, pointJ, pointK,pointL, pointM, pointN, pointO];

    var combinations = chooser.main(points);
    var latAverage = 0.0;
    var longAverage = 0.0;
    var strengthAverage = 0.0;
    var counter = 0;
    for(let i = 0; i < combinations.length; i++)
    {
        counter++;
        console.log("");
        console.log("For source " + i + ":");
        chooser.arrayOut(combinations[i]);
        var source = tester.calculate(combinations[i][0], combinations[i][1], combinations[i][2], combinations[i][3]);
        if(source.strength == null)
        {
            counter--;
            continue;
        }
        latAverage = latAverage + source.latitude;
        longAverage = longAverage + source.longitude;
        strengthAverage = strengthAverage + source.strength;
        console.log("Latitude: " + source.latitude + "   Longitude: " + source.longitude + "   Strength " + source.strength);
    }
    console.log("Latitude: " + latAverage/counter + "   Longitude: " + longAverage/counter + "   Strength " + strengthAverage/counter);
}



begin();