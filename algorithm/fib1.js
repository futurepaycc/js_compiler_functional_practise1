import match from 'js-pattern-matching';

/* 
FIXME: 报栈溢出
const fib1 = (n) => match(n)(
    (v = 0) => 1,
    (v = 1) => 1,
    (_) => fib1(_ - 1 ) + fib1(_ - 2)
)

let result = fib1(2)
console.log(result) */

const fib1 = n => {if(n<=1) return 1; else return fib1(n-1)+fib1(n-2)}; 
let result = fib1(5);
console.log(result);

const fib2 = n =>{
    switch(n){
        case 0:
        case 1: return 1
        default: return fib2(n-1) + fib2(n-2)
    }
}

result = fib2(5)
console.log(result)