import match from 'js-pattern-matching';

//match是个高阶函数,js不支持枚举，ts才支持
const getKind=(token)=>match(token)(
    (v = "DEF") => "method prototype",
    (v = "END") => "method block end"
)

let result = getKind("DEF")
console.log(result)