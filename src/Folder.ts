import fs from "fs"
import F from "fs-extra"


import { Poxis } from "./Poxis"
import P from "path"

import * as t from "./types"

// With /
export class Folder extends Poxis{
    // list files

    public getPathWithSlash(){
        return this.path + "/"
    }

    public create(){
        return F.mkdir(this.path)
    }

    public createSync(){
        return fs.mkdirSync(this.path)
    }

    public async createAll(){
        return F.mkdirp(this.path)
    }

    public async read(){
        return F.readdir(this.path)
    }

    public static async listRecursively(path: string): Promise<t.FolderContainer>{
        const listed_files = await F.readdir(path)
        const files: Array<string> = []
        const folders: Array<t.FolderContainer> = []
        for (const f of listed_files) {
            const s = await F.stat(f)
            if (s.isFile()){
                files.push(f)
            } else {
                folders.push(await this.listRecursively(path + "/" + f))
            }
        }
        return { files, folders }
    }

}
