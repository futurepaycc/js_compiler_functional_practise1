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

%start Program /* start目前可有可无 */
%% 
/* 
BUG: 这里也需要递归定义, 但是两种元素
无法穷举: abab,aab,abbbbbbabab
 */
Program: 
        Sentence_list Function_list EOF
        |Sentence_list Function_list Sentence_list EOF
        |Function_list Sentence_list EOF
        |Function_list Sentence_list Function_list EOF
        ;

Function_list: Function  {stmtList.push($1);} 
        | Function_list Function
        ;

Sentence_list: Assign  {stmtList.push($1);} 
        | Sentence_list Assign 
        ;

Assign: ID '=' NUMBER ';' {p("赋值语句");$$={type:"Assign",name:$1,value:$3}}
        ;

Function: Func_decl Func_body {$$={type:"Func",Func_decl:$1,Func_body:$2}}
        ;

//这里代表一个语句，EOF是一个合法语句, c语言示例中直接不处理这个EOF,把‘;’当句子
Func_decl: INT Signature {$$={type:"DEF",Signature:$2}}
        ;

Func_body: '{' Sentence_list  '}' {$$={type:"Func_body",stat:$2}}
        ;
                

//注意这里的括号配对方式
Signature: ID '(' Arg ')' {$$={type:"Signature",name:$1,arg:$2}}
        ;

Arg: ID {$$={type:"Arg",name:$1}}
        ;

Expr: Expr '+' Expr {$$ = {type:"+",left:$1,right:$3};}
        | Expr '-' Expr {$$ = {type:"-",left:$1,right:$3};}
        | Expr '*' Expr {$$ = {type:"*",left:$1,right:$3};}
        | Expr '/' Expr {$$ = {type:"/",left:$1,right:$3};}
        | ID {$$ = {type:"ID",value:$1}}
        | NUMBER {$$ = {type:"NUMBER",value:$1}}
        ;
