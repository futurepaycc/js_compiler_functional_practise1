/* js-pattern-matching和z都不能部分对象属性匹配, 达不到tc39提案要求
*/
import match from 'js-pattern-matching';

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


// import { match } from "ramda";

//p1: 只解释一个main函数: 目标，得到函数的正确返回值即可
const p = console.log
const pp = (json_obj)=>console.log(JSON.stringify(json_obj, null, 2));


/* INFO: 算法是否考虑直接在ast树上求值，不增加新的数据结构? */
export function evalution(ast) {

    /* 本函数符号表: 多函数存储函数定义么? */
    const symTable = new Map();

/* 
    TODO: JS是弱类型，+ 号处理处理，但这里要完善
    function eval_ID(ID_node){

    } */

    //TODO: 解析变量名
    function eval_Expr(Expr_node) {//解释执行ast
        p("表达式求值")
        switch (Expr_node.type) {
            case "ID": return symTable.get(Expr_node.value).value;
            case "NUMBER": return parseInt(Expr_node.value);
            case "+": return eval_Expr(Expr_node.left) + eval_Expr(Expr_node.right);
            case "-": return eval_Expr(Expr_node.left) - eval_Expr(Expr_node.right);
            case "*": return eval_Expr(Expr_node.left) * eval_Expr(Expr_node.right);
            case "/": return eval_Expr(Expr_node.left) / eval_Expr(Expr_node.right);
        }
    }

    /* 赋值语句解释 */
/* 
{
  "type": "St_Assign",
  "v_name": "b",
  "v_type": "int",
  "value": {TODO: 1.这里命名应该是Expr
    "type": "NUMBER",
    "value": "2"
  }
}
*/

/* WARN:|NOTE: ES6: map要get就要set,看来不能[],这个语法是操作mapobject自身么?:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map*/
    function eval_Assign(Assign_Node) {
/*         symTable[Assign_Node.v_name] = {...Assign_Node}
        symTable[Assign_Node.v_name].value = eval_Expr(Assign_Node.value)
        delete symTable[Assign_Node.v_name].v_name
        delete symTable[Assign_Node.v_name].type
        p(symTable) */
        symTable.set(Assign_Node.v_name,{...Assign_Node})
        symTable.get(Assign_Node.v_name).value = eval_Expr(Assign_Node.value)
        delete symTable.get(Assign_Node.v_name).v_name
        delete symTable.get(Assign_Node.v_name).type
        p(symTable)
    }

/* return语句解释 */
/* 
 {
          "type": "St_return",
          "St_return_item": {//TODO: 2. 这里也要修改变量名
            "type": "+",
            "left": {
              "type": "ID",
              "value": "a"
            },
            "right": {
              "type": "ID",
              "value": "b"
            }
          }
        }
*/

    function eval_return(Return_node){
        const result = eval_Expr(Return_node.St_return_item)
        p(`函数执行结果是: ${result}`)
    }

    /* 函数体解释: 可能要引入 符号表、栈? 
       TODO: 增加return语句处理
    */
    function eval_Funcbody(Func_body) {
        Func_body.Func_body_Stmt_list.forEach(node=>match(node.type)(
            (v = "St_Assign") => eval_Assign(node),
            (v = "St_return") => eval_return(node),
            (_) => console.log("others")
        ))
    }

    /* 解释一个函数 */
    function eval_function(Function_Node) {
        let result = eval_Funcbody(Function_Node.Func_body)
        return result;
    }

    /* WARN: 目前只处理一个入口函数 */
    ast.forEach(node => eval_function(node));
}