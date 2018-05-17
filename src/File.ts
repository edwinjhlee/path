import fs from "fs"
import F from "fs-extra"

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

    public readAsString(): string{
        return ""
    }

    public getLineReader(){
        
    }

}