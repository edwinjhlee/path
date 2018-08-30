import { Storage } from "./index"

import fse from "fs-extra"


export class FileSystem extends Storage<{
    stats: () => Promise<fse.Stats>
}, any>{
    
    constructor(
        public url: string
    ){
        super()

        this.get = {
            ...this.get,
            size: async () => {
                return (await this.get.stats()).size
            },
            type: async () => {
                const stat =  await this.get.stats()
                return stat.isFile? "File" :
                    stat.isDirectory? "Folder":
                    "Other"
            },
            mtime: async () => {
                const stat = await fse.stat(this.url)
                return stat.mtime.getTime()
            },
            atime: async () => {
                const stat = await fse.stat(this.url)
                return stat.atime.getTime() 
            },
            stats: async ()=>{
                return await fse.stat(this.url)
            }
        }

        this.set = {
            ...this.set,
            body: {
                async append(content: string): Promise<string> {
                    return ""
                },
                async overrite(content: string): Promise<string> {
                    return ""
                },
                async range(content: string, start: number, end: number): Promise<string> {
                    return ""
                }
            }
        }

    }

}

new FileSystem("").get.stats()



