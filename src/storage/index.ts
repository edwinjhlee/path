
export type GET = {
    size(): Promise<number>
    type(): Promise<"File" | "Folder" | "Other">

    mtime(): Promise<number>
    atime(): Promise<number>
    // mod(): Promise<void> // TODO

    body: {
        all(): Promise<string>,
        range(start: number, end: number): Promise<string>
        lastLine(from: number): Promise<string>
        firstLine(nlines: number, from: number): Promise<string>
    }
}

export type SET = {

    mtime(utime: number): Promise<void>
    atime(atime: number): Promise<void>

    // mod(): Promise<void>

    body: {
        append(content: string): Promise<string>
        overrite(content: string): Promise<string>
        range(content: string, start: number, end: number): Promise<string>
    }
}

export abstract class Storage<MORE_GET, MORE_SET>{

    get: GET & MORE_GET = {} as GET & MORE_GET
    set: SET & { [index: string]: any } = {} as SET & MORE_SET

}





