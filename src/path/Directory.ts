import Path from "./path";
import fs from "fs-extra"
import { File } from "./File";
import { result } from "@utilx/semantic";

export class Directory extends Path {

    // Files
    // Directory
    // Patterns
    list$() {
        // transfer to path
        return fs.readdirSync(this.dump())
    }

    rm$() {
        return fs.rmdirSync(this.dump())
    }

    rmrf$(){
        // TODO: maybe have to delete the files first
        return fs.rmdirSync(this.dump())
    }

    file(filename: string){
        return new File(filename)
    }

    ensureFile$(filename: string){
        const f = this.file(filename)
        const s = fs.statSync(f.dump())
        if ((undefined !== s) && (s.isFile() === false) ) {
            return result.failure<File>("Already exists and not a file")
        }
        return f
    }

    ensureFileExists$(filename: string){
        const f = this.file(filename)
        const s = fs.statSync(f.dump())
        if ((undefined === s)) return result.failure<File>("Not exisits")
        if ((undefined !== s) && (s.isFile())) {
            return result.success(f)
        } else {
            return result.failure<File>("Not a file")
        }
    }

}
