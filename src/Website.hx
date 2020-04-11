class Website {
    static public function main() {
        var t = new terminaljs.Terminal();
        t.setHeight("100%");
        t.setWidth("100%");
        t.setBackgroundColor("rgba(0,0,0,0.2)");
        t.setPrompt('<span style="color:red;">@</span>$ ');
        js.Browser.document.body.appendChild(t.html);
        t.print('Hello, world!');
        t.input(function(input) {
            trace(input);
        });
    }
}
