import fs from "fs"
import F from "fs-extra"


import { Path } from "./Path"
import P from "path"

import * as t from "./types"

// With /
export class Folder extends Path{
    // list files

    public getPathWithSlash(){
        return this.path + "/"
    }

    public create(){
        return Folder.make(this.path)
    }

    public static make(path: string){
        return new Promise((resolve, reject) => {
            fs.mkdir(path, (e) => {
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

    public async createAll(){
        await Folder.mkdirp(this.path)
    }

    public async list(){
        return Folder.list(this.path)
    }

    public static async list(path: string){
        return new Promise<string[]>( (resolve, reject) => {
            fs.readdir(path, (e, files) => {
                if (e) {
                    reject(e)
                } else {
                    resolve(files)
                }
            })
        })
    }

    public static async listRecursively(path: string): Promise<t.FolderContainer>{
        const listed_files = await Folder.list(path)
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

    public static async mkdirp(path: string){
        //
        try{
            await Folder.make(path)
        } catch(err) {
            const dir = P.dirname(path)
            await Folder.mkdirp(dir)
            await Folder.make(path)
        }
    }

}
