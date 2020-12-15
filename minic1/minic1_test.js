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
1. 合并简化函数签名
2. 函数支持多语句
3. toplevel语句支持多语句
4. 赋值语句支持类型声明
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

//p1: 合并函数签名
source=`
int main(a){
    a=1;
}
`
//P2: 函数支持多语句: FIXME: 函数的多语句ast构造问题: 如何为每一个函数构造stmt_list
/* 
参考思路1: $0,$-1...引用父节点内容?
*/
/* 参考思路2:
block_item_list
	: block_item
	  { $$ = addList($1); }	
	| block_item_list block_item
	  { $$ = addLast($1, $2); }
	;

*/
source=`
int main(a){
    a=1;
    b=2;
}`

//P3: toplevel递归支持多语句
source=`
x=10;
y=20;
int main(a){
    a=1;
    b=2;
}`

//P4: 语句支持类型声明
source=`
int x=10;
int y=20;
int main(a){
    int a=1;
    int b=2;
}`
import { Parser as minic1_Parser } from "./minic1.js";
import { evalution as minic1_evalution } from "./minic1_eval.js";
const minic1_parser = new minic1_Parser();
result = minic1_parser.parse(source)
pp(result)
// pp(global.topList)
