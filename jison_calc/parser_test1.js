/* 四则运算: make jison sourcename=calc1
   没有构造出语法树的原因: $$= 了计算表达式，很不是json对象
*/
import { Parser as calc1_Parser } from "./calc1.js";
const cacl1_parser = new calc1_Parser();
let result = cacl1_parser.parse("1+2*3") //NOTE: 这里直接输出结果了，看来是文法的问题么？ how to get ast?
console.log(result)

/* 最简单语法树构造1:  */
import { Parser as ast1_Parser } from "./ast1.js";
const ast1_parser = new ast1_Parser();
result = ast1_parser.parse("1 2 3")
console.log(result)

/* 最简单语法树构造2:  */
import { Parser as ast2_Parser } from "./ast2.js";
const ast2_parser = new ast2_Parser();
result = ast2_parser.parse("4*5")
console.log(result)

/* 最简四则运算ast */
function evaluate(node){//解释执行ast
   switch(node.type){
      case "number": return parseInt(node.value);
      case "+": return evaluate(node.left) + evaluate(node.right);
      case "-": return evaluate(node.left) - evaluate(node.right);
      case "*": return evaluate(node.left) * evaluate(node.right);
      case "/": return evaluate(node.left) / evaluate(node.right);
   }
}
import { Parser as calc_ast1_Parser } from "./calc_ast1.js";
const calc_ast1_parser = new calc_ast1_Parser();
result = calc_ast1_parser.parse("1+(2+4)/3") //NOTE: 这里直接输出结果了，看来是文法的问题么？ how to get ast?
console.log(result)
console.log(evaluate(result))