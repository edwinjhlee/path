import { Storage } from "./index"

async function main(){

    const s: Storage = {} as Storage

    s.atime.get()

    await s.atime.get()
    await s.atime.set(123)
    await s.body.set.append("123")
}

main()