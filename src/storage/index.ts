export function unsupported(): Symbol {
    return Symbol("UNSUPOORTED")
}

export abstract class Storage{

    size = {
        async get(): Promise<number | Symbol> {
            return unsupported()
        }
    }

    type = {
        async get(): Promise<"File" | "Folder" | "Other" | Symbol> {
            return unsupported()
        }
    }

    mtime = {
        async get(): Promise<number | Symbol> {
            return unsupported()
        },
        async set(number: number): Promise<Symbol> {
            return unsupported()
        }
    }

    atime = {
        async get(): Promise<number | Symbol> {
            return unsupported()
        },
        async set(number: number): Promise<void | Symbol> {
            return unsupported()
        }
    }

    body = {

        set: {
            async append(content: string): Promise<void | Symbol> {
                return unsupported()
            },

            async overrite(content: string): Promise<Symbol> {
                return unsupported()
            },

            async range(content: string, start: number, end: number): Promise<void | Symbol> {
                return unsupported()
            }
        },

        get: {
            async all(): Promise<string | Symbol> {
                return unsupported()
            },

            async range(start: number, end: number): Promise<string | Symbol> {
                return unsupported()
            },
            
            async lastLine(from: number): Promise<string | Symbol> {
                return unsupported()
            },
            
            async firstLine(nlines: number, from: number): Promise<string | Symbol> {
                return unsupported()
            }
        }
    }

}





