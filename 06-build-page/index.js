const fs = require('fs/promises');

const mergeStyle = async function(path, destination) {
    try {
      const styles = await fs.readdir(path, {withFileTypes: true});
      let a = [];
      for (let style of styles) {
        if (style.name.split('.')[1] === 'css' && style.isFile()) 
        {
          a.push(await fs.readFile(`${path}/${style.name}`));
        }
      }
      await fs.writeFile(`${destination}/style.css`, [...a]);
    } 
    catch (err) {
      console.log(err);
    }
  };

  const copyDir = async function(path, destination) {
    try {
      await fs.rm(destination, {recursive: true, force: true});
      await fs.mkdir(destination, {recursive: true});
      let files = await fs.readdir(path, {withFileTypes: true});
      for (let file of files) {
        if (file.isFile()) {
          fs.copyFile(`${path}/${file.name}`, `${destination}/${file.name}`);
        } else {
          copyDir(`./06-build-page/assets/${file.name}`, `./06-build-page/project-dist/assets/${file.name}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };


const buildPage = async function(...args) {
    try {
    let template = await fs.readFile("./06-build-page/template.html", {encoding: 'utf-8'});
    let components = await fs.readdir("./06-build-page/components");
    for (let i = 0; i < args.length; i++) {
        if (template.includes(args[i])) {
          for (let k = 0; k < components.length; k++) {
            if (args[i] == `{{${components[k].split('.')[0]}}}`) 
            {
              template = template.replace(args[i], String(await fs.readFile(`./06-build-page/components/${components[k]}`)));
            }
          }
        }
      }
      fs.writeFile('./06-build-page/project-dist/index.html', template);
} 
catch(err) {
    console.log(err);
  }
};

copyDir('./06-build-page/assets', './06-build-page/project-dist/assets');
mergeStyle('./06-build-page/styles', './06-build-page/project-dist');
buildPage('{{footer}}', '{{articles}}', '{{header}}', '{{about}}');