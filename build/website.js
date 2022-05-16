(function ($hx_exports, $global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
};
var Executable = function() { };
$hxClasses["Executable"] = Executable;
Executable.__name__ = true;
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
var Macro = function() { };
$hxClasses["Macro"] = Macro;
Macro.__name__ = true;
Math.__name__ = true;
var Program = function() {
};
$hxClasses["Program"] = Program;
Program.__name__ = true;
Program.prototype = {
	run: function(terminal,args) {
		terminal.print("Error");
	}
};
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
var Script = function(data) {
	this.lines = [];
	this.lines = data.split("\n");
};
$hxClasses["Script"] = Script;
Script.__name__ = true;
Script.prototype = {
	run: function(terminal,args) {
		var _g = 0;
		var _g1 = this.lines;
		while(_g < _g1.length) {
			var line = _g1[_g];
			++_g;
			WebOS.instance.execute(line);
		}
	}
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var ctor = Function.prototype.bind.apply(cl,[null].concat(args));
	return new (ctor);
};
var WebOS = function() {
	this.history = [];
	WebOS.instance = this;
	this.initTerminal();
};
$hxClasses["WebOS"] = WebOS;
WebOS.__name__ = true;
WebOS.prototype = {
	boot: function() {
		this.initFileSystem();
		this.terminal.print("WebOS Initialization completed.");
		haxe_Timer.delay($bind(this,this.onInit),500);
	}
	,setInputAndValidate: function(input) {
		this.terminal.setInput(input);
		this.terminal.validate();
		this.terminal.focus();
	}
	,execute: function(input) {
		var words = input.split(" ");
		var cmd = words[0];
		if(cmd.length > 0) {
			this.history.push(input);
			this.historyIndex = this.history.length;
			try {
				var slash = cmd.indexOf("/");
				if(slash == -1) {
					if(this.runFromPath("/bin",words)) {
						return;
					} else {
						this.terminal.print("Unknown command: " + cmd);
					}
					return;
				} else if(slash == 0) {
					if(this.runFromPath("",words)) {
						return;
					} else {
						this.terminal.print("Cannot find " + cmd);
					}
				} else if(this.runFromPath(this.cwd.getFullPath(),words)) {
					return;
				} else {
					this.terminal.print("Cannot find " + cmd);
				}
			} catch( _g ) {
				var e = haxe_Exception.caught(_g).unwrap();
				this.terminal.print("<span style='color:red'>Error: " + Std.string(e) + "</span>");
			}
		}
	}
	,updatePrompt: function() {
		this.terminal.setPrompt("[<span style='color:yellow'>user</span>@<span style='color:grey'>gogopr.org</span>:" + this.cwd.getFullPath() + "/]$ ");
	}
	,resolveFile: function(input) {
		if(input == null || input == "") {
			return this.cwd;
		}
		if(input.charAt(0) == "/") {
			return this.fileSystem.getFile(input);
		} else {
			return this.fileSystem.getFile(this.cwd.getFullPath() + "/" + input);
		}
	}
	,keyDown: function(e) {
		if(e.key == "ArrowUp") {
			this.historyIndex--;
			if(this.historyIndex < 0) {
				this.historyIndex = 0;
			}
			this.terminal.setInput(this.history[this.historyIndex]);
		} else if(e.key == "ArrowDown") {
			this.historyIndex++;
			if(this.historyIndex >= this.history.length) {
				this.historyIndex = this.history.length - 1;
			}
			this.terminal.setInput(this.history[this.historyIndex]);
		}
	}
	,initTerminal: function() {
		this.terminal = new terminaljs_Terminal();
		this.terminal.setHeight("100%");
		this.terminal.setWidth("100%");
		this.terminal.setTextColor("#eee");
		this.terminal.setBackgroundColor("rgba(0,0,0,0.4)");
		window.document.body.appendChild(this.terminal.html);
		this.terminal.print("Terminal initialized...");
	}
	,initFileSystem: function() {
		this.fileSystem = new fs_FileSystem();
		var files = ["src/programs/Clear.hx","src/programs/Help.hx","src/programs/Cat.hx","src/programs/Echo.hx","src/programs/Games.hx","src/programs/Cd.hx","src/programs/Ls.hx"];
		var _g = 0;
		while(_g < files.length) {
			var file = files[_g];
			++_g;
			var name = new haxe_io_Path(file).file;
			var lowName = name.toLowerCase();
			this.terminal.print("Registering program: " + lowName);
			var node = this.fileSystem.registerFile("/bin/" + lowName,fs_FileType.BuiltinBinary);
			var pgm = Type.createInstance($hxClasses["programs." + name],[]);
			node.executable = pgm;
		}
		var files = ["static/images/doommap.png","static/images/chamosqui.png","static/images/blue.gif","static/images/bananaaffair.png","static/images/neon.webp","static/images/motuz.png","static/images/bloody.png","static/images/redneck.jpg","static/images/sausage.png","static/images/pacman.png","static/images/care.png","static/images/fish.png","static/images/onap.jpg","static/images/breakout.gif","static/images/dnight.gif","static/images/straycatfever.png","static/images/pastafaria.png","static/images/ship.gif","static/images/crappybird.jpg","static/images/blind.png","static/images/ship2k22.gif","static/images/elm.gif","static/images/smm.gif","static/images/chaos.png","static/images/coolguys.png","static/var/games/items.json","static/var/games/items.toml","static/var/foo.txt","static/var/welcome.txt","static/var/contact.html","static/var/scripts/startup","static/var/scripts/foo","static/css/style.css"];
		var _g = 0;
		while(_g < files.length) {
			var file = files[_g];
			++_g;
			this.terminal.print("Registering file: " + file);
			var endPath = HxOverrides.substr(file,6,null);
			var node = this.fileSystem.registerFile(endPath,fs_FileType.WebFile);
			node.url = file;
		}
		var files = ["src/programs/Clear.hx","src/programs/Help.hx","src/programs/Cat.hx","src/programs/Echo.hx","src/programs/Games.hx","src/programs/Cd.hx","src/programs/Ls.hx","src/Program.hx","src/Website.hx","src/Executable.hx","src/Macro.hx","src/Script.hx","src/WebOS.hx","src/fs/FileSystem.hx"];
		var _g = 0;
		while(_g < files.length) {
			var file = files[_g];
			++_g;
			this.terminal.print("Registering file: " + file);
			var node = this.fileSystem.registerFile(file,fs_FileType.WebFile);
			node.url = file;
		}
		this.cwd = this.fileSystem.getFile("/");
	}
	,onInit: function() {
		this.updatePrompt();
		var urlCommand = null;
		try {
			var params = new URL(location.href).searchParams;
			urlCommand = params.get("cmd");
		} catch( _g ) {
		}
		if(urlCommand == null) {
			this.execute("/var/scripts/startup");
			this.terminal.input($bind(this,this.execute));
			this.terminal.keyDown($bind(this,this.keyDown));
		} else {
			this.terminal.input($bind(this,this.execute));
			this.terminal.keyDown($bind(this,this.keyDown));
			this.setInputAndValidate(urlCommand);
		}
	}
	,runFromPath: function(path,words) {
		var cmd = words[0];
		var file = this.resolveFile(path + "/" + cmd);
		if(file != null) {
			words.shift();
			file.execute(this.terminal,words.join(" "));
			return true;
		}
		return false;
	}
};
var Website = function() { };
$hxClasses["Website"] = Website;
Website.__name__ = true;
Website.main = function() {
	var webos = new WebOS();
	webos.boot();
	window.onload = function() {
		window.document.querySelector(".quicklinks .games").onclick = function() {
			webos.setInputAndValidate("games list");
		};
		window.document.querySelector(".quicklinks .contact").onclick = function() {
			webos.setInputAndValidate("cat /var/contact.html");
		};
	};
};
var fs_FileType = $hxEnums["fs.FileType"] = { __ename__:true,__constructs__:null
	,Unset: {_hx_name:"Unset",_hx_index:0,__enum__:"fs.FileType",toString:$estr}
	,Directory: {_hx_name:"Directory",_hx_index:1,__enum__:"fs.FileType",toString:$estr}
	,BuiltinBinary: {_hx_name:"BuiltinBinary",_hx_index:2,__enum__:"fs.FileType",toString:$estr}
	,WebFile: {_hx_name:"WebFile",_hx_index:3,__enum__:"fs.FileType",toString:$estr}
};
fs_FileType.__constructs__ = [fs_FileType.Unset,fs_FileType.Directory,fs_FileType.BuiltinBinary,fs_FileType.WebFile];
var fs_FileNode = function(parent,type,name) {
	this.name = name;
	this.parent = parent;
	this.type = type;
};
$hxClasses["fs.FileNode"] = fs_FileNode;
fs_FileNode.__name__ = true;
fs_FileNode.prototype = {
	setDirectory: function() {
		this.type = fs_FileType.Directory;
		if(this.children == null) {
			this.children = [];
		}
	}
	,getOrCreateChild: function(name) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == name) {
				return child;
			}
		}
		var node = new fs_FileNode(this,fs_FileType.Unset,name);
		this.children.push(node);
		return node;
	}
	,getOrCreateChildDirectory: function(name) {
		var node = this.getOrCreateChild(name);
		node.setDirectory();
		return node;
	}
	,getChild: function(name) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == name) {
				return child;
			}
		}
		return null;
	}
	,getContent: function(callback) {
		var _gthis = this;
		if(this.data != null) {
			if(callback != null) {
				callback(this.data);
			}
			return;
		}
		var http = new haxe_http_HttpJs(this.url);
		http.async = false;
		http.onData = function(data) {
			_gthis.data = data;
			if(callback != null) {
				callback(data);
			}
		};
		http.request();
	}
	,execute: function(terminal,args) {
		if(this.type == fs_FileType.WebFile) {
			if(this.executable == null) {
				this.getContent();
				this.executable = new Script(this.data);
			}
		}
		if(this.executable != null) {
			this.executable.run(terminal,args);
		}
	}
	,getFullPath: function() {
		var result = this.name;
		var node = this.parent;
		while(node != null) {
			result = node.name + "/" + result;
			node = node.parent;
		}
		return result;
	}
};
var fs_FileSystem = function() {
	this.root = new fs_FileNode(null,fs_FileType.Directory,"");
	this.root.setDirectory();
};
$hxClasses["fs.FileSystem"] = fs_FileSystem;
fs_FileSystem.__name__ = true;
fs_FileSystem.prototype = {
	registerFile: function(fullPath,type) {
		var names = fullPath.split("/");
		var parent = this.root;
		var _g = 0;
		var _g1 = names.length;
		while(_g < _g1) {
			var i = _g++;
			var name = names[i];
			if(name != "") {
				if(i < names.length - 1) {
					parent = parent.getOrCreateChildDirectory(name);
				} else {
					var node = parent.getOrCreateChild(name);
					node.type = type;
					return node;
				}
			}
		}
		return null;
	}
	,getFile: function(fullPath) {
		var names = fullPath.split("/");
		var node = this.root;
		var _g = 0;
		var _g1 = names.length;
		while(_g < _g1) {
			var i = _g++;
			var name = names[i];
			if(name != "" && name != ".") {
				if(name == "..") {
					node = node.parent;
				} else {
					node = node.getChild(name);
				}
				if(node == null) {
					return null;
				}
			}
		}
		return node;
	}
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
});
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_http_HttpBase = function(url) {
	this.url = url;
	this.headers = [];
	this.params = [];
	this.emptyOnData = $bind(this,this.onData);
};
$hxClasses["haxe.http.HttpBase"] = haxe_http_HttpBase;
haxe_http_HttpBase.__name__ = true;
haxe_http_HttpBase.prototype = {
	onData: function(data) {
	}
	,onBytes: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,hasOnData: function() {
		return !Reflect.compareMethods($bind(this,this.onData),this.emptyOnData);
	}
	,success: function(data) {
		this.responseBytes = data;
		this.responseAsString = null;
		if(this.hasOnData()) {
			this.onData(this.get_responseData());
		}
		this.onBytes(this.responseBytes);
	}
	,get_responseData: function() {
		if(this.responseAsString == null && this.responseBytes != null) {
			this.responseAsString = this.responseBytes.getString(0,this.responseBytes.length,haxe_io_Encoding.UTF8);
		}
		return this.responseAsString;
	}
};
var haxe_http_HttpJs = function(url) {
	this.async = true;
	this.withCredentials = false;
	haxe_http_HttpBase.call(this,url);
};
$hxClasses["haxe.http.HttpJs"] = haxe_http_HttpJs;
haxe_http_HttpJs.__name__ = true;
haxe_http_HttpJs.__super__ = haxe_http_HttpBase;
haxe_http_HttpJs.prototype = $extend(haxe_http_HttpBase.prototype,{
	request: function(post) {
		var _gthis = this;
		this.responseAsString = null;
		this.responseBytes = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( _g ) {
				s = null;
			}
			if(s == 0 && js_Browser.get_supported() && $global.location != null) {
				var protocol = $global.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					s = r.response != null ? 200 : 404;
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				_gthis.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				_gthis.req = null;
				_gthis.success(haxe_io_Bytes.ofData(r.response));
			} else if(s == null || s == 0 && r.response == null) {
				_gthis.req = null;
				_gthis.onError("Failed to connect or resolve host");
			} else if(s == null) {
				_gthis.req = null;
				var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
				_gthis.responseBytes = onreadystatechange;
				_gthis.onError("Http Error #" + r.status);
			} else {
				switch(s) {
				case 12007:
					_gthis.req = null;
					_gthis.onError("Unknown host");
					break;
				case 12029:
					_gthis.req = null;
					_gthis.onError("Failed to connect to host");
					break;
				default:
					_gthis.req = null;
					var onreadystatechange = r.response != null ? haxe_io_Bytes.ofData(r.response) : null;
					_gthis.responseBytes = onreadystatechange;
					_gthis.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri;
		var _g = this.postData;
		var _g1 = this.postBytes;
		if(_g == null) {
			if(_g1 == null) {
				uri = null;
			} else {
				var bytes = _g1;
				uri = new Blob([bytes.b.bufferValue]);
			}
		} else if(_g1 == null) {
			var str = _g;
			uri = str;
		} else {
			uri = null;
		}
		if(uri != null) {
			post = true;
		} else {
			var _g = 0;
			var _g1 = this.params;
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri == null) {
					uri = "";
				} else {
					uri = (uri == null ? "null" : Std.string(uri)) + "&";
				}
				var s = p.name;
				var value = (uri == null ? "null" : Std.string(uri)) + encodeURIComponent(s) + "=";
				var s1 = p.value;
				uri = value + encodeURIComponent(s1);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + (uri == null ? "null" : Std.string(uri)),this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
			r.responseType = "arraybuffer";
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			this.req = null;
			this.onError(e.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.name == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g = 0;
		var _g1 = this.headers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			r.setRequestHeader(h.name,h.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.get_supported = function() {
	if(typeof(window) != "undefined" && typeof(window.location) != "undefined") {
		return typeof(window.location.protocol) == "string";
	} else {
		return false;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw haxe_Exception.thrown("Unable to create XMLHttpRequest object.");
};
var programs_Cat = function() {
	Program.call(this);
};
$hxClasses["programs.Cat"] = programs_Cat;
programs_Cat.__name__ = true;
programs_Cat.__super__ = Program;
programs_Cat.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		var file = WebOS.instance.resolveFile(args);
		file.getContent(function(data) {
			terminal.print(data);
		});
	}
});
var programs_Cd = function() {
	Program.call(this);
};
$hxClasses["programs.Cd"] = programs_Cd;
programs_Cd.__name__ = true;
programs_Cd.__super__ = Program;
programs_Cd.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		var os = WebOS.instance;
		var file = os.resolveFile(args);
		if(file != null && file.type == fs_FileType.Directory) {
			os.cwd = file;
			os.updatePrompt();
		} else {
			terminal.print("No such directory");
		}
	}
});
var programs_Clear = function() {
	Program.call(this);
};
$hxClasses["programs.Clear"] = programs_Clear;
programs_Clear.__name__ = true;
programs_Clear.__super__ = Program;
programs_Clear.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		terminal.clear();
	}
});
var programs_Echo = function() {
	Program.call(this);
};
$hxClasses["programs.Echo"] = programs_Echo;
programs_Echo.__name__ = true;
programs_Echo.__super__ = Program;
programs_Echo.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		terminal.print(args);
	}
});
var programs_Games = function() {
	Program.call(this);
};
$hxClasses["programs.Games"] = programs_Games;
programs_Games.__name__ = true;
programs_Games.__super__ = Program;
programs_Games.prototype = $extend(Program.prototype,{
	run: function(terminal,argsLine) {
		var f = WebOS.instance.resolveFile("/var/games/items.json");
		f.getContent();
		var data = JSON.parse(f.data);
		var items = data.items;
		var args = argsLine.split(" ");
		if(args[0] == "list") {
			var container = window.document.createElement("div");
			container.className = "games";
			var onclick = function(i) {
				return function() {
					terminal.setInput("games show " + i);
					terminal.validate();
				};
			};
			var i = 0;
			var _g = 0;
			while(_g < items.length) {
				var item = items[_g];
				++_g;
				var el = window.document.createElement("div");
				var img = window.document.createElement("div");
				img.style.backgroundImage = "url(static/" + Std.string(item.image) + ")";
				el.appendChild(img);
				container.appendChild(el);
				img.onclick = onclick(i);
				++i;
			}
			terminal.print("Non-exhaustive list of games I made in my free time or for game jams:");
			terminal.append(container);
		} else if(args[0] == "show") {
			var index = Std.parseInt(args[1]);
			var container = window.document.createElement("div");
			container.className = "games show";
			var item = items[index];
			var img = window.document.createElement("img");
			img.className = "preview";
			img.src = "static/" + item.image;
			container.appendChild(img);
			var div = window.document.createElement("div");
			div.className = "info";
			div.innerHTML = item.title + "<p/>" + item.description;
			container.appendChild(div);
			terminal.append(container);
		} else {
			terminal.print("Usage: games [command]");
			terminal.print("Available commands:");
			terminal.print("  list");
			terminal.print("  show [index]");
		}
	}
});
var programs_Help = function() {
	Program.call(this);
};
$hxClasses["programs.Help"] = programs_Help;
programs_Help.__name__ = true;
programs_Help.__super__ = Program;
programs_Help.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		var fs = WebOS.instance.fileSystem;
		terminal.print("Available commands:");
		var bin = fs.getFile("/bin");
		var _g = 0;
		var _g1 = bin.children;
		while(_g < _g1.length) {
			var file = _g1[_g];
			++_g;
			terminal.print("  " + file.name);
		}
	}
});
var programs_Ls = function() {
	Program.call(this);
};
$hxClasses["programs.Ls"] = programs_Ls;
programs_Ls.__name__ = true;
programs_Ls.__super__ = Program;
programs_Ls.prototype = $extend(Program.prototype,{
	run: function(terminal,args) {
		var f = WebOS.instance.resolveFile(args);
		var _g = 0;
		var _g1 = f.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			terminal.print(child.name);
		}
	}
});
var terminaljs_Terminal = $hx_exports["Terminal"] = function(id) {
	this._cursorBlinkRate = 500;
	this._preCursor = "";
	this._shouldBlinkCursor = true;
	this._input = window.document.createElement("p");
	this._cursor = window.document.createElement("span");
	this._inputLine = window.document.createElement("span");
	this._inputLinePre = window.document.createElement("span");
	this._output = window.document.createElement("p");
	this._innerWindow = window.document.createElement("div");
	this.html = window.document.createElement("div");
	this.html.className = "Terminal";
	if(id != null) {
		this.html.id = id;
	}
	this._input.appendChild(this._inputLinePre);
	this._input.appendChild(this._inputLine);
	this._input.appendChild(this._cursor);
	this._innerWindow.appendChild(this._output);
	this._innerWindow.appendChild(this._input);
	this.html.appendChild(this._innerWindow);
	this.setBackgroundColor("black");
	this.setTextColor("white");
	this.setTextSize("1em");
	this.setWidth("100%");
	this.setHeight("100%");
	this.html.style.fontFamily = "Monaco, Courier";
	this.html.style.margin = "0";
	this.html.style.overflow = "auto";
	this.html.style.resize = "auto";
	this._innerWindow.style.padding = "10px";
	this._input.style.margin = "0";
	this._output.style.margin = "0";
	this._cursor.style.background = "white";
	this._cursor.innerHTML = "&nbsp;";
	this._cursor.style.display = "none";
	this._input.style.display = "none";
	this._cursorBlinkRate = 500;
	this.setPrompt("$ ");
};
$hxClasses["terminaljs.Terminal"] = terminaljs_Terminal;
terminaljs_Terminal.__name__ = true;
terminaljs_Terminal.triggerCursor = function(inputField,terminal,blinkRate) {
	window.setTimeout(function() {
		if(terminal._shouldBlinkCursor) {
			terminal._cursor.style.visibility = terminal._cursor.style.visibility == "visible" ? "hidden" : "visible";
		} else {
			terminal._cursor.style.visibility = "visible";
		}
		terminaljs_Terminal.triggerCursor(inputField,terminal,blinkRate);
	},blinkRate);
};
terminaljs_Terminal.initInput = function(terminal) {
	var inputField = window.document.createElement("input");
	terminal._inputField = inputField;
	inputField.style.position = "absolute";
	inputField.style.zIndex = "-100";
	inputField.style.outline = "none";
	inputField.style.border = "none";
	inputField.style.opacity = "0";
	inputField.style.fontSize = "0.2em";
	terminal._inputLine.textContent = "";
	terminal._input.style.display = "block";
	terminal.html.appendChild(inputField);
	terminaljs_Terminal.triggerCursor(inputField,terminal,terminal._cursorBlinkRate);
	terminal._cursor.style.display = "inline";
	terminal.html.onclick = function() {
		inputField.focus();
	};
	inputField.onkeydown = function(e) {
		if(e.key == "ArrowLeft" || e.key == "ArrowUp" || e.key == "ArrowRight" || e.key == "ArrowDown" || e.key == "Tab") {
			e.preventDefault();
			if(terminal._keyDownCallback != null) {
				terminal._keyDownCallback(e);
			}
		} else if(e.key != "Enter") {
			window.setTimeout(function() {
				terminal._inputLine.textContent = inputField.value;
			},1);
		} else {
			terminal.validate();
		}
	};
	inputField.focus();
};
terminaljs_Terminal.prototype = {
	validate: function() {
		var inputValue = this._inputField.value;
		this._inputLine.textContent = "";
		this._inputField.value = "";
		this.print(this._preCursor + inputValue);
		this._callback(inputValue);
	}
	,print: function(message) {
		var newLine = window.document.createElement("p");
		newLine.style.margin = "0";
		newLine.style.fontFamily = "inherit";
		newLine.innerHTML = message;
		this._output.appendChild(newLine);
		this.scrollToBottom();
	}
	,append: function(element) {
		this._output.appendChild(element);
		this.scrollToBottom();
	}
	,scrollToBottom: function() {
		this.html.scrollTop = this.html.scrollHeight;
	}
	,input: function(callback) {
		this._callback = callback;
		terminaljs_Terminal.initInput(this);
	}
	,keyDown: function(callback) {
		this._keyDownCallback = callback;
	}
	,clear: function() {
		this._output.innerHTML = "";
	}
	,setTextSize: function(size) {
		this._output.style.fontSize = size;
		this._input.style.fontSize = size;
	}
	,setTextColor: function(col) {
		this.html.style.color = col;
		this._cursor.style.background = col;
	}
	,setBackgroundColor: function(col) {
		this.html.style.background = col;
		this._cursor.style.color = col;
	}
	,setWidth: function(width) {
		this.html.style.width = width;
	}
	,setHeight: function(height) {
		this.html.style.height = height;
	}
	,setPrompt: function(prompt) {
		this._preCursor = prompt;
		this._inputLinePre.innerHTML = this._preCursor;
	}
	,setCursorBlinkRate: function(blinkRate) {
		this._cursorBlinkRate = blinkRate;
	}
	,blinkCursor: function(value) {
		this._shouldBlinkCursor = value;
	}
	,setInput: function(value) {
		this._inputField.value = value;
		this._inputLine.textContent = this._inputField.value;
	}
	,focus: function() {
		this._inputField.focus();
	}
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
Website.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
