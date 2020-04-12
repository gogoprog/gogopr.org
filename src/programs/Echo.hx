package programs;

class Echo extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        terminal.print(args);
    }
}
