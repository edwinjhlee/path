export class Path{

    public content: string[] = []
    constructor(
        public start: string,
        public seperator: string = "/"
    ){

    }

    l(...next: string[]): this{
        for (let v of next){
            this.content.push(v)
        }
        return this
    }

    toString(){
        return `${this.start}${this.content.join('/')}`
    }

    static http(){
        return new Path("http://")
    }

    static https(){
        return new Path("https://")
    }

    static posix(){
        return new Path("/", "/")
    }
}

export default Path
