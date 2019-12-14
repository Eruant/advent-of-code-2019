const { spawn } = require('child_process')

const cpuA = spawn('node', ['cpu'])
const cpuB = spawn('node', ['cpu'])
const cpuC = spawn('node', ['cpu'])
const cpuD = spawn('node', ['cpu'])
const cpuE = spawn('node', ['cpu'])

cpuA.stdout.on('data', data => console.log(`A out: ${data}`))
cpuB.stdout.on('data', data => console.log(`B out: ${data}`))
cpuC.stdout.on('data', data => console.log(`C out: ${data}`))
cpuD.stdout.on('data', data => console.log(`D out: ${data}`))
cpuE.stdout.on('data', data => console.log(`E out: ${data}`))

cpuA.stdin.on('data', data => console.log(`A in: ${data}`))
cpuB.stdin.on('data', data => console.log(`B in: ${data}`))
cpuC.stdin.on('data', data => console.log(`C in: ${data}`))
cpuD.stdin.on('data', data => console.log(`D in: ${data}`))
cpuE.stdin.on('data', data => console.log(`E in: ${data}`))

cpuA.on('close', code => console.log(`child process A closed with code ${code}`))
cpuB.on('close', code => console.log(`child process B closed with code ${code}`))
cpuC.on('close', code => console.log(`child process C closed with code ${code}`))
cpuD.on('close', code => console.log(`child process D closed with code ${code}`))
cpuE.on('close', code => console.log(`child process E closed with code ${code}`))

cpuA.stdout.pipe(cpuB.stdin)
cpuB.stdout.pipe(cpuC.stdin)
cpuC.stdout.pipe(cpuD.stdin)
cpuD.stdout.pipe(cpuE.stdin)
cpuE.stdout.pipe(cpuA.stdin)

cpuA.stdin.write('9\n', () => {})
cpuB.stdin.write('8\n', () => {})
cpuC.stdin.write('7\n', () => {})
cpuD.stdin.write('6\n', () => {})
cpuE.stdin.write('5\n', () => {})

cpuA.stdin.write('1\n', () => {})
