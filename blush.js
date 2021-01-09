#! /usr/bin/env node

const os = require('os')
const fs = require('fs')
const shell = require("shelljs")
const path = require('path');
const inquirer = require("inquirer")
const figlet = require("figlet")
const generator = require('./generator.js')
const folderpath = path.join(os.homedir(),'blush-js')

//Clones source code in homedir
if (fs.existsSync(folderpath)){
  blush();
}
else{
  shell.exec(`git clone https://github.com/ps173/blush-js.git ${folderpath}`)
  blush();
}

const question = [
  {
    type:'checkbox',
    name:"files",
    message:"What do you want in the file",
    choices: [
      {
        name:"Navbar",
      },
      {
        name:"Hero"
      },
      {
        name:"Article"
      },
      {
        name:"Footer"
      }
    ],
    validate: function(answer){
      if(answer.length < 1){
          return 'Select atleast one'
      }
      return true;
    }
  }
]


function blush(){
//Ascii art
  figlet("BLUSH-JS",(err,data)=>{
    if(err){
      console.log("some error")
    }
    else{
      console.log(data)
    // generate css and html accordingly
      inquirer.prompt(question).then(({files})=>{
        generator.generateFiles("css",folderpath,files)
        generator.generateFiles("html",folderpath,files)
      })
     }
    })

}
