const dateStr = "1919-04-11 11:05:56"

let result = new Date()

result.setFullYear(dateStr.split(" ")[0].split("-")[0])
// result.setMonth(parseInt(dateStr.split(" ")[0].split("-")[1]) - 1)
/* 
会何这里输入1,2结果都是3? 
1. 跟设置date的先后顺序相关，先设置date没问题
2. 今日是30号，date可能超出指定月份最大值
3. 最好先设置日期后设置月份
*/
result.setMonth(0) 
result.setDate(dateStr.split(" ")[0].split("-")[2])

console.log(result)


