const kinds = {
    DEF: "def",
    BLOCK_END: "end"
}

const token = 'end'

const valueIndex = Object.values(kinds).indexOf(token)
const type = Object.keys(kinds)[valueIndex]
console.log(`type=${type}`)