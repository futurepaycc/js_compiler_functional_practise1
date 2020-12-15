import match from 'js-pattern-matching';

const machCommand=(token)=>match(token)(
    (v = "DEF") => console.log("method prototype"),
    (v = "END") => console.log("method block end")
)

machCommand("END")


