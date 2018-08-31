import { last } from "./utils";

async function main(){
    const c = await last(__dirname + "/utils.ts", 5, 1)
    console.log(c.toString())
}

main()