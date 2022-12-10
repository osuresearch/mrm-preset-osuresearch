
const { template } = require('mrm-core');
const { join } = require('path');
const { lines } = require('mrm-core');
const debug = require('debug')('osuresearch:mrm-contributing');

/**
 * Creates contribution guidelines for collaborators
 */
 function task({ securityEmail, conductEmail }) {

  template('CONTRIBUTING.md')
    .delete();

  template('CONTRIBUTING.md', join(__dirname, 'templates', 'contributing.md'))
    .apply({ securityEmail })
    .save();

  template('.github/PULL_REQUEST_TEMPLATE.md', join(__dirname, 'templates', 'pull_request.md'))
    .apply({
      repo: 'TODO',
      branch: 'TODO'
    })
    .save();

  template('CODE_OF_CONDUCT.md', join(__dirname, 'templates', 'code_of_conduct.md'))
    .apply({ conductEmail })
    .save();
};

task.description = 'Adds GitHub contribution guidelines';
task.parameters = {
  securityEmail: {
    type: 'input',
    message: 'Enter security contact email',
    default: 'ordevelopment@osu.edu',
    validate(value) {
      return value ? true : 'Security contact email is required';
    },
  },
  conductEmail: {
    type: 'input',
    message: 'Enter conduct contact email',
    default: 'ordevelopment@osu.edu',
    validate(value) {
      return value ? true : 'Conduct contact email is required';
    },
  }
}

module.exports = task;
