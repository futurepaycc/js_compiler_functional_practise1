/* 说明:
参考: calc1.jison|calc_ast1.json|minic_yacc0
不用拘泥用kaleidoscope语法，像c也行,第一步先实现ast
静态太语言，像c, 因为可能要生成x86-64
1. 支持int、char类型
2. 支持函数调用
3. 生成x86-64

文件来自: minic_yacc0项目
TODO: 
生成带函数的ast!
 */

%lex
alpha [a-zA-Z]
digit [0-9]
%%
\s+                         ;/* skip whitespace */
int	                        return "INT";
float                       return "FLOAT";
char                        return "CHAR";
void                        return "VOID";
double                      return "DOUBLE";
for 	                    return "FOR";
while	                    return "WHILE";
if	                        return "IF";
else	                    return "ELSE";
printf                      return "PRINTF";
struct 	                    return "STRUCT";
{digit}+                    return "NUM";
{alpha}({alpha}|{digit})*   return "ID";
"<="                        return "LE";
">="                        return "GE";
"=="                        return "EQ";
"!="                        return "NE";
">"	                        return "GT";
"<"	                        return "LT";
"."                         return "DOT";
\/\/.*                      ;
\/\*(.*\n)*.*\*\/ ;
.                           return yytext;
/lex

%token INT FLOAT CHAR DOUBLE VOID
%token FOR WHILE 
%token IF ELSE PRINTF 
%token STRUCT 
%token NUM ID
%token DOT

%right '='
%left AND OR
%left '<' '>' LE GE EQ NE LT GT

%%

start:	Function 
	| Declaration
	;

/* Declaration block */
Declaration: Type Assignment ';' 
	| Assignment ';'  	
	| FunctionCall ';' 	
	| ArrayUsage ';'	
	| Type ArrayUsage ';'   
	| StructStmt ';'	
	| error	
	;

/* Assignment block */
Assignment: ID '=' Assignment
	| ID '=' FunctionCall
	| ID '=' ArrayUsage
	| ArrayUsage '=' Assignment
	| ID ',' Assignment
	| NUM ',' Assignment
	| ID '+' Assignment
	| ID '-' Assignment
	| ID '*' Assignment
	| ID '/' Assignment	
	| NUM '+' Assignment
	| NUM '-' Assignment
	| NUM '*' Assignment
	| NUM '/' Assignment
	| '\'' Assignment '\''	
	| '(' Assignment ')'
	| '-' '(' Assignment ')'
	| '-' NUM
	| '-' ID
	|   NUM
	|   ID
	;

/* Function Call Block */
FunctionCall : ID'('')'
	| ID'('Assignment')'
	;

/* Array Usage */
ArrayUsage : ID'['Assignment']'
	;

/* Function block */
Function: Type ID '(' ArgListOpt ')' CompoundStmt 
	;
ArgListOpt: ArgList
	|
	;
ArgList:  ArgList ',' Arg
	| Arg
	;
Arg:	Type ID
	;
CompoundStmt:	'{' StmtList '}'
	;
StmtList:	StmtList Stmt
	|
	;
Stmt:	WhileStmt
	| Declaration
	| ForStmt
	| IfStmt
	| PrintFunc
	| ';'
	;

/* Type Identifier block */
Type:	INT 
	| FLOAT
	| CHAR
	| DOUBLE
	| VOID 
	;

/* Loop Blocks */ 
WhileStmt: WHILE '(' Expr ')' Stmt  
	| WHILE '(' Expr ')' CompoundStmt 
	;

/* For Block */
ForStmt: FOR '(' Expr ';' Expr ';' Expr ')' Stmt 
       | FOR '(' Expr ';' Expr ';' Expr ')' CompoundStmt 
       | FOR '(' Expr ')' Stmt 
       | FOR '(' Expr ')' CompoundStmt 
	;

/* IfStmt Block */
IfStmt : IF '(' Expr ')' 
	 	Stmt 
	;

/* Struct Statement */
StructStmt : STRUCT ID '{' Type Assignment '}'  
	;

/* Print Function */
PrintFunc : PRINTF '(' Expr ')' ';'
	;

/*Expression Block*/
Expr:	
	| Expr LE Expr 
	| Expr GE Expr
	| Expr NE Expr
	| Expr EQ Expr
	| Expr GT Expr
	| Expr LT Expr
	| Assignment
	| ArrayUsage
	;