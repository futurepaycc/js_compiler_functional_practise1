%{
const p=console.log
%}

%lex
%%
"//".*                  ;/* 忽略注释， NOTE: 放在最前 */
\s+                   	;/* skip whitespace */
"int"                  	return 'TYPE'
[a-zA-Z][a-zA-Z0-9]*	return 'ID'
[0-9]+("."[0-9]+)?\b  	return 'NUMBER'
"*"                   	return '*'
"/"                   	return '/'
"-"                   	return '-'
"+"                   	return '+'
"="                   	return '='
"("                   	return '('
")"                   	return ')'
"{"                   	return '{'
"}"                   	return '}'
';'			return ';'
\/\*(.*\n)*.*\*\/       ;/* 忽略空白行 */
<<EOF>>               	return 'EOF' /* EOF在jison中目前看需要特殊处理 */
.                     	return 'INVALID'
/lex

%token DEF ID NUMBER

%left '+' '-'
%left '*' '/'

%right '='

%start Program
%% 
/* 整体程序定义方式, 复合元素list +  EOF */
Program: Program_item_list EOF {return $1;}
        ;

/* 复合元素LIST: 递归串联 */
Program_item_list: Program_item {$$=[$1];}
        | Program_item_list Program_item {$1.push($2);$$=$1;}
        ;        

/* 复合元素 */
Program_item: Func {$$=$1} 
        | St_Assign {$$=$1} 
        ;

/* 语句: 赋值 */
St_Assign: TYPE ID '=' Expr ';' {$$={type:"St_Assign",v_name:$2,v_type:$1,value:$4}}
        ;
/* 函数 */
Func: Func_decl Func_body {$$={type:"Func",Func_decl:$1,Func_body:$2}}
        ;

/* 函数声明 */
Func_decl: TYPE ID '(' ID ')' {$$={type:"Func_decl",name:$2,arg_name:$4,return_type:$1}}
        ;

/* 函数体: */
Func_body: '{' Func_body_Stmt_list  '}' {$$={type:"Func_body",Func_body_Stmt_list:$2}}
        ;

/* 单元素list, NOTE: list元素购造list的方式 */
Func_body_Stmt_list: St_Assign {$$=[$1];}
        | Func_body_Stmt_list St_Assign {$1.push($2);$$=$1;}
        ;        

/* 复合元素的另一种递归定义形式: 归约，和串联不同*/
Expr: Expr '+' Expr {$$ = {type:"+",left:$1,right:$3};}
        | Expr '-' Expr {$$ = {type:"-",left:$1,right:$3};}
        | Expr '*' Expr {$$ = {type:"*",left:$1,right:$3};}
        | Expr '/' Expr {$$ = {type:"/",left:$1,right:$3};}
        | ID {$$ = {type:"ID",value:$1}}
        | NUMBER {$$ = {type:"NUMBER",value:$1}}
        ;
