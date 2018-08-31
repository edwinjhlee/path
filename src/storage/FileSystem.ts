import { Storage } from "./index"

import fse from "fs-extra"

// TODO: 变阵：get.size() 变成：size.get(), mtime.get(), mtime.set()

export class FileSystem extends Storage{
    
    constructor(
        public url: string
    ){
        super()

        const that = this

        this.atime = {
            ...super.atime,
            async get(): Promise<number | Symbol> {
                return (await that.stat()).size
            },
            async set(number: number): Promise<Symbol | void> {
                await fse.utimes(that.url, number, number)
            }
        }

        this.type = {
            async get(){
                const stat =  await that.stat()
                return stat.isFile? "File" :
                    stat.isDirectory? "Folder":
                    "Other"
            }
        }

        this.body = {
            get: {
                ... that.body.get
            },
            set: {
                ...that.body.set,
                async append(content: string): Promise<void | Symbol>{
                    return fse.appendFile(that.url, content)
                },
                async range(content: string, start: number, end: number): Promise<void | Symbol> {
                    
                    // return fse.write()
                }
            }
            
        }

    }

    async stat(){
        return await fse.stat(this.url)
    }

}

new FileSystem("").get.stats()



