const KINDS={
    DEF:/def/,
    BLOCK_END:/end/
}

const token = 'end'

const findKlind=(tok)=>{
    const regexp_list = Object.values(KINDS)
    let temp = -1;
    regexp_list.forEach((regexp,index)=>regexp.test(tok) ? temp = index : ()=>{})
    return Object.keys(KINDS)[temp]
}

let result = findKlind(token)
console.log(result)