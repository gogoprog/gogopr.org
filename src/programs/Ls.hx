package programs;

class Ls extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var f = WebOS.instance.resolveFile(args);

        for(child in f.children) {
            terminal.print(child.name);
        }
    }
}
