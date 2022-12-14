
const { join } = require('path');
const meta = require('user-meta');
const packageRepoUrl = require('package-repo-url');
const parseAuthor = require('parse-author');
const { packageJson, install, json, template } = require('mrm-core');
const debug = require('debug')('osuresearch:mrm-readme');
const mergeConfigs = require('../utils/mergeConfigs');

function getAuthorName(pkg) {
	const raw = pkg.get('author.name') || pkg.get('author') || '';
	return parseAuthor(raw).name;
}

function getAuthorUrl(pkg) {
	const raw = pkg.get('author.url') || pkg.get('author.email') || pkg.get('author') || '';
	return parseAuthor(raw).url;
}

function task(config) {
  const { package, authorName, authorUrl } = mergeConfigs(config);

  template('README.md', join(__dirname, 'templates', 'readme.md'))
    .apply({
			package,
			authorName,
			authorUrl,
			repo: packageRepoUrl(),
		})
    .save();
}

task.description = 'Adds README file';
task.parameters = {
  package: {
		type: 'input',
		message: 'Enter package name',
		default: () => packageJson().get('name'),
		validate(value) {
			return value ? true : 'Package name is required';
		},
	},
	authorName: {
		type: 'input',
		message: 'Enter author name',
		default: () => getAuthorName(packageJson()) || meta.name,
		validate(value) {
			return value ? true : 'Author name is required';
		},
	},
	authorUrl: {
		type: 'input',
		message: 'Enter author site URL',
		default: () => getAuthorUrl(packageJson()) || meta.name,
		validate(value) {
			return value ? true : 'Author URL is required';
		},
	},
}

module.exports = task;
