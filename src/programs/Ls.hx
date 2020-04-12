package programs;

class Ls extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var fs = WebOS.instance.fileSystem;
        var f = fs.getFile(args);

        for(child in f.children) {
            terminal.print(child.name);
        }
    }
}
