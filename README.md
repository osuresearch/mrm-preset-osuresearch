
# 🧰 OSU Research Mrm Preset

The OSU Research preset for [Mrm](https://mrm.js.org/) adds a suite of tasks to keep project configuration files in-sync and policies compliant across university projects.


## Getting Started

All tasks are available under the `osuresearch` preset.

For full project scaffolding, we have a few aliased variations available that will walk you through the setup process.

### Create a React Components Package

```bash
npx mrm react-package --preset osuresearch
```

Batteries included:

* React 18 with TypeScript
* Jest with a jsdom environment
* ESLint and Prettier for code linting
* Bundling for `esm`, `cjs` + `umd`
* Conventional commits for Semantic Release GitHub Action
* Standard GitHub issue workflows and contribution guidelines

Once configured, you can boot up Storybook and start developing components

```
npm run storybook
```

### 🤔 TODO: More!


## Tasks

Each task is isolated into its own directory with a `README.md` to describe what codemods the task performs.

Some tasks may support additional configurations.

For example, if you want to replace the contribution contacts, you can pass those into the preset task:

```bash
npx mrm contributing
  --preset osuresearch
  --config:securityContact "security@osu.edu"
  --config:conductContact "conduct@osu.edu"
```


## Policies and Procedures

For folks who like to focus on policy review, the generated policies are:

* [Submitting Feature Requests](./github/templates/feature_request.md)
* [Submitting Bug Reports](./github/templates/bug_report.md)
* [Submitting Other Issues](./github/templates/issue.md)
* [Contributor Code of Conduct](./contributing/templates/code_of_conduct.md)
* [Code Contribution Guidelines](./contributing/templates/contributing.md)
* [Commit Conventions](./conventional-commits/templates/convention.md)
* [MIT License](https://en.wikipedia.org/wiki/MIT_License)

For further questions regarding policies and procedures, contact Chase [mcmanning.1@osu.edu](mailto:mcmanning.1@osu.edu).
