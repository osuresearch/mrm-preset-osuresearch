
const chalk = require('chalk');
const inquirer = require('inquirer');
const { json, ini, packageJson } = require('mrm-core');
const { execSync } = require('child_process');

const debug = require('debug')('osuresearch:mrm-init');

const gitOrigin = {
  name: 'gitOrigin',
  type: 'input',
  message: 'Enter git origin url',
  validate (input) {
    return !input ? 'Please create a git project and enter it\'s remote origin' : true;
  },
  when () {
    const gitFile = ini('.git/config')
    if (!gitFile.exists()) {
      return true;
    }

    const origin = gitFile.get('remote "origin"');
    return !origin || !origin.url;
  },
}

async function task () {
  const answers = await inquirer.prompt([
    gitOrigin,
  ]);

  // debug('init %o', fileContent);

  if (answers.gitOrigin) {
    console.log(chalk.yellow('git init'));
    execSync('git init');

    console.log(chalk.yellow(`git remote add origin ${answers.gitOrigin}`));
    execSync(`git remote add origin ${answers.gitOrigin}`);
  }
}

task.description = 'Initiate the project config file';
module.exports = task;
