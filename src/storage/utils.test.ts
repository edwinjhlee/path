import * as u from "./utils";

import fse from "fs-extra"

async function main(){
    const filepath = __dirname + "/test.txt"

    await fse.remove(filepath)
    await fse.createFile(filepath)

    const content = "一一一,二二二,333,八八八"
    await u.OffsetBased.write(filepath, 0, content)
    await u.OffsetBased.write(filepath, 0, "000")

    // await fse.truncate(filepath, content.length-3)

    const b = await fse.readFile(filepath)
    // console.log(b)
    console.log(b.toString())

    const c = new Buffer(content, "utf16le")
    console.log(c)
    console.log(c.toString("utf16le"))

    console.log("-------------------")
    console.log(content)
    const c1 = Buffer.from(content).toString("base64")
    console.log(c1)
    const c2 = Buffer.from(c1, "base64")
    console.log(c2)

}

main()