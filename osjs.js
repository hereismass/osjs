//xhr object
function xhr(url, write_key, data){
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
			//response todo
			console.log("xhr resp : " + xmlhttp.responseText);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Authorization", "Basic " + btoa(write_key + ":" + null));
	xmlhttp.setRequestHeader("Content-type","application/json");
	//xmlhttp.setRequestHeader("Content-length", data.length);
	xmlhttp.send(data);
}

//osjs main class
function Osjs(){

}

