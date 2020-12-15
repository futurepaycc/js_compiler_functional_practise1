import match from 'js-pattern-matching';
const p = console.log
const pp = (json_obj)=>console.log(JSON.stringify(json_obj, null, 2));

function exec_function(Function_node,topSymTable){
  const symTable = new Map();
  symTable.set("parent",topSymTable)
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

  function eval_Assign(Assign_Node) {
      symTable.set(Assign_Node.v_name,{...Assign_Node})
      symTable.get(Assign_Node.v_name).value = eval_Expr(Assign_Node.value)
      delete symTable.get(Assign_Node.v_name).v_name
      delete symTable.get(Assign_Node.v_name).type
      p(symTable)
  }

  function eval_return(Return_node){
      const result = eval_Expr(Return_node.St_return_item)
      return result;
  }

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
  p(`函数执行结果是: ${result}`)
  return result;
}

/* topLevel解释器 */
export function evalution(ast) {
    const topSymTable = new Map();

    function eval_Expr(Expr_node) {//解释执行ast
        p("表达式求值")
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
        p(topSymTable)
    }

/* 
    "Func_decl": {
      "type": "Func_decl",
      "name": "main",
      "Func_decl_arg_list": [
        {
          "type": "int",
          "name": "a"
        },
        {
          "type": "int",
          "name": "b"
        }
      ],
      "return_type": "int"
    },

*/    


    function def_function(node){
        topSymTable.set(node.Func_decl.name,node)
    }

    function eval_Call(node) {
        //TODO: getfunction declare
        const func_ast = symTable.get(node.func_name)
        exec_function(func_ast,topSymTable,/* TODO: 得到argList并传入 */)
    }

    ast.forEach(node=>match(node.type)(
        (v = "St_Assign") => eval_Assign(node),
        (v = "Func") => def_function(node),
        (v = "St_call") => eval_Call(node),
        // (v = "Func_decl") => eval_Func_decl(node),
        (_) => console.log("others")
    ))

}