// function doWork (data, callback) {
// 	callback('done');
// 	callback('done second')
// }

// function doWorkPromise (data) {
// 	return new Promise(function (resolve, reject) {
// 		setTimeout(function () {
// 			reject('everything is broken!');
// 		}, 1000);
// 		// reject({
// 		// 	error: 'something bad happened'
// 		// });
// 	});
// }

// doWorkPromise('some data').then(function (data) {
// 	console.log(data);
// }, function (error) {
// 	console.log(error);
// });

var request = require('request');

function getWeather (location) {
	//promises take 2 args: resolve when the function suceeds and 'reject' when there is error
	//a promise never calls both resolve and reject..only one is called
	return new Promise(function (resolve, reject) { 
		var encodedLocation = encodeURIComponent(location);
		var url = 'http://api.openweathermap.org/data/2.5/weather?appid=fd95426b8fa3012a5a692ec4d370eff2&q=' + encodedLocation + '&units=imperial';

		if (!location) {
			return reject('No location provided'); //since no location present its an error condition..so 'reject' used
		}

		request({
			url: url,
			json: true
		}, function (error, response, body) {
			if (error) {
				reject('Unable to fetch weather.'); 
			} else {
				//no errors so use 'resolve'
				resolve('It\'s ' + body.main.temp + ' in ' + body.name + '!'); 
			}
		});
	});
}

//getWeather('san francisco') will call the function with san francisco as location param
//if that call suceeds and returns a resolve 'then' the result is passed to 'currentWeather' argument and is logged to screen
//if the call returns an error the 'reject' will be called in 2nd argument function below will return error
getWeather('san francisco').then(function (currentWeather) {
	console.log(currentWeather);
}, function (error) {
	console.log(error);
});







