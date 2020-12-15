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
%start sentences /* start目前可有可无 */
%% 
/* 
1. 句子列表，需要递归定义,句子之间用 ';' 间隔
2. 从Func_decl知，EOF本身也是一个句子，所有最后一行也要有 ';'
 */
sentences: sentences ';' sentence
    | sentence {return $1;}  //只输出一个函数定义
	;

sentence: Func_decl
        | Expr
        | ';'
        | EOF
        ;

//这里代表一个语句，EOF是一个合法语句, c语言示例中直接不处理这个EOF,把‘;’当句子
Func_decl: DEF Signature Expr {p("函数定义1");$$={type:"DEF",Signature:$2,Expr:$3}}
		 ;

//注意这里的括号配对方式
Signature: ID '(' Arg ')' {p("函数签名2");$$={type:"Signature",name:$1,arg:$2}};

Arg: ID {p("函数参数3");$$={type:"Arg",name:$1}};

Expr: Expr '+' Expr {$$ = {type:"+",left:$1,right:$3};}
    | Expr '-' Expr {$$ = {type:"-",left:$1,right:$3};}
    | Expr '*' Expr {$$ = {type:"*",left:$1,right:$3};}
    | Expr '/' Expr {$$ = {type:"/",left:$1,right:$3};}
	| ID {$$ = {type:"ID",value:$1}}
    | NUMBER {$$ = {type:"NUMBER",value:$1}}
    ;
