package fs;

enum FileType {
    Unset;
    Directory;
    BuiltinBinary;
    WebFile;
}

class FileNode {
    public var name:String;
    public var parent:FileNode;
    public var type:FileType;

    public var children:Array<FileNode>;

    public var executable:Executable;

    public var data:String;
    public var url:String;

    public function new(parent, type, name) {
        this.name = name;
        this.parent = parent;
        this.type = type;
    }

    public function setDirectory() {
        type = Directory;

        if(children == null) {
            children = [];
        }
    }

    public function getOrCreateChild(name:String):FileNode {
        for(child in children) {
            if(child.name == name) {
                return child;
            }
        }

        var node = new FileNode(this, Unset, name);
        children.push(node);
        return node;
    }

    public function getOrCreateChildDirectory(name:String):FileNode {
        var node = getOrCreateChild(name);
        node.setDirectory();
        return node;
    }

    public function getChild(name:String):FileNode {
        for(child in children) {
            if(child.name == name) {
                return child;
            }
        }

        return null;
    }

    public function getContent(?callback:String->Void) {
        if(data != null) {
            if(callback != null) {
                callback(data);
            }

            return;
        }

        var http = new haxe.Http(url);
        http.async = false;
        http.onData = function(data:String) {
            this.data = data;

            if(callback != null) {
                callback(data);
            }
        }
        http.request();
    }

    public function execute(terminal, args) {
        if(type == WebFile) {
            if(executable == null) {
                getContent();
                executable = new Script(data);
            }
        }

        if(executable != null) {
            executable.run(terminal, args);
        }
    }

    public function getFullPath():String {
        var result = name;
        var node = parent;

        while(node != null) {
            result = node.name + "/" + result;
            node = node.parent;
        }

        return result;
    }
}

class FileSystem {
    private var root:FileNode = new FileNode(null, Directory, "");

    public function new() {
        root.setDirectory();
    }

    public function registerFile(fullPath:String, type:FileType) {
        var names = fullPath.split("/");
        var parent = root;

        for(i in 0...names.length) {
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

    public function getFile(fullPath:String):FileNode {
        var names = fullPath.split("/");
        var node = root;

        for(i in 0...names.length) {
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
}
