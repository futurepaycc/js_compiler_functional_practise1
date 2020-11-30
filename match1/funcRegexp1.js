// 函数式改写1： 柯里化 + R.indexMap
// TODO: 1. 进一步函数式改造，看是否能一个链式调用完成
const R = require('ramda');
const rmap = R.addIndex(R.map)
const KINDS={
    DEF:/def/,
    BLOCK_END:/end/
}
const token = 'end' //目标：找出本字符串的tocken类型

//FIXME: 这里应该普通map也可以完成(不能pipe)
//配合curry，先确定的参数写在左边, pipe计算的参数写在后面
let pattern_index = (tok,list) => list 
                                |> rmap((val,index)=>val.test(tok) ? index:-1) 
                                |> R.findIndex(item=>item>0)(); //注意R.findIndex的签名和array不一样


pattern_index = (tok,list) => list.map((val,index)=>val.test(tok) ? index:-1) |> R.findIndex(item=>item>0)();                         

//TODO: 2. curry还不熟练，需要多联系
const index = KINDS |> Object.values |> R.curry(pattern_index)(token) //柯里化应用点
let result = Object.keys(KINDS) |> R.nth(index)
console.log(`result=${result}`)
