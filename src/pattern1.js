//https://github.com/roli93/js-pattern-matching
import match from 'js-pattern-matching';
const sum = (list) =>  match (list) (
  ([x,...xs]) => x + sum(xs),
  ([]) => 0
)
 
console.log(sum([]));
console.log(sum([1,2,3]));