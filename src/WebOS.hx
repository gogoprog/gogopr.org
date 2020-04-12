class WebOS {
    static public var instance:WebOS;
    public var terminal:terminaljs.Terminal;
    public var executables:Map<String, Executable> = new Map();
    private var loadingItems:Int = 0;

    public function new() {
        instance = this;
        initTerminal();
        initPrograms();
    }

    public function boot() {
    }

    public function execute(input:String) {
        var words = input.split(" ");
        var cmd = words[0];
        var exe = executables[cmd];

        if(cmd.length > 0) {
            if(exe != null) {
                words.shift();
                exe.run(terminal, words.join(" "));
            } else {
                terminal.print("Unknown command: " +  cmd);
            }
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
        terminal.print("Loading...");
    }

    private function initPrograms() {
        executables["cat"] = new programs.Cat();
        executables["echo"] = new programs.Echo();
        executables["help"] = new programs.Help();
        executables["welcome"] = new Script("static/bin/welcome");
    }

    private function onInit() {
        terminal.clear();
        execute("welcome");
        terminal.input(execute);
    }
}
