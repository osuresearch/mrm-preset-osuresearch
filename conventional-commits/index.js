
const { join } = require('path');
const { packageJson, install, template, lines } = require('mrm-core');

function task () {
  // TODO: pre-commit hook through husky

  template('.github/COMMIT_CONVENTION.md', join(__dirname, 'templates', 'convention.md'))
    .apply()
    .save();
}

task.description = 'Enforce conventional commit messages';
module.exports = task;
