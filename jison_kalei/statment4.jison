%{
const p=console.log
global.stmtList = []
%}

%lex
%%
"//".*                  ;/* 忽略注释， NOTE: 放在最前 */
\s+                   	;/* skip whitespace */
"int"                  	return 'INT'
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
/* TODO: 
1. 函数调用、返回语句
2. 解释器
 */

/* 复合元素LIST: 递归串联 */
Program: Program_item
        | Program Program_item
        ;        

/* 复合元素 */
Program_item: Function {stmtList.push($1);} 
        | Assign {stmtList.push($1);} 
        | EOF
        ;

/* 语句 */
Assign: ID '=' Expr ';' {$$={type:"Assign",name:$1,value:$3}}
        ;
/* 函数 */
Function: Func_decl Func_body {$$={type:"Function",Func_decl:$1,Func_body:$2}}
        ;

/* 函数签名 */
Func_decl: INT Signature {$$={type:"DEF",Signature:$2}}
        ;

/* 函数体 */
Func_body: '{' Assign  '}' {$$={type:"Func_body",stat:$2}}
        ;

/* TODO: 这里可以与函数签名合并 */
Signature: ID '(' Arg ')' {$$={type:"Signature",name:$1,arg:$2}}
        ;

/* TODO: 这里可以与函数签名合并 */
Arg: ID {$$={type:"Arg",name:$1}}
        ;

/* 复合元素的另一种递归定义形式: 归约，和串联不同*/
Expr: Expr '+' Expr {$$ = {type:"+",left:$1,right:$3};}
        | Expr '-' Expr {$$ = {type:"-",left:$1,right:$3};}
        | Expr '*' Expr {$$ = {type:"*",left:$1,right:$3};}
        | Expr '/' Expr {$$ = {type:"/",left:$1,right:$3};}
        | ID {$$ = {type:"ID",value:$1}}
        | NUMBER {$$ = {type:"NUMBER",value:$1}}
        ;
