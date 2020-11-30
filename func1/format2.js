const dateStr = "1949-04-11 11:05:56"

const result = new Date()
result.setFullYear(dateStr.split(" ")[0].split("-")[0])
result.setDate(dateStr.split(" ")[0].split("-")[2]) //日期要在前面，日标月可能不含今日 -> 30|31号
result.setMonth(parseInt(dateStr.split(" ")[0].split("-")[1]) - 1)
result.setHours(dateStr.split(" ")[1].split(":")[0])
result.setMinutes(dateStr.split(" ")[1].split(":")[1])
result.setSeconds(dateStr.split(" ")[1].split(":")[2])

console.log(result)
