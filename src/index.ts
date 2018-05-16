
export class Path{
    
    public readonly path: string
    constructor(path: string){
        this.path = Path.noSlash(path)
    }

    public c(p: string){
        const path = this.path + "/" + p
        return new Path(path)
    }

    public static noSlash(p: string): string{
        return p.indexOf("/")? p.slice(0, p.length-1) : p
    }

    public exists(): boolean{
        return true
    }


}

// No /
export class File extends Path{
    // 
}

// With /
export class Directory extends Path{
    // list files
}
