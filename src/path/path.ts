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

    parent(): Directory {
        return new Directory(this.start, this.seperator, [...this.content.slice(0, this.content.length-1)])
    }

    next(...next: string[]): Path {
        return new Path(this.start, this.seperator, [...this.content, ...next])
    }

    stat$(){
        return fs.statSync(this.dump())
    }

    /*
        if (s.isFile()) return new File(this.start, this.seperator, this.content)
        if (s.isDirectory()) return new Directory(this.start, this.seperator, this.content)
    */

    mkdirp$(...next: string[]) {
        return this.toDirectory(...next).mkdirp$()
    }

    toDirectory(...next: string[]) {
        return new Directory(this.start, this.seperator, [...this.content, ...next])
    }

    toFile(...next: string[]) {
        return new File(this.start, this.seperator, [...this.content, ...next])
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

    static app(){

    }

    static tmp(){

    }

}

export default Path
