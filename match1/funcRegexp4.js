// 使用箭头函数提换ramda
const KINDS={
    DEF:/def/,
    BLOCK_END:/end/
}

const findType=(token) => Object.values(KINDS)
                        |> (_=>_.findIndex(item=>item.test(token))) //这里实现了由list到index的转换
                        |> (_=>Object.keys(KINDS)[_]); //这里又从index转换到

const result = "end" |> findType(?) //无聊，演示pipe和partial用法而已
console.log(result)