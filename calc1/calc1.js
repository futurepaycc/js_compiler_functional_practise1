/* 
文章：
https://www.geeksforgeeks.org/expression-evaluation/ (NOTE: 核心原理，表达式求值, 主要语言)
https://rosettacode.org/wiki/Arithmetic_evaluation (四则运处求值,更多语言)
http://jorendorff.github.io/calc/docs/calculator-parser.html (第1部分parser)
http://jorendorff.github.io/calc/docs/calculator-backends.html (第2部分,ir,generator)
代码:
https://www.github.com/jorendorff/toy-calculator 
TODO: 
1. 加入运算处理优先级
2. 学习calc2.js编写visitor, transform, generator
3. 学习文章第2部分代码: 生成ir, 生成function
4. 学习函数式编程js|ocaml重写
5. 学习用chevrotain重写
    * https://github.com/SAP/chevrotain/blob/master/examples/grammars/calculator/calculator_embedded_actions.js 
*/
// var assert = require('assert'); //与下面等价
import * as assert from "assert";

function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+$/) !== null;
}
function isName(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

function tokenize(code) {
    var results = [];
    var tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;

    var m;
    while ((m = tokenRegExp.exec(code)) !== null)
        results.push(m[1]);
    return results;
}

/* 
解析说明:
1. 手工的运算符处理，优先级由低到高解析(就是最基础的表达式求值算法,lexer也有类似处理)
2. ast树的生成： 递归解析中每次parse都return结果，最后由
 */
function parse(code) {
    var tokens = tokenize(code);
    var position = 0;
    function peek() {
        return tokens[position];
    }
    function consume(token) {
        assert.strictEqual(token, tokens[position]);
        position++;
    }

    //3. 最基础单元解析: 1. 数字 2. 变量 3. 括号->括号含内容当做基本元素看待, 同时括号内的内容又可以看做一次递归的顶层表达式解析
    function parsePrimaryExpr() {
        var t = peek();
        if (isNumber(t)) {
            consume(t);
            return { type: "number", value: t };
        } else if (isName(t)) {
            consume(t);
            return { type: "name", id: t };
        } else if (t === "(") {
            consume(t);
            var expr = parseExpr();
            if (peek() !== ")")
                throw new SyntaxError("expected )");
            consume(")");
            return expr;
        } else {
            throw new SyntaxError("expected a number, a variable, or parentheses");
        }
    }

    //2. 解析高优先级的*/运算
    function parseMulExpr() {
        var expr = parsePrimaryExpr(); //a,因为*/是二元运算，左部一定是主表达式
        var t = peek();
        while (t === "*" || t === "/") { //NOTE: 这里的while运算负责连续解析*/运算
            consume(t);
            var rhs = parsePrimaryExpr();
            expr = { type: t, left: expr, right: rhs };
            t = peek();
        }
        return expr;
    }

    //1. 解析入口，并负责解析 +, - 等低优先级运算
    function parseExpr() {
        var expr = parseMulExpr(); //初始解析，一般都是基础单元开头
        // var expr = parsePrimaryExpr(); //NOTE: 开头有括号，这样改会出错
        var t = peek();
        while (t === "+" || t === "-") {//a,连续解析低优先级的+-运算
            consume(t);
            var rhs = parseMulExpr();   //b,在低优先+/内部，递归深入解析高优先级的*/运算
            expr = { type: t, left: expr, right: rhs };
            t = peek();
        }
        return expr;
    }

    var result = parseExpr();
    if (position !== tokens.length)
        throw new SyntaxError("unexpected '" + peek() + "'");
    return result;
}

function evaluate(code) {
    var variables = Object.create(null);
    variables.e = Math.E;
    variables.pi = Math.PI;

    function evaluate(obj) {
        switch (obj.type) {
            case "number": return parseInt(obj.value);
            case "name": return variables[obj.id] || 0;
            case "+": return evaluate(obj.left) + evaluate(obj.right);
            case "-": return evaluate(obj.left) - evaluate(obj.right);
            case "*": return evaluate(obj.left) * evaluate(obj.right);
            case "/": return evaluate(obj.left) / evaluate(obj.right);
        }
    }
    return evaluate(parse(code));
}

/**
 * ============================================================================
 *                      测试部分
 * ============================================================================
 */
if (!module.parent) {
    // const input = "1 + ( 2 * 3 ) / 2"
    const input = "1+(2+4)/3"

    console.log(parse(input))


    // console.log(evaluate(input))
} 