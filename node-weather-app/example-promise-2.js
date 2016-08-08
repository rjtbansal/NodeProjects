// function doWork (shouldFail) {
// 	return new Promise(function (resolve, reject) {
// 		setTimeout(function () {
// 			if (typeof shouldFail === 'boolean' && shouldFail === true) {
// 				reject('error message');
// 			} else {
// 				resolve('success');
// 			}
// 		}, 1000);
// 	});
// }

// doWork(true).then(function (message) {
// 	console.log(message);
// 	return doWork(true);
// }).then(function (message) {
// 	console.log(message);
// }).catch(function (error) {
// 	console.log(error);
// });

function getLocation () {
	return new Promise(function (resolve, reject) {
		resolve('Philadelphia');
	});
}

function getWeather (location) {
	return new Promise(function (resolve, reject) {
		resolve('It is 78 in ' + location + '!');
	});
}

//below we are calling 2 promises by chaining
//first getLocation is called and it returns a location
//if getLocation doesnt fail then getWeather is called and location is passed to it
//if getWeather succeeds then the weather is passed to currentWeather argument which is then logged
getLocation().then(function (location) {
	return getWeather(location);
}).then(function (currentWeather) {
	console.log(currentWeather);
});

//getLocation.then
//    return getWeather(location)
// then
//     console.log(currentWeather);