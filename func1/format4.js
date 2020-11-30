//ramda简明教程: http://zetcode.com/javascript/ramda/
//ramdaw集合操作: https://randycoulman.com/blog/2016/07/05/thinking-in-ramda-immutability-and-arrays/
const R = require('ramda');
const D = require('date-fp')

const dateStr = "1949-04-11 11:05:56"

const year_str = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.head
const month_str = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.nth(1)
const day_str = dateStr |> R.split(" ") |> R.head |> R.split("-") |> R.last

const hour_str = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.head
const minitue_str = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.nth(1)
const second_str = dateStr |> R.split(" ") |> R.last |> R.split(":") |> R.last

/* 
修改对象: R.assoc('name','jack',person)
https://randycoulman.com/blog/2016/06/28/thinking-in-ramda-immutability-and-objects/
Date对象不行,应该需要使用date-fp
https://github.com/cullophid/date-fp
https://cullophid.github.io/date-fp/index.html (date-fp文档)
*/

let result = new Date();

result = result |> D.set("year", +year_str) |> D.set("date", +day_str) |> D.set("month", +month_str)
        |> D.set("hours", +hour_str) |> D.set("minutes", +minitue_str) |> D.set("seconds", +second_str);

console.log(result)