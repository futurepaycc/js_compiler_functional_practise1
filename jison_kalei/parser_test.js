let result = null
let source =`def a(x) x*x;
def b(y) y+y;
def c(z) z+z;
`
//单一句子测试
/* 
import { Parser as sentence1_Parser } from "./sentence1.js";
const sentence1_parser = new sentence1_Parser();
let result = sentence1_parser.parse(source)
console.log(result) 
*/

//两种句子测试1
/* source =`def a(x) x*x;
3+5;

3+5;
//comment?
def a(x) x*x;


3+5;
def a(x) x*x;
`
import { Parser as statment1_Parser } from "./statment1.js";
const statment1_parser = new statment1_Parser();
result = statment1_parser.parse(source)
console.log(result) */

//两种句子测试2
/* source =`def a(x) x*x;
v=3+5;
vv=1+2;
def b(y) y+y;`
import { Parser as statment2_Parser } from "./statment2.js";
const statment2_parser = new statment2_Parser();
result = statment2_parser.parse(source)
console.log(result)
console.log(global.stmtList)
 */

//最简单函数测试1(只支持assign语句,int定义)
/* source =`v=2;
int main(a){
    a=1;
}
b=2;
c=3;
int test(b){
    b=1;
}`
import { Parser as statment3_Parser } from "./statment3.js";
const statment3_parser = new statment3_Parser();
result = statment3_parser.parse(source)
console.log(result)
console.log(global.stmtList) */


//最简单函数测试1: 多函数，多语句支持(只支持assign语句,int定义)
source =`v=2;
int main(a){
    a=1;
}
b=2;
c=3;
d=b+c;
int test(b){
    b=1;
}`
import { Parser as statment4_Parser } from "./statment4.js";
import { evalution as statement4_evalution } from "./statment4_eval.js";
const statment4_parser = new statment4_Parser();
result = statment4_parser.parse(source)
console.log(result)
console.log(global.stmtList)
statement4_evalution(global.stmtList)
