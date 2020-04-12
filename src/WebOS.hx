import fs.FileSystem;

class WebOS {
    static public var instance:WebOS;

    public var terminal:terminaljs.Terminal;
    public var fileSystem:fs.FileSystem;
    public var cwd:fs.FileNode;


    private var loadingItems:Int = 0;

    public function new() {
        instance = this;
        initTerminal();
        initFileSystem();
    }

    public function boot() {
    }

    public function execute(input:String) {
        try {
            var words = input.split(" ");
            var cmd = words[0];

            if(cmd.length > 0) {
                var slash = cmd.indexOf("/");

                if(slash == -1) {
                    if(runFromPath("/bin", words) || runFromPath("/scripts", words)) {
                        return;
                    }
                }

                terminal.print("Unknown command: " +  cmd);
            }
        } catch(e:Dynamic) {
            terminal.print("<span style='color:red'>Error: " + e + "</span>");
        }
    }

    public function increaseLoadingItem() {
        loadingItems++;
    }

    public function decreaseLoadingItem() {
        loadingItems--;

        if(loadingItems == 0) {
            terminal.print("System fully loaded.");
            haxe.Timer.delay(onInit, 1000);
        }
    }

    private function initTerminal() {
        terminal = new terminaljs.Terminal();
        terminal.setHeight("100%");
        terminal.setWidth("100%");
        terminal.setBackgroundColor("rgba(0,0,0,0.35)");
        terminal.setPrompt("[<span style='color:yellow'>user</span>@<span style='color:grey'>gogopr.org</span>]$ ");
        js.Browser.document.body.appendChild(terminal.html);
        terminal.print("Terminal initialized...");
    }

    private function initFileSystem() {
        fileSystem = new fs.FileSystem();
        {
            var files = Macro.getFilePaths("src/programs");

            for(file in files) {
                var name = new haxe.io.Path(file).file;
                var lowName = name.toLowerCase();
                terminal.print("Registering program: " + lowName);
                var node = fileSystem.registerFile("/bin/" + lowName, BuiltinBinary);
                var pgm:Program = Type.createInstance(Type.resolveClass('programs.${name}'), []);
                node.executable = pgm;
            }
        }
        {
            var files = Macro.getFilePaths("static");

            for(file in files) {
                terminal.print("Registering file: " + file);
                var endPath = file.substr(6);
                var node = fileSystem.registerFile(endPath, WebFile);
                node.url = file;

                if(endPath.substr(0, 8) == "/scripts") {
                    node.loadContent();
                }
            }
        }
        cwd = fileSystem.getFile("/");
    }

    private function onInit() {
        terminal.clear();
        execute("welcome");
        terminal.input(execute);
    }

    private function runFromPath(path, words):Bool {
        var bin = fileSystem.getFile(path);
        var cmd = words[0];

        for(file in bin.children) {
            if(file.name == cmd) {
                words.shift();
                file.execute(terminal, words.join(" "));
                return true;
            }
        }

        return false;
    }
}
