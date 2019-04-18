import fs from "fs-extra"
import { Directory } from "./Directory";

import { result } from "@utilx/semantic"
import Http from "./http";
import { AxiosInstance } from "axios";
import { File } from "./File";

export class Path{

    constructor(
        public start: string,
        public seperator: string = "/",
        public content: string[] = []
    ){

    }

    l(...next: string[]): this {
        return new ((this as any).constructor)(this.start, this.seperator, [...this.content, ...next])
    }

    parent(){
        return new ((this as any).constructor)(this.start, this.seperator, [...this.content.slice(0, this.content.length-1)])
    }

    next(...next: string[]): Path {
        return new Path(this.start, this.seperator,  [...this.content, ...next])
    }

    isFile$(){
        const s = fs.statSync(this.dump())
        return s.isFile()
    }

    /*
        if (s.isFile()) return new File(this.start, this.seperator, this.content)
        if (s.isDirectory()) return new Directory(this.start, this.seperator, this.content)
    */

    toDirectory() {
        return new Directory(this.start, this.seperator, this.content)
    }

    toFile() {
        return new File(this.start, this.seperator, this.content)
    }

    async assertDirectory(){
        const p = this.dump()
        const s = await fs.stat(p)
        if (s.isDirectory()) {
            return result.success(this.toDirectory())
        } else {
            return result.failure<this>(new Error("Not a directory"))
        }
    }

    async ensureDirectory(){
        const p = this.dump()
        await fs.mkdirp(p)
        return this.assertDirectory()
    }

    async assertParent(){
        await this.parent().assertDirectory()
        return this
    }

    async ensureParent(){
        await this.parent().ensureDirectory()
        return this
    }

    assertDirectory$(){
        const p = this.dump()
        const s = fs.statSync(p)
        if (s.isDirectory()) {
            return result.success(new Directory(this.start, this.seperator, this.content))
        } else {
            return result.failure<Directory>(new Error("Not a directory"))
        }
    }

    ensureDirectory$(){
        const p = this.dump()
        fs.mkdirpSync(p)
        return this.assertDirectory$()
    }

    assertParent$(){
        this.parent().assertDirectory$()
        return this
    }

    ensureParent$(){
        this.parent().ensureDirectory$()
        return this
    }

    dump(){
        return `${this.start}${this.content.join('/')}`
    }

    static http(client: AxiosInstance | undefined = undefined){
        return new Http(false, client)
    }

    static https(){
        return new Http(true)
    }

    static posix(){
        return new Path("/", "/")
    }

}

export default Path
