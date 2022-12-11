
# Contributing

Thank you for looking for ways to contribute.

This project is not accepting outside contribution at this time. If you have a bug report or feature request, you may still open an issue.

## Tips

* Use `mergeConfigs` within each task to make sure that configs can pull defaults from `mrmConfig` in `package.json`
* Make sure all task parameters have default values specified

## Testing locally

Clone the repo and spin up a new project that links to it:

```bash
git clone git@github.com:osuresearch/mrm-preset-osuresearch.git
mkdir test-project
cd test-project
git init
npm init -y
npm i -D mrm ../mrm-preset-osuresearch
```

The linkage to the local package will now let you use npx commands like you would if it was on a remote.

For example:

```bash
cd test-project
npx mrm editorconfig --preset osuresearch
```

## Conventional commits

This project follows [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) guidelines.

Here's a few suggestions for common commit messages:

```
feat: add blah task
```

```
feat(jest): add config for blah
```

```
docs(contributing): update pull request policy
```

```
fix(readme): fallback to blah if no author is specified
```
