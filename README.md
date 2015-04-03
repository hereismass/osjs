# osjs
Javascript integration of segment.com HTTP API

# Why osjs ? 
segment.com provides a javascript library, Analytics.js, so why osjs ?
The main advantage of osjs is to have a queue system that allows to register events even if there is no internet connection : the events are sent to segment.com when the connection is back.

# How to use ?
1. Put osjs.js or osjs.min.js in your project.

2. Initialize the osjs object with your segment.com write key
	```javascript
	osjs.setOptions({
		"write_key" : "mysegmentwritekey"
	});
	```
3. Use the functions available in the HTTP segment API

	* Identify
		```javascript
		osjs.identify({
			"userId": "019mr8mf4r",
			"traits": {
				"email": "pgibbons@initech.com",
				"name": "Peter Gibbons",
				"industry": "Technology"
			},
			"context": {
				"ip": "24.5.68.47"
			},
			"timestamp": "2012-12-02T00:30:08.276Z"
		});
		```
	
	* Group
		```javascript
		osjs.group({
			"userId": "019mr8mf4r",
			"groupId": "8e9df332ac",
			"traits": {
				"name": "Initech",
				"industry": "Technology",
				"employees": 420
			}
		});
		```
	
	* Track
		```javascript
		osjs.track({
			"userId": "019mr8mf4r",
			"event": "Purchased Item",
			"properties": {
				"name": "Leap to Conclusions Mat",
				"revenue": 14.99
			},
			"context": {
				ip": "24.5.68.47"
			},
			"timestamp": "2012-12-02T00:30:12.984Z"
		});
		```
	
	* Page
		```javascript
		osjs.page({
			"userId": "019mr8mf4r",
			"name": "Tracking HTTP API"
		});
		```
	
	* Screen
		```javascript
		osjs.screen({
			"userId": "019mr8mf4r",
			"name": "Tracking HTTP API"
		});
		```
	
	* Alias
		```javascript
		osjs.alias({
			"userId": "019mr8mf4r",
			"name": "Tracking HTTP API"
		});
		```
	
	* Import is not yet supported

You can have more details [here](https://segment.com/docs/libraries/http/).

# Important notes
* You don't have to specify the timestamp. If you have not specified one, it will set the timestamp to the time the event was triggered. So it doesn't matter if events are triggered when there is no Internet connection.
