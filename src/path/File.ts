import Path from "./path";
import fs from "fs-extra"

export class File extends Path {

    rm$() {
        return fs.remove(this.dump())
    }

    exists$(){
        return fs.existsSync(this.dump())
    }

    assert$(){
        return fs.statSync(this.dump()).isFile()
    }

    ensure$(){
        this.mkdirpForParent$()
        return (this.assert$()) ? this : undefined
    }

    read$(){
        return fs.readFileSync(this.dump())
    }

    write$(content: any){
        return fs.writeFileSync(this.dump(), content)
    }

    writeAfterMkdirp$(content: any){
        this.mkdirpForParent$().write$(content)
        return this
    }

    mkdirpForParent$(){
        fs.mkdirp(this.parent().dump())
        return this
    }

}
