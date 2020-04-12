package programs;

class Help extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var webos = WebOS.instance;
        terminal.print("Available commands:");

    }
}
