package fs;

enum FileType {
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
}

class FileSystem {
    private var root:FileNode = new FileNode(null, Directory, "");

    public function new() {
    }

    public function registerFile(fullPath:String, type:FileType) {
        var node = new FileNode(null, type, fullPath);
        trace(fullPath);
        return node;
    }
}
