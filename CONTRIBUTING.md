# Contributing Guide

Contributing to `@gregoranders/csv` is fairly easy. This document shows you how to
get the project, run all provided tests and generate a production-ready build.

It also covers provided tasks that help you develop with `@gregoranders/csv`.

## Dependencies

To make sure that the following instructions work, please install the following dependencies
on you machine:

- Node.js (comes with a bundles npm)
- Git

## Installation

To get the source of `@gregoranders/csv`, clone the git repository via:

```
$ git clone https://github.com/gregoranders/@gregoranders/csv
```

This will clone the complete source to your local machine. Navigate to the project folder
and install all needed dependencies via **npm**:

```
$ npm install
```

This commands installs everything which is required for building and testing the project.

## Testing

`npm test` executes the unit tests.

## Building

`npm build` executes the build.

## Contributing/Submitting changes

- Check out a new branch based on <code>development</code> and name it to what you intend to do:
  - Example:
    ```
    $ git checkout -b BRANCH_NAME origin/development
    ```
    If you get an error, you may need to fetch <code>development</code> first by using
    ```
    $ git remote update && git fetch
    ```
  - Use one branch per fix/feature
- Make your changes
  - Make sure to provide a spec for unit tests.
  - Run your tests with <code>npm test</code>.
  - When all tests pass, everything's fine.
- Commit your changes
  - Please provide a git message that explains what you've done.
  - @gregoranders/csv uses [generate-changelog](https://www.npmjs.com/package/generate-changelog), so please make sure your commits follow the [conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
  - Commit to the forked repository.
- Make a pull request
  - Make sure you send the PR to the <code>development</code> branch.
  - CI is watching you!
