import Path from "./path";
import fs from "fs-extra"
import { File } from "./File";

export class Directory extends Path {

    // Files
    // Directory
    // Patterns

    mkdirp$(){
        fs.mkdirpSync(this.dump())
        return this
    }

    assert$() {
        return this.stat$().isDirectory()
    }

    list$() {
        // transfer to path
        const objList = fs.readdirSync(this.dump())
        return objList.map(e => this.next(e))
    }

    visit$(handle: (f: File | Directory) => void){
        for (const p of this.list$()) {
            try {
                p.mkdirp$().visit$(handle)
            } catch (err) {
                handle(p.toFile())
            }
        }
    }

    rm$() {
        fs.rmdirSync(this.dump())
        return this
    }

    rmrf$(){
        // Will remove sub files
        fs.removeSync(this.dump())
        return this
    }

    file(filename: string){
        return new File(filename)
    }

}
