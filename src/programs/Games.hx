package programs;

import js.Browser.document;

class Games extends Program {
    public function new() {
        super();
    }

    override public function run(terminal:terminaljs.Terminal, argsLine:String) {
        var f = WebOS.instance.resolveFile("/var/games/items.json");
        f.getContent();
        var data = haxe.Json.parse(f.data);
        var container = document.createElement("div");
        container.className = "games";
        var items:Array<Dynamic> = cast data.items;
        var args = argsLine.split(" ");

        if(args[0] == "list") {
            function onclick(i:Int) {
                return function() {
                    terminal.setInput("games show " + i);
                    terminal.validate();
                }
            }
            var i=0;

            for(item in items) {
                var el = document.createElement("div");
                var img = document.createElement("div");
                img.style.backgroundImage = 'url(static/${item.image})';
                el.appendChild(img);
                container.appendChild(el);
                img.onclick = onclick(i);
                ++i;
            }

            terminal.print("Non-exhaustive list of games I made in my free time or for game jams:");
            terminal.append(container);
        } else if(args[0] == "show") {
            var index = Std.parseInt(args[1]);
            var item = items[index];
            var img = document.createElement("div");
            img.className = "games show";
            img.style.backgroundImage = 'url(static/${item.image})';
            terminal.append(img);
            terminal.print("Title: " + item.title);
            terminal.print("Infos:");
            terminal.print(item.description);
        } else {
            terminal.print("Usage: games [command]");
            terminal.print("Available commands:");
            terminal.print("  list");
            terminal.print("  show [index]");
        }
    }
}
