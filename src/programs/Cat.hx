package programs;

class Cat extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var file = WebOS.instance.resolveFile(args);
        file.getContent(function(data) {
            terminal.print(data);
        });
    }
}
