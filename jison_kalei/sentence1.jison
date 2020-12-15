%{
const p=console.log
%}

%lex
%%
\s+                   	;/* skip whitespace */
def						return 'DEF'
[a-zA-Z][a-zA-Z0-9]*	return 'ID'
[0-9]+("."[0-9]+)?\b  	return 'NUMBER'
"*"                   	return '*'
"/"                   	return '/'
"-"                   	return '-'
"+"                   	return '+'
"("                   	return '('
")"                   	return ')'
';'						return ';'
<<EOF>>               	return 'EOF'
.                     	return 'INVALID'
/lex

%token DEF ID NUMBER

%left '+' '-'
%left '*' '/'
%start Program
%% 
/* 
1. 句子列表，需要递归定义,句子之间用 ';' 间隔
2. 从Func_decl知，EOF本身也是一个句子，所有最后一行也要有 ';'
 */
Program: Program ';' Func_decl
	| Func_decl
	;

//这里代表一个语句，EOF是一个合法语句, c语言示例中直接不处理这个EOF,把‘;’当句子
Func_decl: DEF Signature Expr {p("函数定义1");$$=$2}
		 | EOF
		 ;

//注意这里的括号配对方式
Signature: ID '(' Arg ')' {p("函数签名2");$$=$2};

Arg: ID {p("函数参数3");};

Expr: Expr '+' Expr {$$ = {type:"+",left:$1,right:$3};}
    | Expr '-' Expr {$$ = {type:"-",left:$1,right:$3};}
    | Expr '*' Expr {$$ = {type:"*",left:$1,right:$3};}
    | Expr '/' Expr {$$ = {type:"/",left:$1,right:$3};}
	| ID {$$ = {type:"id",value:$1}}
    | NUMBER {$$ = {type:"number",value:$1}}
    ;
