
const chalk = require('chalk');
const inquirer = require('inquirer');
const { json, ini, packageJson } = require('mrm-core');
const { execSync } = require('child_process');
const { exit } = require('process');

const debug = require('debug')('osuresearch:mrm-init');

const gitOrigin = {
  name: 'gitOrigin',
  type: 'input',
  message: 'Enter git origin url',
  validate(input) {
    return !input ? 'Please create a git project and enter it\'s remote origin' : true;
  },
  when() {
    const gitFile = ini('.git/config');
    if (!gitFile.exists()) {
      return true;
    }

    const origin = gitFile.get('remote "origin"');
    return !origin || !origin.url;
  },
}

/**
 * How does this project accept outside contributions?
 *
 * Different projects may have different (legal) requirements
 * for who may or may not be a contributor.
 */
const contributionPolicy = {
  type: 'list',
  name: 'contributionPolicy',
  message: 'Select the contributor policy you want to use',
  choices: [
    {
      name: 'Allow all contributions',
      value: 'public',
    },
    {
      name: 'Allow only OSU staff, students, and faculty',
      value: 'internal',
    },
    {
      name: 'Restrict contributions to my organization',
      value: 'private',
    }
  ]
}

/**
 * Data classification as per OSU IDP
 *
 * For more information, see http://go.osu.edu/idp
 */
const dataClassification = {
  type: 'list',
  name: 'dataClassification',
  message: 'Select the OSU data classification for your project',
  choices: [
    {
      name: 'S1: Public Institutional Data',
      value: 'public',
    },
    {
      name: 'S2: Internal Institutional Data',
      value: 'internal',
    },
    {
      name: 'S3: Private Institutional Data',
      value: 'private',
    },
    {
      name: 'S4: Restricted Institutional Data',
      value: 'restricted',
    }
  ]
}

// TODO: Can I infer this?
const defaultBranch = {
  name: 'defaultBranch',
  type: 'input',
  message: 'Enter the name of the default branch',
  default: 'main',
  validate(input) {
    return input ? true : 'Please enter a name';
  },
}

const securityContact = {
  name: 'securityContact',
  type: 'input',
  message: 'Enter an email or website for reporting security issues',
  validate(input) {
    return input ? true : 'Please enter an address';
  },
}

const conductContact = {
  name: 'conductContact',
  type: 'input',
  message: 'Enter an email or website for reporting conduct issues',
  validate(input) {
    return input ? true : 'Please enter an address';
  },
}

async function task() {
  // Fill in existing answers from package.json.
  // This will allow someone to re-run tasks on an existing project.
  // Note that this is in place because mrm doesn't support config.json
  // while also referencing tasks within presets.
  const pkg = packageJson();
  const existingAnswers = pkg.get('mrmConfig', {});

  contributionPolicy.default = existingAnswers.contributionPolicy;
  dataClassification.default = existingAnswers.dataClassification;
  defaultBranch.default = existingAnswers.defaultBranch;
  securityContact.default = existingAnswers.securityContact;
  conductContact.default = existingAnswers.conductContact;

  const answers = await inquirer.prompt([
    gitOrigin,
    defaultBranch,
    contributionPolicy,
    dataClassification,
    securityContact,
    conductContact,
  ]);

  debug('answers %o', answers);

  // Initialize a git origin if one isn't already setup
  if (answers.gitOrigin) {
    console.log(chalk.yellow('git init'));
    execSync('git init');

    console.log(chalk.yellow(`git remote add origin ${answers.gitOrigin}`));
    execSync(`git remote add origin ${answers.gitOrigin}`);
  }

  const isPublic = answers.dataClassification === 'public';
  const origin = ini('.git/config').get('remote "origin"');

  // Ensure all S2-S4 projects are on UCR
  if (!isPublic && origin.url.indexOf('code.osu.edu') < 0) {
    console.log(chalk.red(
      'Only public repositories are allowed on GitHub. ' +
      'For all others, please go to https://code.osu.edu'
    ));
    exit(0);
  }

  // Save responses in package.json
  pkg
    .set('mrmConfig', {
      defaultBranch: answers.defaultBranch,
      contributionPolicy: answers.contributionPolicy,
      dataClassification: answers.dataClassification,
      securityContact: answers.securityContact,
      conductContact: answers.conductContact,
    })
    .save();
}

task.description = 'Initiate the project config file';
module.exports = task;
