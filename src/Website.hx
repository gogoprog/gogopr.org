import js.Browser.document;
import js.Browser.window;

class Website {
    static public function main() {
        var webos = new WebOS();
        webos.boot();
        window.onload = function() {
            document.querySelector(".quicklinks .games").onclick = function() {
                webos.setInputAndValidate("games list");
            };
            document.querySelector(".quicklinks .contact").onclick = function() {
                webos.setInputAndValidate("cat /var/contact.html");
            };
        };
    }
}
