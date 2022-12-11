# Contributing

We love pull requests. And following these guidelines will make your pull request easier to merge.

If you want to contribute but don't know what to do, take a look at these two labels: [help wanted](${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [good first issue](${repo}/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

_[Use GitHub interface](https://blog.sapegin.me/all/open-source-for-everyone/) for simple documentation changes, otherwise follow the steps below._

## Prerequisites

- If it's your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Install [EditorConfig](https://editorconfig.org/) plugin for your code editor to make sure it uses correct settings.
- Fork the repository and clone your fork.
- Install dependencies: `npm install`.

## Coding style

We make use of Typescript along with [ESLint](https://eslint.org) to ensure a consistent coding style. All of the rules are defined inside the `.eslintrc` file.

## Development workflow

Always make sure to lint and test your code before pushing it to the GitHub.

```bash
npm test
```

Or run tests in watch mode:

```bash
npm run test:watch
```

**Make sure you add sufficient tests for the change**.

**Please update the npm lock file (`package-lock.json`) if you add or update dependencies.**

## Other notes

- If you have commit access to the repository and want to make a big change or not sure about something, make a new branch and open a pull request.
- We're using [Prettier](https://github.com/prettier/prettier) to format code, so don't worry too much about code formatting.

- Don't commit generated files, like minified JavaScript.
- Don't change version numbers in `package.json` or the `CHANGELOG.md` file.

## Report security issues

All security issues must be reported privately via [email](mailto:${securityContact}) and not through any of the public channels.

## Need help?

If you want to contribute but have any questions, concerns or doubts, feel free to ping maintainers. Ideally create a pull request with `WIP` (Work in progress) in its title and ask questions in the pull request description.
