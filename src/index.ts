import fs from "fs"
import { resolve } from "url";

export class Path{
    
    public readonly path: string
    constructor(path: string){
        this.path = Path.noSlash(path)
    }

    public c(p: string){
        const path = this.path + "/" + p
        return new Path(path)
    }

    public static noSlash(p: string): string{
        return p.indexOf("/")? p.slice(0, p.length-1) : p
    }

    public toFile(): File{
        return new File(this.path)
    }

    public toDirectory(): Directory{
        return new Directory(this.path)
    }

    public exists(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            fs.exists(this.path, resolve)
        })
    }

    public existsSync(): boolean{
        return fs.existsSync(this.path)
    }

}

// No /
export class File extends Path{
    
    public async create(){
        return this.createAndWrite("")
    }

    public async append(astr: string){
        if (await this.exists() === false){
            throw new Error("Not exists")
        }
        return new Promise( (resolve, reject) => {
            fs.appendFile(this.path, astr, (err)=>{
                if (err) reject(err)
                else resolve()
            })
        })
    }

    public async write(astr: string){
        return new Promise( (resolve, reject) => {
            fs.writeFile(this.path, astr, (err)=>{
                if (err) reject(err)
                else resolve()
            })
        })
    }

    public async createAndWrite(astr: string) {
        if (await this.exists()){
            throw new Error("Already exists")
        }
        return this.write(astr)
    }

    public readAsString(): string{
        return ""
    }

    public getLineReader(){
        
    }

}

// With /
export class Directory extends Path{
    // list files

    public getPathWithSlash(){
        return this.path + "/"
    }

    public create(){
        return new Promise((resolve, reject) => {
            fs.mkdir(this.path, (e) => {
                if (e){
                    reject(e)
                } else {
                    resolve()
                }
            })
        })
    }

    public createSync(){
        return fs.mkdirSync(this.path)
    }

}
