import { Storage } from "./index"

import fse from "fs-extra"


export class FileSystem extends Storage{
    
    constructor(
        public url: string
    ){
        super()

        this.get = {
            ...this.get,
            mtime: async () => {
                const stat = await fse.stat(this.url)
                return stat.mtime.getTime()
            },
            atime: async () => {
                const stat = await fse.stat(this.url)
                return stat.atime.getTime() 
            }
        }

    }

}




