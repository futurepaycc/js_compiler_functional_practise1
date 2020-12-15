%{
/* 与minic比较说明:
    minic之所不用处理 EOF, 应该是minic的语法简单，只支持单一函数？
jison语法参考文件(和yacc应该还是有些许不同):
https://github.com/zaach/jison/blob/master/examples/classy.jisonlex
https://github.com/zaach/jison/blob/master/examples/classy_ast.jison

TODO: 
1. 参考minic1.jison，制作更丰富的句型
2. 在复杂句型下，如何制作ast?
*/    
const p=console.log
%}

%lex
%%
"//".*                  ;/* 忽略注释， NOTE: 放在最前 */
\s+                   	;/* skip whitespace */
def						return 'DEF'
[a-zA-Z][a-zA-Z0-9]*	return 'ID'
[0-9]+("."[0-9]+)?\b  	return 'NUMBER'
"*"                   	return '*'
"/"                   	return '/'
"-"                   	return '-'
"+"                   	return '+'
"="                   	return '='
"("                   	return '('
")"                   	return ')'
';'						return ';'
\/\*(.*\n)*.*\*\/       ;/* 忽略空白行 */
<<EOF>>               	return 'EOF' /* EOF在jison中目前看需要特殊处理 */
.                     	return 'INVALID'
/lex

%token DEF ID NUMBER

%left '+' '-'
%left '*' '/'

%right '='

// %start sentences /* start目前可有可无 */
%% 
/* 
BUG:
1. 使用{return $1}，只处理一条语句，只得到第一条ast
2. 使用全局list.push全部处理，只能得到第一条语句的ast
 */
sentences: sentences ';' sentence
        | sentence {return $1;}
        ;

sentence: Assign {$$=$1;} 
        | Func_decl {$$=$1;}
        | EOF
        ;

Assign: ID '=' Expr {p("赋值语句");$$={type:"Assign",name:$1,value:$3}}
        ;

//这里代表一个语句，EOF是一个合法语句, c语言示例中直接不处理这个EOF,把‘;’当句子
Func_decl: DEF Signature Expr {p("函数语句");$$={type:"DEF",Signature:$2,Expr:$3}}
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
