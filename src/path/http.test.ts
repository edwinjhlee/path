import path from ".";

const p = path.https().l("api.github.com").l("user").l("repo")
console.log(p.dump())

p.get().then(e => console.log(e.data))
