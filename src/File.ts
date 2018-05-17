import fs from "fs"

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