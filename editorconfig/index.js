
const { ini } = require('mrm-core');
const debug = require('debug')('osuresearch:mrm-editorconfig');

/**
 * The defaults has precedence over the contents inside
 * the user config file. This is the only way we can
 * keep the config files updates
 */
const defaults = {
  '_global': {
    root: true
  },
  '*': {
    indent_style: 'space',
    indent_size: 2,
    end_of_line: 'lf',
    charset: 'utf-8',
    trim_trailing_whitespace: true,
    insert_final_newline: true
  },
  '*.json': {
    insert_final_newline: false
  },
  '*.md': {
    trim_trailing_whitespace: false
  }
};

/**
 * Merge section with the default config
 *
 * @param  {String}
 * @param  {Object}
 * @return {Object}
 */
function mergeSection (section, existing = {}) {
  const defaultConfig = defaults[section] || {};
  return Object.assign(existing, defaultConfig);
}

/**
 * Creates `.editorconfig` file. The config file is same for
 * all projects and doesn't divert on the basis of config
 */
function task() {
  const file = ini('.editorconfig', 'http://editorconfig.org')

  Object.keys(defaults).forEach((name) => {
    const values = mergeSection(name, file.get(name));
    debug('section %s: %o', name, values);
    file.set(name, values);
  });

  file.save();
}

task.description = 'Adds .editorconfig file';
module.exports = task;
