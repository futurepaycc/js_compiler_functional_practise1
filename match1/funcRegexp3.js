// 函数式改写1： 柯里化 + R.indexMap
// TODO: 1. 进一步函数式改造，看是否能一个链式调用完成
const R = require('ramda');
const rmap = R.addIndex(R.map)
const KINDS={
    DEF:/def/,
    BLOCK_END:/end/
}
const token = 'end' //目标：找出本字符串的tocken类型

// const pattern_index = (tok,list) => list.map((val,index)=>val.test(tok) ? index:-1) 
//                       |> R.findIndex(item=>item>0)();                         

//TODO: 2. curry还不熟练，需要多联系
const result = KINDS 
               |> Object.values 
               |> (token,_ => _.map((val,index)=>val.test(token) ? index:-1) ) //NOTE: 多个参数写法
               |> R.findIndex(item=>item>0)()
               |> (_=>Object.keys(KINDS) |> R.nth(_));

console.log(`result=${result}`)
