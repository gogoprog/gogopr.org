class Script implements Executable {
    private var lines:Array<String> = [];

    public function new(?file:String) {
        if(file != null) {
            loadFromFile(file);
        }
    }

    public function run(terminal, args) {
        for(line in lines) {
            WebOS.instance.execute(line);
        }
    }

    public function loadFromFile(file:String) {
        var http = new haxe.Http(file);
        http.onData = function(data:String) {
            lines = data.split("\n");
        }
        http.request();
    }
}
