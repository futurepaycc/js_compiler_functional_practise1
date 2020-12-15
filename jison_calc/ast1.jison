/* 来源:
https://stackoverflow.com/questions/8467150/how-to-get-abstract-syntax-tree-ast-out-of-jison-parser
 */
%lex
%%

\s+                   /* skip whitespace */
[a-f0-9]+             return 'HEX'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* language grammar */
%start start
%% 


start
    :  hex_strings EOF
        {return $1;}
    ;

hex_strings
    : hex_strings HEX
        {$$ = $1.concat([$2]);}
    | HEX
        {$$ = [$1];}
    ;