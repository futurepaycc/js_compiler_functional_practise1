//重构3: 清除中间变量
const R = require('ramda');
const D = require('date-fp')

const dateStr = "1949-04-11 11:05:56"
let result = new Date()

const dateStr_part_list = dateStr |> R.split(" ")
const datePart_list = dateStr_part_list |> R.head |> R.split("-")
const timePart_list = dateStr_part_list |> R.last |> R.split(":")

result = result |> D.set("year", +(datePart_list |> R.head)) 
                |> D.set("date", +(datePart_list |> R.last)) 
                |> D.set("month", +(datePart_list |> R.nth(1)))
                |> D.set("hours", +(timePart_list |> R.head)) 
                |> D.set("minutes", +(timePart_list |> R.nth(1))) 
                |> D.set("seconds", +(timePart_list |> R.last));

console.log(result)