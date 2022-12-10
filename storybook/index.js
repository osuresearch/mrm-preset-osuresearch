
const { join } = require('path');
const { packageJson, install, template } = require('mrm-core');
const debug = require('debug')('osuresearch:mrm-storybook');

function task() {
  // Install dependencies
  const dependencies = [
    '@babel/core',
    '@types/react',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/builder-webpack4',
    '@storybook/manager-webpack4',
    '@storybook/react',
    '@storybook/testing-library',
    'babel-loader',
    'react-dom', // Required by Storybook to run
    'storybook-dark-mode',
    'html-webpack-plugin', // See: https://github.com/storybookjs/storybook/issues/13332
  ];

  debug('installing dependencies %o', dependencies);

  // Add tasks to package.json
  install(dependencies, { dev: true });
  packageJson()
    .setScript('storybook', 'start-storybook -p 6006')
    .setScript('build-storybook', 'build-storybook')
    .save();

  // Add templates to support plugins + dark mode
  template('.storybook/main.js', join(__dirname, 'templates', 'main.js'))
    .apply({})
    .save();

  template('.storybook/preview.js', join(__dirname, 'templates', 'preview.js'))
    .apply({})
    .save();

  template('.storybook/DocsContainer.js', join(__dirname, 'templates', 'DocsContainer.js'))
    .apply({})
    .save();

  // Add example component and stories
  template('src/components/Button/Button.tsx', join(__dirname, 'templates', 'Button.tsx'))
    .apply({})
    .save();

  template('src/components/Button/Button.stories.tsx', join(__dirname, 'templates', 'Button.stories.tsx'))
    .apply({})
    .save();
}

task.description = 'Adds Storybook for React';
module.exports = task;
