import match from 'js-pattern-matching';

const p = console.log

export function evalution(ast){
    function eval_Assign(Assign_Node){
        p("准备评估赋值语句")
    }

    function eval_Funcbody(Funcbody){
        p("准备评估Funcbody")
    }

    function eval_function(Function_Node){
        eval_Funcbody(Function_Node.Func_body)
    }

    //评估函数、语句列表
    ast.forEach(node => match(node.type)(
        (v = "Function") => eval_function(node),
        (v = "Assign") => eval_Assign(node),
        (_) => console.log("others")
    ));
}