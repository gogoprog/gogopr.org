class WebOS {
    static public var instance:WebOS;
    private var terminal:terminaljs.Terminal;
    private var executables:Map<String, Executable> = new Map();

    public function new() {
        instance = this;
        initTerminal();
        initPrograms();
    }

    public function boot() {
        welcome();
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

    private function initTerminal() {
        terminal = new terminaljs.Terminal();
        terminal.setHeight("100%");
        terminal.setWidth("100%");
        terminal.setBackgroundColor("rgba(0,0,0,0.35)");
        terminal.setPrompt("[<span style='color:yellow'>user</span>@<span style='color:grey'>gogopr.org</span>]$ ");
        js.Browser.document.body.appendChild(terminal.html);
        terminal.input(execute);
    }

    private function initPrograms() {
        executables["cat"] = new programs.Cat();
        executables["echo"] = new programs.Echo();
        executables["welcome"] = new Script("static/bin/welcome");
    }

    private function welcome() {
    }
}
