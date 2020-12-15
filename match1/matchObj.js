import match from 'js-pattern-matching';

/* v只能是文法值或类型，不能是object，访问obj用参数化的形式 */
const machCommand=(p_obj)=>match(p_obj.command)(
    (v = "DEF") => console.log(`method prototype ${p_obj.comment}`),
    (v = "END") => console.log(`method block end ${p_obj.comment}`)
)

let obj = {command: "DEF",comment:"test_def"}

machCommand(obj)


