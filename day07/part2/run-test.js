const {spawn} = require('child_process')

const a = spawn('node', ['test'])
const b = spawn('node', ['test'])

process.stdin.pipe(a.stdin)
a.stdout.pipe(b.stdin)
b.stdout.pipe(process.stdout)
