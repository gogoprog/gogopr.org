package programs;

class Cd extends Program {
    public function new() {
        super();
    }

    override public function run(terminal, args) {
        var os = WebOS.instance;
        var file = os.resolveFile(args);

        if(file != null && file.type == Directory) {
            os.cwd = file;
            os.updatePrompt();
        } else {
            terminal.print("No such directory");
        }
    }
}
