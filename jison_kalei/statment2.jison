%{
const p=console.log
global.stmtList = []
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
成功说明:
句子列表目前只能使用stmtList.push
整体单一程序才能{return 1}吧--已测试失败
 */
sentences: sentences ';' sentence
        | sentence /* NOTE: stmtList.push放在这里不行????? */
        ;

sentence: Assign {stmtList.push($1)} 
        | Func_decl {stmtList.push($1)}
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
