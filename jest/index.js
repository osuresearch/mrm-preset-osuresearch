
const {
  lines,
  packageJson,
  template,
  install,
  uninstall,
} = require('mrm-core');

function task() {
  const pkg = packageJson();

  // Install dependencies
  const dependencies = [
    'jest',
    'ts-jest',
    '@types/jest',
  ];

  // Add testing dependencies for React
  const hasReact = pkg.get('dependencies.react');
  if (hasReact) {
    dependencies.push(
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
      'jest-environment-jsdom'
    );
  }

  install(dependencies, { dev: true });

  // Ignore test coverage files
  lines('.gitignore')
    .add('coverage/')
    .save();

  // Update package.json
  pkg
    .merge({
      jest: {
        testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
        transform: {
          '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
        },
        testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
      },
    })
    .appendScript('test', 'jest')
    .appendScript('test:watch', 'jest --watch')
    .appendScript('test:coverage', 'jest --coverage')
    .save();
}

task.description = 'Adds Jest with React support';
module.exports = task;
