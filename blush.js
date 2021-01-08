#! /usr/bin/env node

const os = require('os')
const path = require('path');
const inquirer = require("inquirer")
const figlet = require("figlet")
const generator = require('./generator.js')
const folderpath = path.join(path.sep,'usr','local','node_modules','blush-js')

//TODO: ADD SHELLJS AND GIT CLONE IF FILE DOES NOT EXIST!!

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




console.clear();

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

