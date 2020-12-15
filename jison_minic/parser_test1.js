import { Parser as minic1_Parser } from "./minic1.js";

let source =`int main () {
	int a
	while ( 1 ) {
	.
	int d;
}
`

const minic1_parser = new minic1_Parser();
let result = minic1_parser.parse(source) //NOTE: 这里直接输出结果了，看来是文法的问题么？ how to get ast?
console.log(result)