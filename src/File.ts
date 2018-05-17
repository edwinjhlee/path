import fs from "fs"
import F from "fs-extra"

import LR from "line-reader"

import { Path } from "./Path"



// No /
export class File extends Path{
    
    public async create(){
        return this.createAndWrite("")
    }

    public async append(astr: string){
        if (await this.exists() === false){
            throw new Error("Not exists")
        }
        return F.appendFile(this.path, astr)
    }

    public async write(astr: string){
        return F.writeFile(this.path, astr)
    }

    public async createAndWrite(astr: string) {
        if (await this.exists()){
            throw new Error("Already exists")
        }
        return this.write(astr)
    }

    public async readAsString(): Promise<string> {
        const f = await File.read(this.path)
        return f.toString()
    }

    public getLineReader(){
        return new Promise((resolve, reject) => {
            LR.open(this.path, (err, reader) => {
                if (err) reject(err)
                else resolve(reader)
            })
        })
    }

    public eachline(iteratee: (line: string) => void){
        return LR.eachLine(this.path, iteratee)
    }

    public static read(path: string){
        return new Promise<Buffer>((resolve, reject) => {
            F.readFile(path, (e, data) => {
                if (e) reject(e)
                else resolve(data)
            })
        })
    }

}