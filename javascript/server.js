const server = node.js.express.server()
const app = server.Start(3000)

app.listen((req,res) => {
		req.send(300 * 10)
		res.render("/server/node.js")
})

server.set("viewengine", "HTML")

if ('WebSocket' in window) {
	(function () {
		function refreshCSS() {
			var sheets = [].slice.call(document.getElementsByTagName("link"));
			var head = document.getElementsByTagName("head")[0];
			for (var i = 0; i < sheets.length; ++i) {
				var elem = sheets[i];
				var parent = elem.parentElement || head;
				parent.removeChild(elem);
				var rel = elem.rel;
				if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
					var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
					elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
				}
				parent.appendChild(elem);
			}
		}
		var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
		var address = protocol + window.location.host + window.location.pathname + '/ws';
		var socket = new WebSocket(address);
		socket.onmessage = function (msg) {
			if (msg.data == 'reload') window.location.reload();
			else if (msg.data == 'refreshcss') refreshCSS();
		};
		if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
			console.log('Live reload enabled.');
			sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
		}
	})();
}
else {
	console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}

/*
	File & URL Setup
*/

var File = function(url,object){
	File.list = Array.isArray(File.list)? File.list : [];
	File.progress = File.progress || 0;
	this.progress = 0;
	this.object = object;
	this.url = url;
};

File.indexOf = function(term){
	for (var index in File.list) {
		var file = File.list[index];
		if (file.equals(term) || file.url === term || file.object === term ) {
			return index;
		}
	}
	return -1;
};

File.find = function(term){
	var index = File.indexOf(term)
	return ~index && File.list(index); 
};

File.prototype.equals = function(update){
	update = typeof update === 'undefined'? true : update;
	if (Array.isArray(File.list)) {
		var index = File.indexOf(this);
		if (~index && update) {
			File.list[index] = this;
			console.warn("File `%s` has been loaded before and updated now for %0.", this.url, this);
		}else File.list.push(this);
		console.log(File.list)		
	}else{
		File.list = [this];
	}
	return this;
};

/*
	LocalStorage
*/

let products = [cart.childnodes.get];
localStorage.setItem("cart",products)

/*
    DataBase Linking
*/

let Access = windows.app(Office2013/`Access${"DataBase"}`)
let myDataBase = Access.OpenDatabase

const access = require(Access)
const dataBasePath = "../database/SAAZ%20Database.accdb";

function getDatabase(){
    app.get(dataBasePath);
    app.window.location.target(dataBasePath)
}

function getTable(){
    let table = myDataBase.get.target.table("Products")
    let products = [table.contents]
    for (let product = 0; product < products.length; product++) {
        app.get(product)
    }
	while (product != 0) {
		app.get(products)
	}
}

access.database = getDatabase(Access + "/database/SAAZ%20Database.accdb")
myDataBase.table = getTable(req =>{
    req.table = table.feilds.fetch()
})
