// https://github.com/tc39/proposal-partial-application
// NOTE: 和pipe的 ‘_’不一样，好像只能放置参数范围，不能参与箭头函数计算
function add(x, y) { return x + y; }

const addOne = add(1, ?); // apply from the left
let result = addOne(2); // 3
console.log(result)