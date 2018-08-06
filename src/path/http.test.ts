import http from "./http"

const p = http.l("api.github.com").l("user").l("repo")
console.log(p.toString())

p.get().then(e => console.log(e.data))
