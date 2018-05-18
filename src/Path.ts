export class Path{
    
    public readonly path: string
    constructor(path: string){
        this.path = Path.noSlash(path)
    }

    public build(path: string): Path{
        return new Path(path)
    }

    public c(...p: Array<string>){
        let path = this.path
        for (let e of p){
            path += "/" + e
        }
        return this.build(path)
    }

    public getParts(){
        return this.path.split("/")
    }

    public static noSlash(p: string): string{
        return p.indexOf("/")? p.slice(0, p.length-1) : p
    }
}