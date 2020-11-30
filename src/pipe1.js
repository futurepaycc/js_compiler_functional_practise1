// ---------------------------------------------------------------------https://github.com/tc39/proposal-pipeline-operator/
let person = { score: 25 };

function double (x) { return x + x; }
function add (x, y) { return x + y; }

function boundScore (min, max, score) {
  return Math.max(min, Math.min(max, score));
}

let newScore = person.score
  |> double
  |> (_ => add(7, _))
  |> (_ => boundScore(0, 100, _));

console.log(newScore)