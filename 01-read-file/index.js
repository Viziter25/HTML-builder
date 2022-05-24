const fs = require('fs');
const path = require('path');

const readline = require('readline');

async function lineFromFile() {
  const fileStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    console.log(`${line}`);
  }
}
lineFromFile();