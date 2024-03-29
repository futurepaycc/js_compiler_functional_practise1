import match from 'js-pattern-matching';
const p = console.log
const pp = (json_obj)=>console.log(JSON.stringify(json_obj, null, 2));

/* 
TODO:
1. 变量寻找父符号表
2. 函数内调用函数
3. 单调用语句
4. 代码重构、去除重复
5. 类型处理
6. toplevel: 自身可以看做一个函数, 这样可以实现函数嵌套和closure
7. 语义检查: 可以看做是解析符号表，而不求值
8. 代码生成: 基础也是表达式求值，生成对应正面的vm结构
9. vm: 表达式求值、label -> function, 对应就是栈、jump、ret
*/
function exec_function(Function_node,topSymTable,arg_list){
  const symTable = new Map();
  symTable.set("parent",topSymTable)

  Function_node.Func_decl.Func_decl_arg_list.forEach((item,index)=>{
    symTable.set(item.name,{value:parseInt(arg_list[index])}); //NOTE:这里缺类型判断
  })

/* 
表达式解释算法:
1. 基础符号，值替换
2. 二元表达式，递归解析
*/
  function eval_Expr(Expr_node) {//解释执行ast
      switch (Expr_node.type) {
          case "ID": return symTable.get(Expr_node.value).value;
          case "NUMBER": return parseInt(Expr_node.value);
          case "+": return eval_Expr(Expr_node.left) + eval_Expr(Expr_node.right);
          case "-": return eval_Expr(Expr_node.left) - eval_Expr(Expr_node.right);
          case "*": return eval_Expr(Expr_node.left) * eval_Expr(Expr_node.right);
          case "/": return eval_Expr(Expr_node.left) / eval_Expr(Expr_node.right);
      }
  }

  function eval_Assign(Assign_Node) {
      symTable.set(Assign_Node.v_name,{...Assign_Node})
      symTable.get(Assign_Node.v_name).value = eval_Expr(Assign_Node.value)
      delete symTable.get(Assign_Node.v_name).v_name
      delete symTable.get(Assign_Node.v_name).type
  }

  function eval_return(Return_node){
      const result = eval_Expr(Return_node.St_return_item)
      return result;
  }

/* 
函数体解析
*/
  function eval_Funcbody(Func_body) {
      let result = 0;
      Func_body.Func_body_Stmt_list.forEach(node=>match(node.type)(
          (v = "St_Assign") => eval_Assign(node),
          (v = "St_return") => result=eval_return(node),
          (_) => console.log("others")
      ))
      return result;
  }

  let result = eval_Funcbody(Function_node.Func_body)
  return result;
}

/* topLevel解释器 */
export function evalution(ast) {
    const topSymTable = new Map();

    function eval_Expr(Expr_node) {//解释执行ast
        switch (Expr_node.type) {
            case "ID": return topSymTable.get(Expr_node.value).value;
            case "NUMBER": return parseInt(Expr_node.value);
            case "+": return eval_Expr(Expr_node.left) + eval_Expr(Expr_node.right);
            case "-": return eval_Expr(Expr_node.left) - eval_Expr(Expr_node.right);
            case "*": return eval_Expr(Expr_node.left) * eval_Expr(Expr_node.right);
            case "/": return eval_Expr(Expr_node.left) / eval_Expr(Expr_node.right);
        }
    }    

    function eval_Assign(Assign_Node) {
        topSymTable.set(Assign_Node.v_name,{...Assign_Node})
        topSymTable.get(Assign_Node.v_name).value = eval_Expr(Assign_Node.value)
        delete topSymTable.get(Assign_Node.v_name).v_name
        delete topSymTable.get(Assign_Node.v_name).type
    }

    function def_function(node){
        topSymTable.set(node.Func_decl.name,node)
    }

    function eval_Call(node) {
        const func_ast = topSymTable.get(node.Expr_call.name)
        const arg_list = node.Expr_call.arg_list.map(item=>item.value)
        const result = exec_function(func_ast,topSymTable,arg_list)
        topSymTable.set(node.v_name,result)
    }

    ast.forEach(node=>match(node.type)(
        (v = "Func") => def_function(node),
        (v = "St_Assign") => eval_Assign(node),
        (v = "St_call") => eval_Call(node),
        (_) => console.log("others")
    ))

    p(`最后结果result=${topSymTable.get("result")}`)

}