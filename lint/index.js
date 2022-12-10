
const { join } = require('path');
const { json, install, packageJson, lines, template } = require('mrm-core');
const husky = require('husky');

function task() {
  // Delete old lint configurations
  json('.eslintrc.json').delete();
  lines('.eslintignore').delete();

  const ignore = [
    'build',
    'node_modules',
  ];

  const prettierConfig = {
    'arrayParens': 'always',
    'arrowParens': 'always',
    'bracketSpacing': true,
    'parser': 'typescript',
    'printWidth': 100,
    'quoteProps': 'consistent',
    'semi': true,
    'singleQuote': true,
    'tabWidth': 2,
    'trailingComma': 'none',
    'useTabs': false
  };

  const eslintConfig = {
    extends: 'something'
  };

  // Install required dependencies
  install([
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint',
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-import-resolver-typescript',
    'eslint-plugin-import',
    'eslint-plugin-jest',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
    'husky',
    'lint-staged',
  ], { dev: true });

  // Update package.json with new tasks
  packageJson()
    .setScript('prepare', 'husky install') // npm, Yarn 1, pnpm
    .setScript('lint', 'eslint . --cache --ext ts,tsx --fix')
    .setScript('pretest', 'npm run lint')
    // .set('eslintConfig', eslintConfig)
    // .set('eslintIgnore', ignore)
    .set('prettier', prettierConfig)
    .set('lint-staged', {
      '*.{ts,tsx}': 'npm run lint',
    })
    .save();

  // Add opinionated eslint config
  template('.eslintrc', join(__dirname, 'templates', '.eslintrc'))
    .apply()
    .save();

	// Install husky
	husky.install();

	// Set lint-staged config
	husky.add('.husky/pre-commit', 'npx lint-staged');
}

task.description = 'Adds ESLint and Prettier for TypeScript and React';
module.exports = task;
