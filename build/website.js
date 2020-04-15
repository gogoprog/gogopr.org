// Generated by Haxe 3.4.7
(function ($hx_exports) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
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
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
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
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = it.iterator();
	while(x.hasNext()) {
		var x1 = x.next();
		if(f(x1)) {
			return true;
		}
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
};
var _$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
$hxClasses["_List.ListNode"] = _$List_ListNode;
_$List_ListNode.__name__ = true;
var _$List_ListIterator = function(head) {
	this.head = head;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
};
var Macro = function() { };
$hxClasses["Macro"] = Macro;
Macro.__name__ = true;
Math.__name__ = true;
var Program = function() {
};
$hxClasses["Program"] = Program;
Program.__name__ = true;
Program.__interfaces__ = [Executable];
Program.prototype = {
	run: function(terminal,args) {
		terminal.print("Error");
	}
};
var Script = function(data) {
	this.lines = [];
	this.lines = data.split("\n");
};
$hxClasses["Script"] = Script;
Script.__name__ = true;
Script.__interfaces__ = [Executable];
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
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) {
		return null;
	}
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	case 9:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8]);
	case 10:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
	case 11:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
	case 12:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11]);
	case 13:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
	case 14:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12],args[13]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
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
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
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
		this.terminal.setBackgroundColor("rgba(0,0,0,0.35)");
		window.document.body.appendChild(this.terminal.html);
		this.terminal.print("Terminal initialized...");
	}
	,initFileSystem: function() {
		this.fileSystem = new fs_FileSystem();
		var files = ["src/programs/Clear.hx","src/programs/Games.hx","src/programs/Help.hx","src/programs/Echo.hx","src/programs/Cat.hx","src/programs/Cd.hx","src/programs/Ls.hx"];
		var _g = 0;
		while(_g < files.length) {
			var file = files[_g];
			++_g;
			var name = new haxe_io_Path(file).file;
			var lowName = name.toLowerCase();
			this.terminal.print("Registering program: " + lowName);
			var node = this.fileSystem.registerFile("/bin/" + lowName,fs_FileType.BuiltinBinary);
			var pgm = Type.createInstance(Type.resolveClass("programs." + name),[]);
			node.executable = pgm;
		}
		var files1 = ["static/var/foo.txt","static/var/scripts/startup","static/var/scripts/foo","static/var/welcome.txt","static/var/games/items.toml","static/var/games/items.json","static/images/chaos.png","static/images/care.png","static/images/crappybird.jpg","static/images/ship.gif","static/images/neon.webp","static/images/dnight.gif","static/images/redneck.jpg","static/images/onap.jpg","static/images/bananaaffair.png","static/images/elm.gif","static/images/bloody.png","static/images/doommap.png","static/images/blind.png","static/images/pastafaria.png","static/images/fish.png","static/images/chamosqui.png","static/images/straycatfever.png","static/images/coolguys.png","static/images/pacman.png","static/images/smm.gif","static/css/style.css"];
		var _g1 = 0;
		while(_g1 < files1.length) {
			var file1 = files1[_g1];
			++_g1;
			this.terminal.print("Registering file: " + file1);
			var endPath = HxOverrides.substr(file1,6,null);
			var node1 = this.fileSystem.registerFile(endPath,fs_FileType.WebFile);
			node1.url = file1;
		}
		var files2 = ["src/programs/Clear.hx","src/programs/Games.hx","src/programs/Help.hx","src/programs/Echo.hx","src/programs/Cat.hx","src/programs/Cd.hx","src/programs/Ls.hx","src/WebOS.hx","src/fs/FileSystem.hx","src/Executable.hx","src/Script.hx","src/Website.hx","src/Macro.hx","src/Program.hx"];
		var _g2 = 0;
		while(_g2 < files2.length) {
			var file2 = files2[_g2];
			++_g2;
			this.terminal.print("Registering file: " + file2);
			var node2 = this.fileSystem.registerFile(file2,fs_FileType.WebFile);
			node2.url = file2;
		}
		this.cwd = this.fileSystem.getFile("/");
	}
	,onInit: function() {
		this.updatePrompt();
		this.execute("/var/scripts/startup");
		this.terminal.input($bind(this,this.execute));
		this.terminal.keyDown($bind(this,this.keyDown));
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
};
var fs_FileType = { __ename__ : true, __constructs__ : ["Unset","Directory","BuiltinBinary","WebFile"] };
fs_FileType.Unset = ["Unset",0];
fs_FileType.Unset.__enum__ = fs_FileType;
fs_FileType.Directory = ["Directory",1];
fs_FileType.Directory.__enum__ = fs_FileType;
fs_FileType.BuiltinBinary = ["BuiltinBinary",2];
fs_FileType.BuiltinBinary.__enum__ = fs_FileType;
fs_FileType.WebFile = ["WebFile",3];
fs_FileType.WebFile.__enum__ = fs_FileType;
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
		var http = new haxe_Http(this.url);
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
		var _g1 = 0;
		var _g = names.length;
		while(_g1 < _g) {
			var i = _g1++;
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
		var _g1 = 0;
		var _g = names.length;
		while(_g1 < _g) {
			var i = _g1++;
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
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
	this.withCredentials = false;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) {
				return;
			}
			var s;
			try {
				s = r.status;
			} catch( e ) {
				s = null;
			}
			if(s != null && "undefined" !== typeof window) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) {
					if(r.responseText != null) {
						s = 200;
					} else {
						s = 404;
					}
				}
			}
			if(s == undefined) {
				s = null;
			}
			if(s != null) {
				me.onStatus(s);
			}
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else {
				switch(s) {
				case 12007:
					me.req = null;
					me.onError("Unknown host");
					break;
				case 12029:
					me.req = null;
					me.onError("Failed to connect to host");
					break;
				default:
					me.req = null;
					me.responseData = r.responseText;
					me.onError("Http Error #" + r.status);
				}
			}
		};
		if(this.async) {
			r.onreadystatechange = onreadystatechange;
		}
		var uri = this.postData;
		if(uri != null) {
			post = true;
		} else {
			var _g_head = this.params.h;
			while(_g_head != null) {
				var val = _g_head.item;
				_g_head = _g_head.next;
				var p = val;
				if(uri == null) {
					uri = "";
				} else {
					uri += "&";
				}
				var s1 = p.param;
				var uri1 = encodeURIComponent(s1) + "=";
				var s2 = p.value;
				uri += uri1 + encodeURIComponent(s2);
			}
		}
		try {
			if(post) {
				r.open("POST",this.url,this.async);
			} else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question ? "?" : "&") + uri,this.async);
				uri = null;
			} else {
				r.open("GET",this.url,this.async);
			}
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		r.withCredentials = this.withCredentials;
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) {
			r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		}
		var _g_head1 = this.headers.h;
		while(_g_head1 != null) {
			var val1 = _g_head1.item;
			_g_head1 = _g_head1.next;
			var h1 = val1;
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) {
			onreadystatechange(null);
		}
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
};
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
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
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
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	}
	if(typeof ActiveXObject != "undefined") {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
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
		var container = window.document.createElement("div");
		container.className = "games";
		var items = data.items;
		var args = argsLine.split(" ");
		if(args[0] == "list") {
			var onclick = function(i) {
				return function() {
					terminal.setInput("games show " + i);
					terminal.validate();
				};
			};
			var i1 = 0;
			var _g = 0;
			while(_g < items.length) {
				var item = items[_g];
				++_g;
				var el = window.document.createElement("div");
				var img = window.document.createElement("div");
				img.style.backgroundImage = "url(static/" + Std.string(item.image) + ")";
				el.appendChild(img);
				container.appendChild(el);
				img.onclick = onclick(i1);
				++i1;
			}
			terminal.print("Non-exhaustive list of games I made in my free time or for game jams:");
			terminal.append(container);
		} else if(args[0] == "show") {
			var index = Std.parseInt(args[1]);
			var item1 = items[index];
			var img1 = window.document.createElement("div");
			img1.className = "games show";
			img1.style.backgroundImage = "url(static/" + item1.image + ")";
			terminal.append(img1);
			terminal.print("Title: " + item1.title);
			terminal.print("Infos:");
			terminal.print(item1.description);
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
		var scripts = fs.getFile("/scripts");
		var _g2 = 0;
		var _g11 = scripts.children;
		while(_g2 < _g11.length) {
			var file1 = _g11[_g2];
			++_g2;
			terminal.print("  " + file1.name);
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
			},0);
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
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
$hxClasses["Math"] = Math;
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
Website.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this);
