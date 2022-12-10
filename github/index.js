
const { template } = require('mrm-core');
const { join } = require('path');
const debug = require('debug')('osuresearch:mrm-github');

/**
 * Creates typical GitHub project templates
 */
 function task() {
  // Could also add issue.md -> .github/ISSUE_TEMPLATE.md as an alternative.

  template('.github/ISSUE_TEMPLATE/bug_report.md', join(__dirname, 'templates', 'bug_report.md'))
    .apply()
    .save();

  template('.github/ISSUE_TEMPLATE/feature_request.md', join(__dirname, 'templates', 'feature_request.md'))
    .apply()
    .save();
};

task.description = 'Adds GitHub issue templates';
module.exports = task;
