let fs = require('fs');
const path = require('path');

function callBack(error) {
    if (error) {
        console.log(error);
    }
}

async function copyDirectory() {
    await fs.mkdir('./04-copy-directory/files-copy',{ recursive: true }, err => {
    if(err) throw err;
        console.log('Файлы успешно копированы');
    });

    await fs.readdir(path.join(__dirname,'./files-copy'), (error,file) => {
        file.forEach(async element => {
            await fs.unlink(path.join(__dirname,`./files-copy/${element}`), function(err) {
                if (err) {
                    throw err;
                } 
            });
        });
    });

   await fs.readdir(path.join(__dirname,'./files'), (error,files) => {
        if(!error) {
            files.forEach(async (element) => {
               await fs.copyFile(path.join(__dirname,`./files/${element}`), path.join(__dirname,`./files-copy/${element}`), callBack);
            });
        } else {
            console.log(error);
        }
    });
}

copyDirectory();
