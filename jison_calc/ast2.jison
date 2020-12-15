/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z]+             return 'CHARACTER'
"*"                   return '*'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start start
%% /* language grammar */

start
    : multiplication EOF
        {return $1;}
    ;

multiplication
    : variable '*' variable
        {$$ = {
            type: 'multiplication',
            value: [
              $1,
              $3
            ]
          };
        }
    ;

variable
    : 'NUMBER'
        {$$ = {
              type: 'number',
              value: $1
            };
         }
    | 'CHARACTER'
        {$$ = {
              type: 'character',
              value: $1
            };
         }
    ;