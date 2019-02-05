# Updating npm dependencies

- Check outdated packages

```sh
yarn outdated
```

- Update local packages according to `package.json`

```sh
yarn upgrade
```

- Upgrade packages manually

```sh
yarn upgrade <package_name>@latest
```

To upgrade multiple package at once interactively, you can also use:

```sh
yarn upgrade-interactive --latest
```

## Locking package versions

[Yarn](https://yarnpkg.com) generates a `yarn.lock` file automatically each time an install, update or upgrade command
is run, to ensure a reproducible dependency tree and avoid unwanted package updates.

If you need reproducible dependencies, which is usually the case with the continuous integration systems, you should
use `yarn install --frozen-lockfile` flag.

# Updating angular-related dependencies

See the [Angular update website](https://update.angular.io) to guide you through the updating/upgrading steps.
