import fs.FileSystem;

class WebOS {
    static public var instance:WebOS;

    public var terminal:terminaljs.Terminal;
    public var fileSystem:fs.FileSystem;
    public var cwd:fs.FileNode;

    private var history:Array<String> = [];
    private var historyIndex:Int;

    public function new() {
        instance = this;
        initTerminal();
    }

    public function boot() {
        initFileSystem();
        terminal.print("WebOS Initialization completed.");
        haxe.Timer.delay(onInit, 500);
    }

    public function setInputAndValidate(input:String) {
        terminal.setInput(input);
        terminal.validate();
    }

    public function execute(input:String) {
        var words = input.split(" ");
        var cmd = words[0];

        if(cmd.length > 0) {
            history.push(input);
            historyIndex = history.length;

            try {
                var slash = cmd.indexOf("/");

                if(slash == -1) {
                    if(runFromPath("/bin", words)) {
                        return;
                    } else {
                        terminal.print("Unknown command: " +  cmd);
                    }

                    return;
                } else {
                    if(slash == 0) {
                        if(runFromPath("", words)) {
                            return;
                        } else {
                            terminal.print("Cannot find " + cmd);
                        }
                    } else {
                        if(runFromPath(cwd.getFullPath(), words)) {
                            return;
                        } else {
                            terminal.print("Cannot find " + cmd);
                        }
                    }
                }
            } catch(e:Dynamic) {
                terminal.print("<span style='color:red'>Error: " + e + "</span>");
            }
        }
    }

    public function updatePrompt() {
        terminal.setPrompt("[<span style='color:yellow'>user</span>@<span style='color:grey'>gogopr.org</span>:" + cwd.getFullPath() +"/]$ ");
    }

    public function resolveFile(input:String):FileNode {
        if(input == null || input == "") {
            return cwd;
        }

        if(input.charAt(0) == "/") {
            return fileSystem.getFile(input);
        } else {
            return fileSystem.getFile(cwd.getFullPath() + "/" + input);
        }
    }

    private function keyDown(e:Dynamic) {
        if(e.key == "ArrowUp") {
            historyIndex--;

            if(historyIndex< 0) {
                historyIndex = 0;
            }

            terminal.setInput(history[historyIndex]);
        } else if(e.key == "ArrowDown") {
            historyIndex++;

            if(historyIndex >= history.length) {
                historyIndex = history.length - 1;
            }

            terminal.setInput(history[historyIndex]);
        }
    }

    private function initTerminal() {
        terminal = new terminaljs.Terminal();
        terminal.setHeight("100%");
        terminal.setWidth("100%");
        terminal.setTextColor("#eee");
        terminal.setBackgroundColor("rgba(0,0,0,0.35)");
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
            }
        }
        {
            var files = Macro.getFilePaths("src");

            for(file in files) {
                terminal.print("Registering file: " + file);
                var node = fileSystem.registerFile(file, WebFile);
                node.url = file;
            }
        }
        cwd = fileSystem.getFile("/");
    }

    private function onInit() {
        updatePrompt();
        execute("/var/scripts/startup");
        terminal.input(execute);
        terminal.keyDown(keyDown);
    }

    private function runFromPath(path, words):Bool {
        var cmd = words[0];
        var file = resolveFile(path + "/" + cmd);

        if(file != null) {
            words.shift();
            file.execute(terminal, words.join(" "));
            return true;
        }

        return false;
    }
}
