class Script implements Executable {
    private var lines:Array<String> = [];

    public function new(data:String) {
        lines = data.split("\n");
    }

    public function run(terminal, args) {
        for(line in lines) {
            WebOS.instance.execute(line);
        }
    }
}
