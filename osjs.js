//xhr object
function xhr(url, write_key, data){
	//we add timestamp to data
	//todo
	var xmlhttp;
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4){
			if(xmlhttp.status == 200){
				//success, we can send the queue if there is one
				osjs.sendQueue();
			}
			else{
				//error => queue
				osjs.queue(url, data);
			}
			//response todo
			console.log("xhr resp : " + xmlhttp.responseText + ' ' + xmlhttp.status);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Authorization", "Basic " + btoa(write_key + ":" + null));
	xmlhttp.setRequestHeader("Content-type","application/json");
	//xmlhttp.setRequestHeader("Content-length", data.length);
	xmlhttp.send(JSON.stringify(data));
}

//osjs main class
function Osjs(){
	this.write_key = null;
	var self = this;

	//options
	this.setOptions = function(options){
		if(options.write_key){
			self.write_key = options.write_key;
		}
	}

	this.queue = function(){

	}

	this.sendQueue = function(){

	}

	//identify
	this.identify = function(data){
		xhr("https://api.segment.io/v1/identify", self.write_key, data);
	}

	//track
	this.track = function(data){
		xhr("https://api.segment.io/v1/track", self.write_key,data);
	}

	//page
	this.page = function(data){
		xhr("https://api.segment.io/v1/page", self.write_key, data);
	}
}

var osjs = new Osjs();

