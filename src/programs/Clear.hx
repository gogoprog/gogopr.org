package programs;

class Clear extends Program {
    public function new() {
        super();
    }

    override public function run(terminal:terminaljs.Terminal, args:String) {
        terminal.clear();
    }
}
