const fs = require('fs/promises');
const path = require('path');
let str = '';


async function mergeStyles() {

    await fs.writeFile(path.join(__dirname,'./project-dist/bundle.css'), '', (err) => {
        if (err) {
        console.error(err);
        }
    });

    const files = await fs.readdir(path.join(__dirname,'./styles'));
    await files.forEach(async element => {
        if(path.extname(element) == '.css') {
            const data = await fs.readFile(path.join(__dirname,`./styles/${element}`), 'utf8');
            str += data;
            await fs.writeFile(path.join(__dirname,'./project-dist/bundle.css'), str, (err) => {
                if (err) {
                console.error(err);
                }
            });
        }
    });
}
mergeStyles();
