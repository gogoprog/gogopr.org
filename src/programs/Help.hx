package programs;

class Help extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var fs = WebOS.instance.fileSystem;
        terminal.print("Available commands:");
        var bin = fs.getFile("/bin");

        for(file in bin.children) {
            terminal.print("  " + file.name);
        }

        var scripts = fs.getFile("/scripts");

        for(file in scripts.children) {
            terminal.print("  " + file.name);
        }
    }
}
