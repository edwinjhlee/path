
export type GET = {
    size(): Promise<number>
    type(): Promise<"File" | "Folder">

    mtime(): Promise<number>
    atime(): Promise<number>
    mod(): Promise<void> // TODO

    body: {
        all(): Promise<string>,
        range(start: number, end: number): Promise<string>
        lastLine(from: number): Promise<string>
        firstLine(nlines: number, from: number): Promise<string>
    }
}

export type SET = {

    utime(utime: number): Promise<void>
    atime(atime: number): Promise<void>

    mod(): Promise<void>

    body: {
        append(content: string): Promise<string>
        overrite(content: string): Promise<string>
        range(content: string, start: number, end: number): Promise<string>
    }
}

export abstract class Storage{

    get: GET = {} as GET
    set: SET = {} as SET

}





