import Path from "./path"

const p = Path.http().l("api.github.com").l("user").l("repo")
console.log(p.toString())

const p1 = Path.posix().l("home").l("repo")
console.log(p1.toString())
