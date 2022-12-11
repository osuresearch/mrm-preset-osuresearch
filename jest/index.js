
const {
  lines,
  packageJson,
  install,
} = require('mrm-core');
const debug = require('debug')('osuresearch:mrm-jest');

function task() {
  // Install dependencies
  const dependencies = [
    'jest',
    'ts-jest',
    '@types/jest',
  ];

  // Add testing dependencies for React
  const pkg = packageJson();
  const hasReact = pkg.get('dependencies.react') || pkg.get('devDependencies.react');
  if (hasReact) {
    dependencies.push(
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
      'jest-environment-jsdom'
    );
  }

  debug('installing dependencies %o', dependencies);

  install(dependencies, { dev: true });

  // Ignore test coverage files
  lines('.gitignore')
    .add('coverage/')
    .save();

  // Update package.json
  packageJson()
    .merge({
      jest: {
        preset: 'ts-jest',
        testEnvironment: 'jest-environment-jsdom',
        testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
        transform: {
          '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
        },
        testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
        moduleFileExtensions: ['ts', 'tsx', 'json'],
      },
    })
    .appendScript('test', 'jest')
    .appendScript('test:watch', 'jest --watch')
    .appendScript('test:coverage', 'jest --coverage')
    .save();
}

task.description = 'Adds Jest with React support';
module.exports = task;
