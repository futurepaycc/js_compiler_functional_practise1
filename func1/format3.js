//ramda简明教程: http://zetcode.com/javascript/ramda/
//ramdaw集合操作: https://randycoulman.com/blog/2016/07/05/thinking-in-ramda-immutability-and-arrays/
const R = require('ramda');

const dateStr = "1949-04-11 11:05:56"

const year_str  = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.head
//这里不好，可以考虑R.flip和实现pattern的箭头函数提换Math.abs
const month_str = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.nth(1) |> R.subtract(1) |> Math.abs
const day_str   = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.last

const hour_str    = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.head
const minitue_str = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.nth(1)
const second_str  = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.last

/* 
修改对象: R.assoc('name','jack',person)
https://randycoulman.com/blog/2016/06/28/thinking-in-ramda-immutability-and-objects/
Date对象不行,应该需要使用date-fp
https://github.com/cullophid/date-fp
*/

const result = new Date();
result.setFullYear(+year_str)
result.setDate(+day_str)
result.setMonth(+month_str)
result.setHours(+hour_str)
result.setMinutes(+minitue_str)
result.setSeconds(+second_str)

console.log(result)