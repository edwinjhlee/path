import Path from "./path"

const p = Path.http().l("api.github.com").l("user").l("repo")
console.log(p.dump())

const p1 = Path.posix().l("home").l("repo")
// console.log(p1)
console.log(p1.dump())

// This API is not good. Optional patterns is not good.
// 比go好用，但比java难用，采用throw本身来说，本身是在正常流程中掺和了错误流程。
// 但是，如果像Java一样，那么错误流程就无影了，也并非所愿。
// 我们只能减轻getOrThrow的影响，提供一个叫做_的函数了。
// 定义 ensureFolder$_，采用 _ 会默认抛error
p1.toDirectory().mkdirp$().list$()
