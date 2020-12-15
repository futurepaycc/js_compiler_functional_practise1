/* 
https://github.com/zaach/jison
说明: js写的，没有代码完成呢
*/

const Parser = require("jison").Parser

// a grammar in JSON
const grammar = {
    "lex": {
        "rules": [
           ["\\s+", "/* skip whitespace */"],
           ["[a-f0-9]+", "return 'HEX';"]
        ]
    },

    "bnf": {
        "hex_strings" :[ "hex_strings HEX",
                         "HEX" ]
    }
};

// `grammar` can also be a string that uses jison's grammar format
const parser = new Parser(grammar);

const parserSource = parser.generate()

parser.parse("adfe34bc e82a");

// throws lexical error
parser.parse("adfe34bc zxg");