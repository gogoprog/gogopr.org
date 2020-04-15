package programs;

import js.Browser.document;

class Games extends Program {
    public function new() {
        super();
    }

    override public function run(terminal:terminaljs.Terminal, args) {
        var f = WebOS.instance.resolveFile("/var/games/items.json");
        f.getContent();
        var data = haxe.Json.parse(f.data);
        var container = document.createElement("div");
        container.className = "games";
        var items:Array<Dynamic> = cast data.items;

        for(item in items) {
            var el = document.createElement("div");
            var img = document.createElement("div");
            img.style.backgroundImage= 'url(static/${item.image})';
            el.appendChild(img);
            container.appendChild(el);
            img.onclick = function() {
                terminal.setInput("echo " + item.title);
                terminal.validate();
            };
        }

        terminal.print("Non-exhaustive list of games I made in my free time or for game jams:");
        terminal.append(container);
    }
}
