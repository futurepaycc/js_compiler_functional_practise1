/* 
TODO: 去除全局变量token依赖，使用curry和pipe内联箭头函数方式一个调用链完成
思路: 
1. R.curry( (_=>方式))
2. (KINDS |> Object.keys) 本身可以做为函数参数
https://github.com/tc39/proposal-pipeline-operator/
*/
const R = require('ramda');
const rmap = R.addIndex(R.map)
const KINDS={
    DEF:/def/,
    BLOCK_END:/end/
}
const token = 'end' //目标：找出本字符串的tocken类型

//FIXME: 进一步缩短了调用链，不再使用curry, 使用inline函数定义方式，感觉依赖了全局变量，不好
const index = KINDS 
                |> Object.values 
                |> (_ => _.map((val,index)=>val.test(token) ? index:-1) )  //NOTE: 注意pipe中定义函数的方式
                |> R.findIndex(item=>item>0)()

let result = KINDS |> Object.keys |> R.nth(index)
console.log(`result=${result}`)
