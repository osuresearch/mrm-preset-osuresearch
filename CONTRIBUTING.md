
# Contributing

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

