// --{{
// Module to generate files
// }}
const fs = require('fs')
const path = require('path')

// Temlplates for files

let cssBase = `/*Genrated via blush-script*/\n
*{
    padding:0px;
    margin:0px;
    box-sizing:border-box;
} `;

const startHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
<!-- GENERATED VIA blush-js -->`;

const closingHTML= `</body>\n</html>`;


//generateFiles function which takes three parameters: type of files, folderPath , array of files.. 
// The files are downloaded in home directory where the are found
exports.generateFiles = (type,folderPath,array)=>{
    if(type=="css"){
         let basecont=`${cssBase}\n`;
        array.forEach(elem=>{
         const cssfiles = fs.readFileSync(path.join(path.sep,`${folderPath}`,`blush-css`,`${elem}.css`),`utf8`)
         basecont +=`\n${cssfiles}\n`
        })
         fs.writeFileSync(`./style.css`,`${basecont}`)
        console.log('css was generated at ./style.css')
    }
    else{
        let basecont=``;
        array.forEach(elem=>{
         const htmlfiles = fs.readFileSync(path.join(path.sep,`${folderPath}`,`blush-html`,`${elem}.html`),`utf8`)
         basecont +=`\n${htmlfiles}\n`
        })
         fs.writeFileSync(`./index.html`,`${startHTML}\n${basecont}\n${closingHTML}`)
        console.log('html was generated at ./index.html')
    }
}

