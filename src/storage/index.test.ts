import { Storage } from "./index"

async function main(){

    const s: Storage = {} as Storage

    await s.get.atime()
    await s.set.atime(123)
    await s.set.body.append("123")
}

main()