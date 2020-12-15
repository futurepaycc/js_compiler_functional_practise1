function pp(json_obj){
    console.log(JSON.stringify(json_obj, null, 2));
}


let result = null
let source =`def a(x) x*x;
def b(y) y+y;
def c(z) z+z;
`

/* 目标: 解析并解释下面代码
TODO:
1. 函数参数声明列表
2. 支持函数调用语句
3. 函数返回语句

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



//p1: 函数参数列表
source=`
int x=10;
int y=20;
int main(int a, int b){
    int a=1;
    int b=2;
}`

//p2: 函数调用语句
source=`
int x=10;
int y=20;
int sum(int a,int b){
    int result = a + b;
}
int main(int a){
    int a = 1;
    int b = 2;
    int result = sum(a,b);
}`
//p3: 函数返回语句
source=`
int x=10;
int y=20;
int sum(int a,int b){
    int result = a + b;
    return result;
}
int main(int a){
    int a = 1;
    int b = 2;
    int result = sum(a,b);
    return result;
}`

import { Parser as minic2_Parser } from "./minic2.js";
import { evalution as minic2_evalution } from "./minic2_eval.js";
const minic2_parser = new minic2_Parser();
result = minic2_parser.parse(source)
pp(result)
// pp(global.topList)
