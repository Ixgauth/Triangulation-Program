var distanceBetweenVectors = function (firstVector, secondVector)
{
	if(firstVector.x == secondVector.x && firstVector.y == secondVector.y)
	{
		return 0;
	}
	if (firstVector.x == secondVector.x) 
	{
		return Math.abs(firstVector.y - secondVector.y);
	}
	if (firstVector.y == secondVector.y)
	{
		 return Math.abs(firstVector.x - secondVector.x);
	}
	return Math.sqrt(
				Math.pow(Math.abs(firstVector.x-secondVector.x),2) + 
				Math.pow(Math.abs(firstVector.y-secondVector.y),2));
}

function vectorBetweenPoints(doseRateRatio, firstVector, secondVector)
{
	var betweenPoint = {
		x: firstVector.x + (secondVector.x-firstVector.x) * doseRateRatio/(1+doseRateRatio),
		y: firstVector.y + (secondVector.y-firstVector.y) * doseRateRatio/(1+doseRateRatio)
	};
	return betweenPoint;
}

function vectorOutside(doseRateRatio, firstVector, secondVector)
{
	var distanceBetweenVects = distanceBetweenVectors(firstVector,secondVector);
	var distanceX = Math.abs(firstVector.x-secondVector.x);
	var distanceY = Math.abs(firstVector.y-secondVector.y);
	var totalDistanceOutsideVectorToCircleEdge = 0;
	if (doseRateRatio > 1) 
	{
			totalDistanceOutsideVectorToCircleEdge = Math.abs(doseRateRatio * distanceBetweenVects/(doseRateRatio-1));
	}
	else 
	{
			totalDistanceOutsideVectorToCircleEdge = Math.abs(distanceBetweenVects/(1-doseRateRatio));
	}
	if (doseRateRatio > 1) 
	{
		if(firstVector.x < secondVector.x) 
		{
			xCoordinate = firstVector.x + distanceX * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		} 
		else
		{
			xCoordinate = firstVector.x - distanceX * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		}
		
		if(firstVector.y < secondVector.y) 
		{
			yCoordinate = firstVector.y + distanceY * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		} 
		else 
		{
			yCoordinate = firstVector.y - distanceY * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		}
	} 
	else 
	{
		if(firstVector.x < secondVector.x) 
		{
			xCoordinate = secondVector.x - distanceX * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		} 
		else 
		{
			xCoordinate = secondVector.x + distanceX * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		}
		
		if(firstVector.y < secondVector.y) 
		{
			yCoordinate = secondVector.y - distanceY * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		} 
		else 
		{
			yCoordinate = secondVector.y + distanceY * totalDistanceOutsideVectorToCircleEdge/distanceBetweenVects;
		}
	}	
	var outsidePoints = {
		x:xCoordinate,
		y:yCoordinate
	};
	return outsidePoints;
}

function circleCircleIntersection (circle1, circle2)
{
	var intersections = [{
		x: null,
		y: null,
	},
	{
		x: null,
		y: null
	}];
	var vectorC1cC2c = {
		x: circle2.x - circle1.x,
		y: circle2.y - circle1.y
	};
	
	distanceC1cC2c = distanceBetweenVectors(circle1, circle2);

	if(distanceC1cC2c == 0)
	{
		return intersections;
	}

	var versorC1cC2c = {
		x: vectorC1cC2c.x/distanceC1cC2c,
		y: vectorC1cC2c.y/distanceC1cC2c
	};
	var distanceC1cRadicalLine = (square(distanceC1cC2c) + square(circle1.radius) - square(circle2.radius)) / (2 * distanceC1cC2c);
	var distanceC2cRadicalLine = distanceC1cC2c - distanceC1cRadicalLine;
	var radicalPoint = {
		x: circle1.x + versorC1cC2c.x*distanceC1cRadicalLine,
		y: circle1.y + versorC1cC2c.y*distanceC1cRadicalLine
	};

	var versorRadicalLine = {
		x: -versorC1cC2c.y,
		y: versorC1cC2c.x
	};

	var sqH = square(circle1.radius) - square(distanceC1cRadicalLine);

	if (sqH > 0)
	{
		var distanceRadicalPointIntersectionPoints = Math.sqrt(sqH);
		intersections[0].x = radicalPoint.x + (versorRadicalLine.x * distanceRadicalPointIntersectionPoints);
		intersections[0].y = radicalPoint.y + (versorRadicalLine.y * distanceRadicalPointIntersectionPoints);
		intersections[1].x = radicalPoint.x + (versorRadicalLine.x * -distanceRadicalPointIntersectionPoints);
		intersections[1].y = radicalPoint.y + (versorRadicalLine.y * -distanceRadicalPointIntersectionPoints);
	}
	else
	{
		var external = distanceC1cC2c > Math.max(circle1.radius, circle2.radius);
		if (sqH == 0)
		{
			intersections[0].x = radicalPoint.x;
			intersections[0].y = radicalPoint.y;
		}
	}

	return intersections;
}

function makeCircle(firstVector,secondVector, vectorRatio)
{
	var vectInside = vectorBetweenPoints(vectorRatio, firstVector,secondVector);
	var vectOutside = vectorOutside(vectorRatio, firstVector,secondVector);

	var vectCenter = {
		x: (vectInside.x + vectOutside.x)/2,
		y: (vectInside.y + vectOutside.y)/2
	};

	var vectRadius = distanceBetweenVectors(vectInside,vectOutside)/2;
	var circle = {
		x: vectCenter.x,
		y: vectCenter.y,
		radius: vectRadius
	};
	return circle;
}

function calculateCenterLine(vectA, vectB)
{
	var midpointX = .5*(vectA.x + vectB.x);
	var midpointY = .5*(vectA.y + vectB.y);

	var originalSlope = (vectB.y - vectA.y)/(vectB.x - vectA.x);

	var newSlope = -(1/originalSlope);

	var intercept = midpointY - midpointX*newSlope;

	var line = [newSlope, intercept];

	return line;
}

function calculateCircleLine(c1, slope, intercept)
{
	var a = slope*slope + 1;
	var b = 2*(slope*intercept - slope*c1.y - c1.x);
	var c = square(c1.y) - square(c1.radius) + square(c1.x) - 2*intercept*c1.y + square(intercept);

	var x1 = (-b + Math.sqrt(square(b)-4*a*c))/(2*a);
	var x2 = (-b - Math.sqrt(square(b)-4*a*c))/(2*a);
	var y1 = slope*x1 + intercept;
	var y2 = slope*x2 + intercept;

	var intersections = [{
		x:x1,
		y:y1
	},
	{
		x:x2,
		y:y2
	}];
	return intersections;
}

function calculateLineLine(slope1, slope2, intercept1, intercept2)
{
	var intersectionX = (intercept2 - intercept1)/(slope1 - slope2)
	var intersectionY = slope1*intersectionX + intercept1
	var intersectionPoint = {
		x:intersectionX,
		y:intersectionY
	};
	return intersectionPoint;
}

function choosePoint(ABCIntersections, BCDIntersections)
{
	var sumOfIntersectionDistances = [[],[]];
	var counterOne = 0;
	var counterTwo = 0;
	for (i = 0; i< BCDIntersections.length; i++)
	{
		for(j = 0; j < ABCIntersections.length; j++)
		{
			sumOfIntersectionDistances[i][j] = (Math.abs(ABCIntersections[j].x - BCDIntersections[i].x) + 
				Math.abs(ABCIntersections[j].y - BCDIntersections[i].y));
		}
	}
	for (i = 0; i< BCDIntersections.length; i++)
	{
		for(j = 0; j < ABCIntersections.length; j++)
		{
			if(sumOfIntersectionDistances[counterOne][counterTwo] > sumOfIntersectionDistances[i][j])
			{
				counterOne = i;
				counterTwo = j;
			}
		}
	}

	var finalCoordinates = {
				x: (BCDIntersections[counterOne].x + ABCIntersections[counterTwo].x)/2,
				y: (BCDIntersections[counterOne].y + ABCIntersections[counterTwo].y)/2
			};

	return finalCoordinates;
}

function calculateStrength(startVector, endVector)
{
	var distanceAtoIntersection = distanceBetweenVectors(startVector, endVector);

	var sourceDoseRate = distanceAtoIntersection*distanceAtoIntersection*startVector.strength;

	return sourceDoseRate;
}

function calculateTwoSame(xyA, xyB, xyC, xyD)
{
	var ratioAtoSourceVsBtoSource = Math.sqrt(xyB.strength/xyA.strength);
	var ratioAtoSourceVsCtoSource = Math.sqrt(xyC.strength/xyA.strength);
	var ratioBtoSourceVsCtoSource = Math.sqrt(xyC.strength/xyB.strength);
	var ratioCtoSourceVsDtoSource = Math.sqrt(xyD.strength/xyC.strength);
	var ySame = false;
	if(ratioAtoSourceVsBtoSource == 1)
	{
		if(xyA.y == xyB.y)
		{
			ySame = true;
		}
		var abVectorLine = calculateCenterLine(xyA,xyB);
		var abVectorSlope = abVectorLine[0];
		var abVectorIntercept = abVectorLine[1];
		if(ratioAtoSourceVsCtoSource == 1)
		{
			if(xyA.y == xyC.y)
			{
				if(ySame == true)
				{
					return null;
				}
				var sourcePoint = ThreeSameAndYSameLine(abVectorSlope,abVectorIntercept, (xyA.x+xyC.x)/2);
				return sourcePoint;
			}
			var acVectorLine = calculateCenterLine(xyA,xyC);
			var acVectorSlope = acVectorLine[0];
			var acVectorIntercept = acVectorLine[1];
			if(ySame == true)
			{
				var sourcePoint = ThreeSameAndYSameLine(acVectorSlope, acVectorIntercept, (xyA.x+xyB.x)/2);
				return sourcePoint;
			}
			var sourcePoint = calculateLineLine(abVectorSlope, acVectorSlope, abVectorIntercept,acVectorIntercept);
			return sourcePoint;
		}
		else if(ratioCtoSourceVsDtoSource == 1)
		{
			if(xyC.y == xyD.y)
			{
				if(ySame == true)
				{
					return null;
				}
				var sourcePoint = ThreeSameAndYSameLine(abVectorSlope,abVectorIntercept, (xyC.x+xyD.x)/2);
				return sourcePoint;
			}
			var cdVectorLine = calculateCenterLine(xyC,xyD);
			var cdVectorSlope = cdVectorLine[0];
			var cdVectorIntercept = cdVectorLine[1];
			if(ySame == true)
			{
				var sourcePoint = ThreeSameAndYSameLine(cdVectorSlope, cdVectorIntercept, (xyA.x+xyB.x)/2);
				return sourcePoint;
			}
			var sourcePoint = calculateLineLine(abVectorSlope, cdVectorSlope, abVectorIntercept,cdVectorIntercept);
			return sourcePoint;
		}
		var acCircle = makeCircle(xyA, xyC, ratioAtoSourceVsCtoSource);
		var bcCircle = makeCircle(xyB, xyC, ratioBtoSourceVsCtoSource);
		var cdCircle = makeCircle(xyC, xyD, ratioCtoSourceVsDtoSource);

		if(ySame == false)
		{
			var ABCIntersections = calculateCircleLine(acCircle, abVectorSlope, abVectorIntercept);
		}
		else
		{
			var ABCIntersections = twoSameAndYSameCircle(acCircle, (xyA.x + xyB.x)/2);
		}
		var BCDIntersections = circleCircleIntersection(bcCircle, cdCircle);

		var sourcePoint = choosePoint(ABCIntersections,BCDIntersections);
		return sourcePoint;

	}
	else if(ratioAtoSourceVsCtoSource == 1)
	{
		if(xyA.y == xyC.y)
		{
			ySame = true;
		}
		var acVectorLine = calculateCenterLine(xyA,xyC);
		var acVectorSlope = acVectorLine[0];
		var acVectorIntercept = acVectorLine[1];	
		if(ratioBtoSourceVsCtoSource == 1)
		{
			if(xyB.y == xyC.y)
			{
				if(ySame == true)
				{
					return null;
				}
				var sourcePoint = ThreeSameAndYSameLine(acVectorSlope,acVectorIntercept, (xyB.x+xyC.x)/2);
				return sourcePoint;
			}
			var bcVectorLine = calculateCenterLine(xyB,xyC);
			var bcVectorSlope = bcVectorLine[0];
			var bcVectorIntercept = bcVectorLine[1];
			if(ySame == true)
			{
				var sourcePoint = ThreeSameAndYSameLine(bcVectorSlope, bcVectorIntercept, (xyA.x+xyC.x)/2);
				return sourcePoint;
			}
			var sourcePoint = calculateLineLine(acVectorSlope, bcVectorSlope, acVectorIntercept,bcVectorIntercept);
			return sourcePoint;
		}
		else if(ratioCtoSourceVsDtoSource == 1)
		{
			if(xyC.y == xyD.y)
			{
				if(ySame == true)
				{
					return null;
				}
				var sourcePoint = ThreeSameAndYSameLine(acVectorSlope,acVectorIntercept, (xyC.x+xyD.x)/2);
				return sourcePoint;
			}
			var cdVectorLine = calculateCenterLine(xyC,xyD);
			var cdVectorSlope = cdVectorLine[0];
			var cdVectorIntercept = cdVectorLine[1];
			if(ySame == true)
			{
				var sourcePoint = ThreeSameAndYSameLine(cdVectorSlope, cdVectorIntercept, (xyA.x+xyC.x)/2);
				return sourcePoint;
			}
			var sourcePoint = calculateLineLine(acVectorSlope, cdVectorSlope, acVectorIntercept,cdVectorIntercept);
			return sourcePoint;
		}
		var abCircle = makeCircle(xyA, xyB, ratioAtoSourceVsBtoSource);
		var bcCircle = makeCircle(xyB, xyC, ratioBtoSourceVsCtoSource);
		var cdCircle = makeCircle(xyC, xyD, ratioCtoSourceVsDtoSource);

		if(ySame == false)
		{
			var ABCIntersections = calculateCircleLine(abCircle, acVectorSlope, acVectorIntercept);
		}
		else
		{
			var ABCIntersections = twoSameAndYSameCircle(abCircle, (xyA.x + xyC.x)/2);
		}
		var BCDIntersections = circleCircleIntersection(bcCircle, cdCircle);

		var sourcePoint = choosePoint(ABCIntersections,BCDIntersections);
			
		return sourcePoint;
	}
	else if(ratioBtoSourceVsCtoSource == 1)
	{
		if(xyB.y == xyC.y)
		{
			ySame = true;
		}
		var bcVectorLine = calculateCenterLine(xyB,xyC);
		var bcVectorSlope = bcVectorLine[0];
		var bcVectorIntercept = bcVectorLine[1];
		if(ratioCtoSourceVsDtoSource == 1)
		{
			if(xyC.y == xyD.y)
			{
				if(ySame == true)
				{
					return null;
				}
				var sourcePoint = ThreeSameAndYSameLine(bcVectorSlope,bcVectorIntercept, (xyC.x+xyD.x)/2);
				return sourcePoint;
			}
			var cdVectorLine = calculateCenterLine(xyC,xyD);
			var cdVectorSlope = cdVectorLine[0];
			var cdVectorIntercept = cdVectorLine[1];
			if(ySame == true)
			{
				var sourcePoint = ThreeSameAndYSameLine(cdVectorSlope, cdVectorIntercept, (xyB.x+xyC.x)/2);
				return sourcePoint;
			}
			var sourcePoint = calculateLineLine(bcVectorSlope, cdVectorSlope, bcVectorIntercept,cdVectorIntercept);
			return sourcePoint;
		}
		var abCircle = makeCircle(xyA, xyB, ratioAtoSourceVsBtoSource);
		var acCircle = makeCircle(xyA, xyC, ratioAtoSourceVsCtoSource);
		var cdCircle = makeCircle(xyC, xyD, ratioCtoSourceVsDtoSource);

		if(ySame == false)
		{
			var BCDIntersections = calculateCircleLine(cdCircle, bcVectorSlope, bcVectorIntercept);
			var ABCIntersections = calculateCircleLine(abCircle, bcVectorSlope, bcVectorIntercept);
		}
		else
		{
			var BCDIntersections = twoSameAndYSameCircle(cdCircle, (xyB.x + xyC.x)/2);
			var ABCIntersections = twoSameAndYSameCircle(abCircle, (xyB.x + xyC.x)/2);
		}

		var sourcePoint = choosePoint(ABCIntersections,BCDIntersections);
			
		return sourcePoint;
	}
	else
	{
		if(xyC.y == xyD.y)
		{
			ySame = true;
		}
		var cdVectorLine = calculateCenterLine(xyC,xyD);
		var cdVectorSlope = cdVectorLine[0];
		var cdVectorIntercept = cdVectorLine[1];

		var abCircle = makeCircle(xyA, xyB, ratioAtoSourceVsBtoSource);
		var acCircle = makeCircle(xyA, xyC, ratioAtoSourceVsCtoSource);
		var bcCircle = makeCircle(xyB, xyC, ratioBtoSourceVsCtoSource);

		if(ySame == false)
		{
			var BCDIntersections = calculateCircleLine(bcCircle, cdVectorSlope, cdVectorIntercept);
		}
		else
		{
			var BCDIntersections = twoSameAndYSameCircle(bcCircle, (xyC.x + xyD.x)/2);
		}
		
		var ABCIntersections = circleCircleIntersection(abCircle, acCircle);

		var sourcePoint = choosePoint(ABCIntersections,BCDIntersections);
			
		return sourcePoint;
	}
}
function twoSameAndYSameCircle(circle1, xCoordinate)
{
	var a = 1;
	var b = -2*circle1.y;
	var c = square(xCoordinate) - square(circle1.radius) - 2*circle1.x*xCoordinate + square(circle1.y) + square(circle1.x);

	y1 = (-b + Math.sqrt(square(b) - 4*a*c))/(2*a);
	y2 = (-b - Math.sqrt(square(b) - 4*a*c))/(2*a);

	var intersections = [{
		x:xCoordinate,
		y:y1
	},
	{
		x:xCoordinate,
		y:y2
	}];

	return intersections;
}
function ThreeSameAndYSameLine(slope, intercept, xCoordinate)
{
	var sourcePoint = {
		x: xCoordinate,
		y: slope*xCoordinate + intercept
	};
	return sourcePoint;
}

var metersPerDegreeLatitude = function(latitude)
{
	var latRadians = latitude*Math.PI/180.0;
	var meterPerDegreeLat = 111132.92 - 559.82 * Math.cos(2*latRadians) + 1.175*Math.cos(4*latRadians);
	return meterPerDegreeLat;
}

var metersPerDegreeLongitude = function(latitude)
{
	var latRadians = latitude*Math.PI/180.0;
	var meterPerDegreeLong = 111412.84 * Math.cos(latRadians) - 93.5 * Math.cos(3*latRadians);
	return meterPerDegreeLong;

}

var degreesPerMeterLatitude = function(latitude)
{
	return 1/metersPerDegreeLatitude(latitude);
}

var degreesPerMeterLongitude = function(latitude)
{
	return 1/metersPerDegreeLongitude(latitude);
}
	
function setOrigin (pointA)
{
	pointA.x = 0;
	pointA.y = 0;
}

function setXY(pointA, pointB)
{
	var baseLatitude = pointA.latitude;
	var latitudeConversionFactor = metersPerDegreeLatitude(baseLatitude);
	var longitudeConversionFactor = metersPerDegreeLongitude(baseLatitude);

	var latDist = pointB.latitude - pointA.latitude;
	var longdist = pointB.longitude - pointA.longitude;
	pointB.x = pointA.x + longdist*longitudeConversionFactor;
	pointB.y = pointA.y + latDist*latitudeConversionFactor;
}

function setLatLong(pointA, pointB)
{
	var baseLatitude = pointA.latitude;
	var latitudeConversionFactor = degreesPerMeterLatitude(baseLatitude);
	var longitudeConversionFactor = degreesPerMeterLongitude(baseLatitude);

	var xDist = pointB.x - pointA.x;
	var yDist = pointB.y - pointA.y;
	pointB.longitude = pointA.longitude + xDist*longitudeConversionFactor;
	pointB.latitude = pointA.latitude + yDist*latitudeConversionFactor;
}

function square (a)
{
	return (a*a);
}

var calculate = function(xyA, xyB, xyC, xyD)
{

	if(xyA.x == null && xyA.y == null)
	{
			setOrigin(xyA);
			setXY(xyA, xyB);
			setXY(xyA, xyC);
			setXY(xyA, xyD);
	}
	var ratioAtoSourceVsBtoSource = Math.sqrt(xyB.strength/xyA.strength);
	var ratioAtoSourceVsCtoSource = Math.sqrt(xyC.strength/xyA.strength);
	var ratioBtoSourceVsCtoSource = Math.sqrt(xyC.strength/xyB.strength);
	var ratioCtoSourceVsDtoSource = Math.sqrt(xyD.strength/xyC.strength);

	var ratioAtoSourceVsDtoSource = Math.sqrt(xyD.strength/xyA.strength);
	var ratioBtoSourceVsDtoSource = Math.sqrt(xyD.strength/xyB.strength);

	if(ratioAtoSourceVsBtoSource == 1 || ratioAtoSourceVsCtoSource == 1 || ratioBtoSourceVsCtoSource == 1
		|| ratioCtoSourceVsDtoSource == 1)
	{
		var finalCoordinatesTwoSame = calculateTwoSame(xyA, xyB, xyC, xyD);
		if(finalCoordinatesTwoSame == null)
		{
			var sourceInfo = {
				x: null,
				y: null,
				strength: null
			};
			return sourceInfo;
		}
		var sourceInfo = {
			x:finalCoordinatesTwoSame.x,
			y:finalCoordinatesTwoSame.y,
			strength:calculateStrength(xyA, finalCoordinatesTwoSame)
		};
		return sourceInfo;

	}

	var abCircle = makeCircle(xyA, xyB, ratioAtoSourceVsBtoSource);
	var acCircle = makeCircle(xyA, xyC, ratioAtoSourceVsCtoSource);
	var bcCircle = makeCircle(xyB, xyC, ratioBtoSourceVsCtoSource);
	var cdCircle = makeCircle(xyC, xyD, ratioCtoSourceVsDtoSource);
	var adCircle = makeCircle(xyA, xyD, ratioAtoSourceVsDtoSource);
	var bdCircle = makeCircle(xyB, xyD, ratioBtoSourceVsDtoSource);

	var ABCIntersections = circleCircleIntersection(abCircle, acCircle);
	var BCDIntersections = circleCircleIntersection(bcCircle, cdCircle);
	var ABDIntersections = circleCircleIntersection(adCircle, bdCircle);

	console.log(ABCIntersections[0].x + "   " + ABCIntersections[0].y + "   " + ABCIntersections[1].x + "   " + ABCIntersections[1].y);
	console.log(BCDIntersections[0].x + "   " + BCDIntersections[0].y + "   " + BCDIntersections[1].x + "   " + BCDIntersections[1].y);
	console.log(ABDIntersections[0].x + "   " + ABDIntersections[0].y + "   " + ABDIntersections[1].x + "   " + ABDIntersections[1].y);

	var ABCBCDIntersectionCheck = false;
	var ABCABDIntersectionCheck = false;
	var ABDBCDIntersectionCheck = false;

	if(ABCIntersections[0].x != null && ABCIntersections[1].x != null || ABCIntersections[0].y != null && ABCIntersections[1].y != null)
	{
		if(BCDIntersections[0].x != null && BCDIntersections[1].x != null || BCDIntersections[0].y != null && BCDIntersections[1].y != null)
		{
			var ABCBCDIntersectionPoint = choosePoint(ABCIntersections, BCDIntersections);
			ABCBCDIntersectionCheck = true;
		}
	}

	if(ABCIntersections[0].x != null && ABCIntersections[1].x != null || ABCIntersections[0].y != null && ABCIntersections[1].y != null)
	{
		if(ABDIntersections[0].x != null && ABDIntersections[1].x != null || ABDIntersections[0].y != null && ABDIntersections[1].y != null)
		{
			var ABCABDIntersectionPoint = choosePoint(ABCIntersections, ABDIntersections);
			ABCABDIntersectionCheck = true;
		}

	}

	if(BCDIntersections[0].x != null && BCDIntersections[1].x != null || BCDIntersections[0].y != null && BCDIntersections[1].y != null)
	{
		if(ABDIntersections[0].x != null && ABDIntersections[1].x != null || ABDIntersections[0].y != null && ABDIntersections[1].y != null)
		{
			var ABDBCDIntersectionPoint = choosePoint(ABDIntersections, BCDIntersections);
			ABDBCDIntersectionCheck = true;
		}
	}

	if(ABCBCDIntersectionCheck == true && ABCABDIntersectionCheck == true && ABDBCDIntersectionCheck == true)
	{
		var finalCoordinates = {
			x: (ABCBCDIntersectionPoint.x + ABCABDIntersectionPoint.x + ABDBCDIntersectionPoint.x)/3,
			y: (ABCBCDIntersectionPoint.y + ABCABDIntersectionPoint.y + ABDBCDIntersectionPoint.y)/3
		};
	}
	else
	{
		if(ABCBCDIntersectionCheck == false && ABCABDIntersectionCheck == false && ABDBCDIntersectionCheck == false)
		{
			var finalCoordinates = {
				x: null,
				y: null
			};
		}
		else if(ABCBCDIntersectionCheck == false && ABCABDIntersectionCheck == false)
		{
			var finalCoordinates = {
				x: ABDBCDIntersectionPoint.x,
				y: ABDBCDIntersectionPoint.y
			};
		}
		else if(ABCABDIntersectionCheck == false && ABDBCDIntersectionCheck == false)
		{
			var finalCoordinates = {
				x: ABCBCDIntersectionPoint.x,
				y: ABCBCDIntersectionPoint.y
			};
		}
		else
		{
			var finalCoordinates = {
				x: ABCABDIntersectionPoint.x,
				y: ABCABDIntersectionPoint.y
			};
		}
	}
	if(finalCoordinates.x != null && finalCoordinates.y != null)
	{
		var sourceInfo = {
		x: finalCoordinates.x,
		y: finalCoordinates.y,
		strength: calculateStrength(xyA, finalCoordinates)
		};
	}
	else
	{
		var sourceInfo = {
		x: null,
		y: null,
		strength: null
		};
	}

	if(xyA.latitude != 0 && xyA.longitude !=0)
	{
		setLatLong(xyA, sourceInfo);
	}
	xyA.x = null;
	xyA.y = null;
	return sourceInfo;
}

module.exports = {
  calculate:calculate,
  metersPerDegreeLatitude: metersPerDegreeLatitude,
  metersPerDegreeLongitude: metersPerDegreeLongitude,
  degreesPerMeterLatitude: degreesPerMeterLatitude,
  degreesPerMeterLongitude: degreesPerMeterLongitude,
  distanceBetweenVectors: distanceBetweenVectors
};


// function begin()
// {
// 	var pointA = {
//     	latitude: 41.7758578,
//     	longitude: -72.6090535,
//     	strength: (0.0425438582897186*114)
//     };
//     var pointB = {
//     	latitude: 41.7760296,
//     	longitude: -72.6090069,
//     	strength: (0.0853508710861206*114)
//     };
//     var pointC = { 
//     	latitude: 41.7761454,
//     	longitude: -72.6091478,
//     	strength: (0.0320175439119339*114)
//     };
//     var pointD = {
//     	latitude: 41.7762127,
//     	longitude: -72.6094377,
//     	strength: (0.0113157890737057*114)
//     };
// 	var source = calculate(pointA, pointB, pointC, pointD);
// 	if(source.x == null)
// 	{
// 		console.log("The point could not be triangulated.");
// 	}
// 	else
// 	{
// 			console.log("X: " + source.x + "   Y: " + source.y + "   Strength " + source.strength);
// 	}
// }

// begin();
// var test = require('tape');

// test('test1', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 2,
//     	y: 2,
//     	strength:100.0/2.0
//     };
//     var pointB = {
//     	x: 5,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var pointC = { 
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/290.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/61.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 1;
//     var yActual = 1;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test2', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 2,
//     	y: 2,
//     	strength:100.0/18.0
//     };
//     var pointB = {
//     	x: 5,
//     	y: 4,
//     	strength:100.0/61.0
//     };
//     var pointC = { 
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/202.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -1;
//     var yActual = -1;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test3', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 2,
//     	y: 2,
//     	strength:100.0/16.0
//     };
//     var pointB = {
//     	x: 5,
//     	y: 4,
//     	strength:100.0/53.0
//     };
//     var pointC = { 
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test4', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -2,
//     	y: -2,
//     	strength: 681.22/16.0
//     };
//     var pointB = {
//     	x: 5,
//     	y: 4,
//     	strength: 681.22/53.0
//     };
//     var pointC = { 
//     	x: -10,
//     	y: -12,
//     	strength: 681.22/260.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 681.22/113.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 681.22;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test5', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 2,
//     	y: 2,
//     	strength:100.0/16.0
//     };
//     var pointB = {
//     	x: -2,
//     	y: -2,
//     	strength:100.0/16.0
//     };
//     var pointC = { 
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test6', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 1,
//     	y: -2,
//     	strength:100.0/25.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointC = {
//    		x: -5,
//     	y: 6,
//     	strength:100.0/25.0 
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test7', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 1,
//     	y: -2,
//     	strength:100.0/25.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointC = {
//    		x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var pointD = {
//     	x: -5,
//     	y: 6,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test8', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointB = {
//     	x: 1,
//     	y: -2,
//     	strength:100.0/25.0
//     };
//     var pointC = {
//    		x: -5,
//     	y: 6,
//     	strength:100.0/25.0 
//     };
//     var pointD = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test9', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointB = {
//     	x: 1,
//     	y: -2,
//     	strength:100.0/25.0
//     };
//     var pointC = {
//    		x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var pointD = {
//     	x: -5,
//     	y: 6,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test10', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -10,
//     	y: -12,
//     	strength: 100.0/260.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: -5,
//     	strength: 100.0/113.0
//     };
//     var pointC = {
//     	x: 1,
//     	y: -2,
//     	strength:100.0/25.0
//     };
//     var pointD = {
//     	x: -5,
//     	y: 6,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -2;
//     var yActual = 2;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test11', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 7,
//     	y: 7,
//     	strength: 100.0/25.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var pointD = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test12', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 7,
//     	y: 7,
//     	strength: 100.0/25.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointC = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointD = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test13', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 7,
//     	y: 7,
//     	strength: 100.0/25.0
//     };
//     var pointB = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointD = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test14', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointB = {
//     	x: 7,
//     	y: 7,
//     	strength: 100.0/25.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointD = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test15', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointB = {
//     	x: 11,
//     	y: 17,
//     	strength: 100.0/233.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointD = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test16', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointC = {
//     	x: 11,
//     	y: 17,
//     	strength: 100.0/233.0
//     };
//     var pointD = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test17', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength:100.0/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 100.0/25.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength:100.0/25.0
//     };
//     var pointD = {
//     	x: 11,
//     	y: 17,
//     	strength: 100.0/233.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 100.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test18', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -2,
//     	y: -3,
//     	strength:888.0/34.0
//     };
//     var pointB = {
//     	x: -2,
//     	y: -13,
//     	strength: 888.0/34.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength:888.0/313.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 888.0/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 888.0;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test19', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test20', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test21', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointC = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test22', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test23', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test24', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 8,
//     	y: 4,
//     	strength: 9520.2/313.0
//     };
//     var pointB = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test25', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test26', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test27', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test28', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointD = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test29', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test30', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test31', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test32', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointC = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test33', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointB = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointC = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test34', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test35', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointB = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test36', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: -1,
//     	y: -1,
//     	strength: 9520.2/65.0
//     };
//     var pointB = {
//     	x: -2,
//     	y: -3,
//     	strength: 9520.2/34.0
//     };
//     var pointC = {
//     	x: 0,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: -5,
//     	strength: 9520.2/34.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = -5;
//     var yActual = -8;
//     var sActual = 9520.2;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test37', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test38', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test39', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 11,
//     	y: 17,
//     	strength: 751.3/233.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test40', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 8,
//     	y: 4,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test41', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test42', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: 11,
//     	y: 17,
//     	strength: 751.3/233.0
//     };
//     var pointD = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test43', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: 8,
//     	y: 4,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test44', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: -10,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });

// test('test45', function (t) {
//     t.plan(3);
//     var pointA = {
//     	x: 16,
//     	y: 12,
//     	strength: 751.3/233.0
//     };
//     var pointB = {
//     	x: 6,
//     	y: 8,
//     	strength: 751.3/25.0
//     };
//     var pointC = {
//     	x: 6,
//     	y: 0,
//     	strength: 751.3/25.0
//     };
//     var pointD = {
//     	x: 11,
//     	y: 17,
//     	strength: 751.3/233.0
//     };
//     var source = calculate(pointA, pointB, pointC, pointD);
//     var xActual = 3;
//     var yActual = 4;
//     var sActual = 751.3;
//     var xCheck = false;
//     var yCheck = false;
//     var sCheck = false;
//     if(Math.abs(source.x-xActual) <.01)
//     {
//     	xCheck = true;
//     }
//     if(Math.abs(source.y-yActual) <.01)
//     {
//     	yCheck = true;
//     }
//     if(Math.abs(source.strength-sActual) <.1)
//     {
//     	sCheck = true;
//     }
//     t.equal(xCheck,true);
    
//     t.equal(yCheck,true);

//     t.equal(sCheck,true);
// });