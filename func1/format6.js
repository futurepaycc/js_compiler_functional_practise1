//重构2: memoizeWith
const R = require('ramda');
const D = require('date-fp')

const dateStr = "1949-04-11 11:05:56"

//示范memoizedWith使用
//identity is a Ramda function that just returns its argument
const split_result_func = R.memoizeWith(R.identity,R.split)

const datePart_list = dateStr |> split_result_func(" ") |> R.head |> R.split("-")
const timePart_list = dateStr |> split_result_func(" ") |> R.last |> R.split(":")

const year_str = datePart_list |> R.head
const month_str = datePart_list |> R.nth(1)
const day_str = datePart_list |> R.last

const hour_str = timePart_list |> R.head
const minitue_str = timePart_list |> R.nth(1)
const second_str = timePart_list |> R.last


let result = new Date();

result = result |> D.set("year", +year_str) |> D.set("date", +day_str) |> D.set("month", +month_str)
        |> D.set("hours", +hour_str) |> D.set("minutes", +minitue_str) |> D.set("seconds", +second_str);

console.log(result)