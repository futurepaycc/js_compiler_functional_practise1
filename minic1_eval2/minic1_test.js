function pp(json_obj){
    console.log(JSON.stringify(json_obj, null, 2));
}


let result = null
let source =`def a(x) x*x;
def b(y) y+y;
def c(z) z+z;
`

/* 目标: 解释下面代码
TODO:
1. 变量寻找父符号表
2. 函数内调用函数
3. 单调用语句
4. 代码重构、去除重复
5. 类型处理

下一步:
    解释程序
*/

source =`
x=10;
y=20;
int sum(int a,int b){
    return a + b;
}
int main(a){
    int a = 1;
    int b = 2;
    int result = sum(a,b);
    return a + b;
}`
/* -------------------逐步实现-------------------------- */



//p1: 函数参数列表: NOTE: 暂不支持sum(a,b);不赋值语句
source=`int main(int a, int b){
    return a + b;
}
int result = main(10,20);
`

import { Parser as minic1_Parser } from "./minic1.js";
import { evalution as minic1_evalution } from "./minic1_eval.js";
const minic1_parser = new minic1_Parser();
result = minic1_parser.parse(source)
pp(result)
minic1_evalution(result)