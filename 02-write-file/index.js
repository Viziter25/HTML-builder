const fs = require('fs');
const path = require('path');


fs.writeFile(path.join(__dirname,'text.txt'),'', (err) => {
  if (err) {
    console.error(err);
  }
});

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output,prompt: '' });
rl.prompt();
console.log('Hello, write some text, please!');
rl.on('line', (line) => {
  switch (line) {
    case 'exit':
      rl.close();
      break;
    default:
      fs.readFile(path.join(__dirname,'text.txt'), 'utf8', (err, fileContent) => {
        if (err) {
            console.error(err);
        } 
        let toWrite = `${fileContent}\n ${line}`;
        fs.writeFile(path.join(__dirname,'text.txt'), toWrite, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Thank you, Have a great day!');
  process.exit(0);
  });