import haxe.macro.Context;
import haxe.macro.Expr;

class Macro {
    public static macro function getFilePaths(folder:String) {
        if(!sys.FileSystem.exists(folder)) {
            return macro $a {[]};
        }

        function fillFilePaths(folder:String, result:Array<String>) {
            var files = sys.FileSystem.readDirectory(folder);

            for(file in files) {
                var fullPath = folder + "/" + file;

                if(sys.FileSystem.isDirectory(fullPath)) {
                    fillFilePaths(fullPath, result);
                } else {
                    result.push(fullPath);
                }
            }
        }
        var files = [];
        fillFilePaths(folder, files);
        var exprs = [for(file in files) macro $v {file}];
        return macro $a {exprs};
    }
}
