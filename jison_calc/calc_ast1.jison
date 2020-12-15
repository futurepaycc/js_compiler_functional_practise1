%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"("                   return '('
")"                   return ')'
<<EOF>>               return 'EOF'
.                     return 'INVALID'
/lex

%left '+' '-'
%left '*' '/'
%start expressions

%% 
expressions
    : expr EOF { return $1; } /* 这里一定要是return，不能再是$$ */
    ;

expr
    : expr '+' expr {$$ = {type:"+",left:$1,right:$3};}
    | expr '-' expr {$$ = {type:"-",left:$1,right:$3};}
    | expr '*' expr {$$ = {type:"*",left:$1,right:$3};}
    | expr '/' expr {$$ = {type:"/",left:$1,right:$3};}
    | '(' expr ')' {$$ = $2;} /* 括号不会出现在ast中 */
    | NUMBER {$$ = {type:"number",value:$1}}
    ;
