function pp(json_obj){
    console.log(JSON.stringify(json_obj, null, 2));
}


let result = null
let source =`def a(x) x*x;
def b(y) y+y;
def c(z) z+z;
`

/* 
解释器思路:
1. toplevel|function_level
2. toplevel_symTable <- Funct_Declare | Assign
3. toplevel_symTable - function_symTable <-Assign
4. function_call_args -> function_symTable


解析方式1_过程：
1. toplevel逐语句行解析
  * 函数定义存储入符号表(code-body_ast)
  * 函数调用查找符号表，找到函数解析函数
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
int main(int a, int b){
    int a=1;
    int b=2;
    return a + b;
}`

import { Parser as minic1_Parser } from "./minic1.js";
import { evalution as minic1_evalution } from "./minic1_eval.js";
const minic1_parser = new minic1_Parser();
result = minic1_parser.parse(source)
pp(result)
minic1_evalution(result)