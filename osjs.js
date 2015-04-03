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

	//xhr func
	this.xhr = function(url, data){
		//we add timestamp to data
		var d = new Date();
		var t = d.toISOString(); //segment need timestamp at ISO format
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
		xmlhttp.setRequestHeader("Authorization", "Basic " + btoa(self.write_key + ":" + null));
		xmlhttp.setRequestHeader("Content-type","application/json");
		//xmlhttp.setRequestHeader("Content-length", data.length);
		xmlhttp.send(JSON.stringify(data));
	}

	this.queue = function(url, data){
		//todo
	}

	this.sendQueue = function(){
		//todo
	}

	//identify
	this.identify = function(data){
		xhr("https://api.segment.io/v1/identify", data);
	}

	//group
	this.group = function(data){
		xhr("https://api.segment.io/v1/group", data);
	}

	//track
	this.track = function(data){
		xhr("https://api.segment.io/v1/track", data);
	}

	//page
	this.page = function(data){
		xhr("https://api.segment.io/v1/page", data);
	}

	//screen
	this.screen = function(data){
		xhr("https://api.segment.io/v1/screen", data);
	}

	//alias
	this.alias = function(data){
		xhr("https://api.segment.io/v1/alias", data);
	}

	//import
	this.import = function(data){
		xhr("https://api.segment.io/v1/import", data);
	}
}

var osjs = new Osjs();

