import {tokenizer} from "./tokenizer"
import {parser} from "./parser"
import {codeGenerator} from "./codeGenerator"
import {traverser} from "./traverser"
import {transformer} from "./transformer"

export function compiler(input) {
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);

    // and simply return the output!
    return output;
}

