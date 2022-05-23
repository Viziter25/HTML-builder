const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname,'./secret-folder'), {withFileTypes: true}, (error, dirList) => {
    if(!error) {
        dirList.forEach(element => {
            if(element.isFile()){
                fs.stat(path.join(__dirname,`./secret-folder/${element.name}`), (err, stats) => {
                    if (err) {
                        console.log(error);
                    } else {
                        let name = (element.name).split('.')[0];
                        let ext =(element.name).split('.').pop();
                        console.log(`${name} - ${ext} - ${stats.size}`);
                    }
                });
            }
        });
    } else {
        console.error(error);
    }
});