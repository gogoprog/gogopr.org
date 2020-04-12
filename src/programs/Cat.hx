package programs;

class Cat extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var http = new haxe.Http(args);
        http.onData = function(data:String) {
            terminal.print(data);
        }
        http.request();
    }
}
