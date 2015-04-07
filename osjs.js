//osjs main class
function Osjs(){
	this.write_key = null;
	this.anonymousId = null;
	this.userId = null;
	this.datas = [];
	var self = this;

	//options
	this.setOptions = function(options){
		if(options.write_key){
			self.write_key = options.write_key;
		}

		if(options.anonymousId){
			//if an anon id is passed, we save it
			self.anonymousId = options.anonymousId;
		}
		else if(!self.anonymousId){
			//no anon id, we generate one in case we need it.
			self.anonymousId = Math.floor(Math.random() * 0xfffffffffffff);
		}

		if(options.userId && !self.userId){
			self.userId = options.userId;
		}
	}

	//xhr func
	this.xhr = function(url, data){
		//we add timestamp to data, if there is not one already present
		if(!data.timestamp){
			var d = new Date();
			var t = d.toISOString(); //segment need timestamp at ISO format
			data.timestamp = t;
		}
		var xmlhttp;
		if (window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
		    xmlhttp=new XMLHttpRequest();
		}
		else{
			// code for IE6, IE5
		    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		console.log(JSON.stringify(data, null,4));
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4){
				if(xmlhttp.status == 200){
					//success, we can send the queue if there is one
					self.sendQueue();
				}
				else{
					//error => queue
					self.queue(url, data);
				}
			}
		}
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Authorization", "Basic " + btoa(self.write_key + ":" + null));
		xmlhttp.setRequestHeader("Content-type","application/json");
		//xmlhttp.setRequestHeader("Content-length", data.length);
		xmlhttp.send(JSON.stringify(data));
	}

	this.queue = function(url, data){
		var a = url.split("/").pop(); //we get the action name from the url
		//we merge the action into the data, so that we can use import 
		data.action = a;
		self.datas.push(data);
	}

	this.sendQueue = function(){
		if(self.datas.length !== 0){
			//we have some stored data => we send it
			//we create the data with the queue
			var data = {
				"batch":self.datas
			};
			//we empty the queue
			self.datas = [];
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
						//it worked. nothing to do.
					}
					else{	
						//it didnt work. higly improbable. but we repopulate the queue
						for(var i=0;i<data.batch.length;i++){
							self.datas.push(data.batch[i]);
						}
					}
				}
			}
			xmlhttp.open("POST", "https://api.segment.io/v1/import", true);
			xmlhttp.setRequestHeader("Authorization", "Basic " + btoa(self.write_key + ":" + null));
			xmlhttp.setRequestHeader("Content-type","application/json");
			//xmlhttp.setRequestHeader("Content-length", data.length);
			xmlhttp.send(JSON.stringify(data));

		}
		else{
			//queue empty. we do nothing
		}
	}

	//identify
	this.identify = function(data){
		if(!data.anonymousId){
			data.anonymousId = self.anonymousId;
		}
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/identify", data);
	}

	//group
	this.group = function(data){
		if(!data.anonymousId){
			data.anonymousId = self.anonymousId;
		}
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/group", data);
	}

	//track
	this.track = function(data){
		if(!data.anonymousId){
			data.anonymousId = self.anonymousId;
		}
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/track", data);
	}

	//page
	this.page = function(data){
		if(!data.anonymousId){
			data.anonymousId = self.anonymousId;
		}
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/page", data);
	}

	//screen
	this.screen = function(data){
		if(!data.anonymousId){
			data.anonymousId = self.anonymousId;
		}
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/screen", data);
	}

	//alias
	this.alias = function(data){
		if(!data.userId && self.userId){
			data.userId = self.userId;
		}
		self.xhr("https://api.segment.io/v1/alias", data);
	}

	//import to make compatible with queue system
	/*this.import = function(data){
		self.xhr("https://api.segment.io/v1/import", data);
	}*/

}

var osjs = new Osjs();

