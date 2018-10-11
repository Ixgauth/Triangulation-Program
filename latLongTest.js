var RAD_PER_DEG = 0.017453293;
Rkm = 6371; // radius in kilometers, some algorithms use 6367
Rmeters = Rkm * 1000; // radius in meters

function haversineDistanceMeters(lat1, lon1, lat2, lon2)
{
	var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;

    var dlon_rad = dlon * RAD_PER_DEG;
    var dlat_rad = dlat * RAD_PER_DEG;

    var lat1_rad = lat1 * RAD_PER_DEG;
    var lon1_rad = lon1 * RAD_PER_DEG;

    var lat2_rad = lat2 * RAD_PER_DEG;
    var lon2_rad = lon2 * RAD_PER_DEG;

    var a = Math.pow(Math.sin(dlat_rad/2),2) + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.pow(Math.sin(dlon_rad/2),2);
   	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

   	var dMeters = Rmeters * c // delta in meters;
   	return dMeters
}

function begin()
{
	var lat1 = 41.7757401;
	var long1 = -72.6091432;

	var lat2 = 41.776072496367426;
	var long2 = -72.60879814624786;

	var distance = haversineDistanceMeters(lat1, long1, lat2, long2);
	console.log(10000/(distance*distance));
}

begin();