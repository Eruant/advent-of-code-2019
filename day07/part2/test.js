const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('enter some text: ', text => {
  rl.write(text.toUpperCase() + '\n')
  rl.close()
})
