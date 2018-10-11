function chooseFour(points, size, startPlacement, currentSize, currentSet, currentSolutionSize, solution)
{
	if(currentSet[size-1] != null && currentSet[size-1] != undefined)
	{
		for(let i = 0; i < currentSet.length; i++)
		{
			solution[currentSolutionSize][i] = currentSet[i];
		}
		return currentSolutionSize+1;
	}

	if(startPlacement == points.length)
	{
		return currentSolutionSize;
	}

	currentSet[currentSize] = points[startPlacement];
	currentSolutionSize = chooseFour(points, size, startPlacement+1, currentSize+1, currentSet, currentSolutionSize, solution);
	currentSet[currentSize] = null;
	currentSolutionSize = chooseFour(points, size, startPlacement+1, currentSize, currentSet, currentSolutionSize, solution);
	return currentSolutionSize;

}

var arrayOut = function(solution)
{
	console.log(solution[0].ID + "   " + solution[0].latitude + "    " + solution[0].longitude + "    " + solution[0].strength);
	console.log(solution[1].ID + "   " + solution[1].latitude + "    " + solution[1].longitude + "    " + solution[1].strength);
	console.log(solution[2].ID + "   " + solution[2].latitude + "    " + solution[2].longitude + "    " + solution[2].strength);
	console.log(solution[3].ID + "   " + solution[3].latitude + "    " + solution[3].longitude + "    " + solution[3].strength);
}

function factorial(n)
{
	var fact = 1;
	for(let i = 1; i < n+1; i++)
	{
		fact = fact*i;
	}
	return fact;
}

function findCombinationNumbers(n, r)
{
	var numerator = factorial(n);
	var denominator = (factorial(r))*(factorial(n-r));
	return numerator/denominator;
}

function makeArray(arrayWidth, arrayHeight, valueInCells) 
{
    var array = [];
    for(i = 0; i < arrayHeight; i++) 
    {
        array[i] = [];
        for(j = 0; j < arrayWidth; j++) 
        {
            array[i][j] = valueInCells;
        }
    }
    return array;
}

var main = function (pointInputs)
{
	var tester = require("./Triangulation.js");
	var points = pointInputs;
	var size = 4;
	var numberOfCombinations = findCombinationNumbers(pointInputs.length, size);
	solution = makeArray(size, numberOfCombinations, 0);
	var startPlacement = 0;
	var currentSet = new Array(size);
	var currentSize = 0;
	var currentSolutionSize = 0;
	chooseFour(points, size, startPlacement, currentSize, currentSet, currentSolutionSize, solution);
	
	// for(let i = 0; i < solution.length; i++)
	// {
	// 	console.log("");
	// 	console.log("For source " + i + ":");
	// 	//arrayOut(solution[i]);
	// 	var source = tester.calculate(solution[i][0], solution[i][1], solution[i][2], solution[i][3]);
	// 	console.log("Latitude: " + source.latitude + "   Longitude: " + source.longitude + "   Strength " + source.strength);
	// }
	return solution;

}
var solution = [[],[]];

module.exports = {
  main:main,
  arrayOut: arrayOut
};

