//xhr object
function xhr(url, write_key, data){
	//we add timestamp to data
	var d = new Date();
	var t = d.toISOString();
	data.timestamp = t;
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
	this.datas = [];
	var self = this;

	//options
	this.setOptions = function(options){
		if(options.write_key){
			self.write_key = options.write_key;
		}
	}

	this.queue = function(url, data){
		//todo
	}

	this.sendQueue = function(){
		//todo
	}

	//identify
	this.identify = function(data){
		xhr("https://api.segment.io/v1/identify", self.write_key, data);
	}

	//group
	this.group = function(data){
		xhr("https://api.segment.io/v1/group", self.write_key, data);
	}

	//track
	this.track = function(data){
		xhr("https://api.segment.io/v1/track", self.write_key,data);
	}

	//page
	this.page = function(data){
		xhr("https://api.segment.io/v1/page", self.write_key, data);
	}

	//screen
	this.screen = function(data){
		xhr("https://api.segment.io/v1/screen", self.write_key, data);
	}

	//alias
	this.alias = function(data){
		xhr("https://api.segment.io/v1/alias", self.write_key, data);
	}

	//import
	this.import = function(data){
		xhr("https://api.segment.io/v1/import", self.write_key, data);
	}
}

var osjs = new Osjs();

