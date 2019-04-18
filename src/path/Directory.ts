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
        const objList = fs.readdirSync(this.dump())
        return objList.map(e => this.next(e))
    }

    visit$(handle: (f: File | Directory) => void){
        for (const p of this.list$()) {
            const res = p.ensureDirectory$()
            if (true === res.ok) {
                res.data.visit$( handle )
            } else {
                handle( p.toFile() )
            }
        }
    }

    rm$() {
        return fs.rmdirSync(this.dump())
    }

    rmrf$(){
        // Will remove sub files
        return fs.removeSync(this.dump())
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
