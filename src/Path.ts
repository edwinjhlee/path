import fs from "fs"
import F from "fs-extra"

import P from "path"

import { Folder } from "./Folder"
import { File } from "./File"

export class Path{
    
    public readonly path: string
    constructor(path: string){
        this.path = Path.noSlash(path)
    }

    public c(...p: Array<string>){
        let path = this.path
        for (let e of p){
            path += "/" + e
        }
        return new Path(path)
    }

    public getParts(){
        return this.path.split("/")
    }

    public static noSlash(p: string): string{
        return p.indexOf("/")? p.slice(0, p.length-1) : p
    }

    public toFile(): File{
        return new File(this.path)
    }

    public toFolder(): Folder{
        return new Folder(this.path)
    }

    public exists(): Promise<boolean>{
        return F.pathExists(this.path)
    }

    public existsSync(): boolean{
        return F.pathExistsSync(this.path)
    }

}
