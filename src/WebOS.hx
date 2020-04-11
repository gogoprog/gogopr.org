class WebOS {
    private var terminal:terminaljs.Terminal;

    public function new() {
        terminal = new terminaljs.Terminal();
        terminal.setHeight("100%");
        terminal.setWidth("100%");
        terminal.setBackgroundColor("rgba(0,0,0,0.2)");
        terminal.setPrompt("> ");
        js.Browser.document.body.appendChild(terminal.html);
        terminal.input(function(input) {
            trace(input);
        });
    }

    public function boot() {
        welcome();
    }

    private function welcome() {
        terminal.print("                                                    _              ");
        terminal.print(" ___ ___ ___ ___ ___ ___   ___ ___ ___    _ _ _ ___| |_    ___ ___ ");
        terminal.print("| . | . | . | . | . |  _|_| . |  _| . |  | | | | -_| . |  | . |_ -|");
        terminal.print("|_  |___|_  |___|  _|_| |_|___|_| |_  |  |_____|___|___|  |___|___|");
        terminal.print("|___|   |___|   |_|               |___|                            ");
        terminal.print("");
        terminal.print("Welcome to gogoprog's web operating system");
    }
}
