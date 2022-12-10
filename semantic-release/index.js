
const { yaml } = require('mrm-core');
const createSemanticRelease = require('mrm-task-semantic-release');

function task() {
  createSemanticRelease({
    workflowFile: '.github/workflows/release.yml',
    readmeFile: 'README.md',
  });

  // Patch `master` to `main` for the workflow template
  // TODO: Backport support into mrm-task-semantic-release
  yaml('.github/workflows/release.yml')
    .unset('on')
    .merge({
      on: {
        push: {
          branches: ['main'],
        }
      }
    })
    .save();
}

task.description = 'Adds Semantic Release to the project';
module.exports = task;
