const { matches } = require('z')

/*ERROR: z也是对象严格匹配  */
const person = { name: 'John',age:38 }
matches(person)(
  (x = { name: 'John'}) => console.log('John you are not welcome!'),
  (x)                    => console.log(`Hey ${x.name}, you are welcome!`)
)