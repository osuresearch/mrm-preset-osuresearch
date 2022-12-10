
const { packageJson, install, json, lines } = require('mrm-core');
const { execSync } = require('child_process');
const debug = require('debug')('osuresearch:mrm-package');

// tsconfig.json settings
const tsConfig = {
  compilerOptions: {
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    jsx: 'react',
    module: 'ESNext',
    target: 'ESNext',
    sourceMap: true,
    outDir: 'dist',
    moduleResolution: 'node',
    allowSyntheticDefaultImports: true,
    forceConsistentCasingInFileNames: true,
    noEmit: true
  },
  include: [
    'src'
  ],
  exclude: [
    'dist',
    'node_modules',
    'src/**/*.test.{ts,tsx}',
    'src/**/*.stories.{mdx,tsx}',
  ],
};

function task() {
  // Make a package.json if they don't have one already
  if (!packageJson().exists()) {
    execSync('npm init --yes')
  }

  // Install standard dependencies for a TypeScript / React app
  const dependencies = [
    '@types/react',
    '@types/react-dom',
    'microbundle',
    'react',
    'react-dom',
    'typescript',

    // Jest dependencies
    // '@testing-library/jest-dom',
    // '@testing-library/react',
    // '@testing-library/user-event',
    // '@types/jest',
    // 'jest',
    // 'jest-environment-jsdom',
    // 'ts-jest',
  ];

  debug('installing dependencies %o', dependencies);

  install(dependencies, { dev: true });

  // Setup common package configurations
  packageJson()
    // .setScript('test', 'jest')
    .setScript('build', 'microbundle --jsx React.createElement --jsxFragment React.Fragment')
    .set('main', 'dist/index.umd.js')
    .set('module', 'dist/index.module.js')
    .set('source', 'src/index.package.ts')
    .set('files', [
      'dist',
      // TODO: ?
    ])
    .save();

  // Add tsconfig.json
  debug('creating files %o', ['tsconfig.json']);
  json('tsconfig.json')
    .merge(tsConfig)
    .save();

  // Add the main export file to get bundled
  lines('src/index.package.ts')
    .add('// Package exports')
    .save();
}

task.description = 'Adds dependencies for React component packages';
module.exports = task;
