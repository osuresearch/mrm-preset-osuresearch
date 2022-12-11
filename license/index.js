
const createLicense = require('mrm-task-license');

function task() {
  createLicense({
    license: 'MIT',
    licenseFile: 'LICENSE.md',
    name: 'The Ohio State University Office of Research',
    email: 'ordevelopment@osu.edu',
  });
}

task.description = 'Adds MIT license to the project';
module.exports = task;
