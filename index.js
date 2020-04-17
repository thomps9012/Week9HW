const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
    {
        type: 'input',
        name: 'github',
        message: 'What is your Github username?'
    },

    {
        type: 'input',
        name: 'project title',
        message: "What is your project's name?"
    },

     {
        type: 'input',
        name: 'description',
        message: 'Write a short description of your project'
    },
    
    {
        type: 'list',
        name: 'liscense',
        message: 'Which license should your project have?',
        choices: ['MIT', 'GPL 3.0', 'APACHE 2.0', 'BSD 3', 'None']
    },

    {
        type: 'input',
        name: 'test',
        message: 'What command do we use to run our tests',
        default: 'npm test'
    },

    {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about using your repo?'
    },

    {
        type: 'input',
        name: 'contributing',
        message: 'What does the user need to know about contributing to the repo?'
    },

];

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
    inquirer.prompt(questions).then((inquirerResponses) =>{
        console.log('Searching...');

        api
            .getUser(inquirerResponses.github)
            .then(({data}) =>{
                writeToFile('README.md', generateMarkdown({ ...inquirerResponses, ...data }));
            })
    })
}


init();
