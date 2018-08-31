import { last } from "./utils";

async function main(){
    const c = await last(__dirname + "/utils.ts", 3, 3)
    console.log(c.toString())
}

main()