
const { lines } = require('mrm-core')
const debug = require('debug')('osuresearch:mrm-gitignore')

/**
 * Creates `.gitignore` file
 */
function task() {
  const paths = [
    'node_modules',
    'coverage',
    '.DS_STORE',
    '.idea',
    '.vscode/',
    '*.log',
    'build',
    'dist',
  ];

  debug('.gitignore %o', paths);

  lines('.gitignore')
    .add(paths)
    .save();
};

task.description = 'Adds standard .gitignore';
module.exports = task;
