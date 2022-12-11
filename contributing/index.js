
const { template } = require('mrm-core');
const { join } = require('path');
const { lines } = require('mrm-core');
const packageRepoUrl = require('package-repo-url');
const debug = require('debug')('osuresearch:mrm-contributing');
const mergeConfigs = require('../utils/mergeConfigs');

/**
 * Creates contribution guidelines for collaborators
 */
 function task(config) {
  const { securityContact, conductContact, defaultBranch } = mergeConfigs(config);

  const repo = packageRepoUrl();

  template('CONTRIBUTING.md')
    .delete();

  template('CONTRIBUTING.md', join(__dirname, 'templates', 'contributing.md'))
    .apply({ securityContact, repo, defaultBranch })
    .save();

  template('.github/PULL_REQUEST_TEMPLATE.md', join(__dirname, 'templates', 'pull_request.md'))
    .apply({ repo, defaultBranch })
    .save();

  template('CODE_OF_CONDUCT.md', join(__dirname, 'templates', 'code_of_conduct.md'))
    .apply({ conductContact, repo, defaultBranch })
    .save();
};

task.description = 'Adds GitHub contribution guidelines';
task.parameters = {
  securityContact: {
    type: 'input',
    message: 'Enter security contact email or website',
    default: 'ordevelopment@osu.edu',
    validate(value) {
      return value ? true : 'Security contact is required';
    },
  },
  conductContact: {
    type: 'input',
    message: 'Enter conduct contact email or website',
    default: 'ordevelopment@osu.edu',
    validate(value) {
      return value ? true : 'Conduct contact is required';
    },
  },
  defaultBranch: {
    type: 'input',
    message: 'Enter default branch name',
    default: 'main',
    validate(value) {
      return value ? true : 'Default branch name is required';
    },
  }
}

module.exports = task;
