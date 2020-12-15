const { matches } = require('z')

/* v只能是文法值或类型，不能是object，访问obj用参数化的形式 */
/*ERROR: 只能对像严格匹配  */
const machCommand=(p_obj)=>matches(p_obj)(
    (x = {command:"DEF"}) => console.log(`method prototype ${p_obj.comment}`),
    (x = {command:"END"}) => console.log(`method block end ${p_obj.comment}`)
)

let obj = {command: "DEF",comment:"test_def"}

machCommand(obj)


matches(obj)(
    (x = {command:"DEF"}) => console.log(`method prototype ${p_obj.comment}`),
    (x = {command:"END"}) => console.log(`method block end ${p_obj.comment}`)
)