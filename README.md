# @gregoranders/csv

## Simple CSV parser in [TypeScript](http://www.typescriptlang.org/)

## [API Docs](./api/index.md)

[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Issues][issues-image]][issues-url]

<!-- [![Code maintainability][code-maintainability-image]][code-maintainability-url] [![Code issues][code-issues-image]][code-issues-url] [![Code Technical Debt][code-tech-debt-image]][code-tech-debt-url] -->

[![Main Language](https://img.shields.io/github/languages/top/gregoranders/ts-csv)][code-metric-url] [![Languages](https://img.shields.io/github/languages/count/gregoranders/ts-csv)][code-metric-url] [![Code Size](https://img.shields.io/github/languages/code-size/gregoranders/ts-csv)][code-metric-url] [![Repo-Size](https://img.shields.io/github/repo-size/gregoranders/ts-csv)][code-metric-url]

## Features

- TypeScript
- Jest Snapshot/Unit Tests with Code Coverage
- GitHub CI Integration (feature, development, master)
- Code Quality via Code Climate

|                                                                  |                                                                            |                                                                              |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [![Master Build][master-build-image]][master-url]                | [![Master Coverage][master-coveralls-image]][master-coveralls-url]         | [![Master Version][master-version-image]][master-version-url]                |
| [![Development Build][development-build-image]][development-url] | [![Test Coverage][development-coveralls-image]][development-coveralls-url] | [![Development Version][development-version-image]][development-version-url] |

## Example

```sh
npm install --save-dev ts-csv
```

```ts
import Parser from '@gregoranders/csv';

const parser = new Parser();
const rows = parser.parse('a,b,c\n1,2,3');

console.log(rows);
```

### Clone repository

```
git clone https://github.com/gregoranders/ts-csv
```

### Install dependencies

```
npm install
```

### Build

```
npm run build
```

### Testing

#### Test using [Jest](https://jestjs.io/)

```
npm test
```

### Code Climate Checks [docker required](docs/CODECLIMATE.md)

```
npm run codeclimate
```

### Clear

```
npm run clear
```

[release-url]: https://github.com/gregoranders/ts-csv/releases
[master-url]: https://github.com/gregoranders/ts-csv/tree/master
[development-url]: https://github.com/gregoranders/ts-csv/tree/development
[repository-url]: https://github.com/gregoranders/ts-csv
[code-metric-url]: https://github.com/gregoranders/ts-csv/search?l=TypeScript
[travis-url]: https://travis-ci.org/gregoranders/ts-csv
[travis-image]: https://travis-ci.org/gregoranders/ts-csv.svg?branch=master
[daviddm-url]: https://david-dm.org/gregoranders/ts-csv
[daviddm-image]: https://david-dm.org/gregoranders/ts-csv.svg?branch=master
[license-url]: https://github.com/gregoranders/ts-csv/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/gregoranders/ts-csv.svg
[master-version-url]: https://github.com/gregoranders/ts-csv/blob/master/package.json
[master-version-image]: https://img.shields.io/github/package-json/v/gregoranders/ts-csv/master
[development-version-url]: https://github.com/gregoranders/ts-csv/blob/development/package.json
[development-version-image]: https://img.shields.io/github/package-json/v/gregoranders/ts-csv/development
[issues-url]: https://github.com/gregoranders/ts-csv/issues
[issues-image]: https://img.shields.io/github/issues-raw/gregoranders/ts-csv.svg
[release-build-image]: https://github.com/gregoranders/ts-csv/workflows/Release%20CI/badge.svg
[master-build-image]: https://github.com/gregoranders/ts-csv/workflows/Master%20CI/badge.svg
[development-build-image]: https://github.com/gregoranders/ts-csv/workflows/Development%20CI/badge.svg
[master-coveralls-url]: https://coveralls.io/github/gregoranders/ts-csv?branch=master
[master-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/ts-csv/master
[development-coveralls-image]: https://img.shields.io/coveralls/github/gregoranders/ts-csv/development
[development-coveralls-url]: https://coveralls.io/github/gregoranders/ts-csv?branch=development
[code-maintainability-url]: https://codeclimate.com/github/gregoranders/ts-csv/maintainability
[code-maintainability-image]: https://img.shields.io/codeclimate/maintainability/gregoranders/ts-csv
[code-issues-url]: https://codeclimate.com/github/gregoranders/ts-csv/maintainability
[code-issues-image]: https://img.shields.io/codeclimate/issues/gregoranders/ts-csv
[code-tech-debt-url]: https://codeclimate.com/github/gregoranders/ts-csv/maintainability
[code-tech-debt-image]: https://img.shields.io/codeclimate/tech-debt/gregoranders/ts-csv
[master-circleci-image]: https://circleci.com/gh/gregoranders/ts-csv/tree/master.svg?style=shield
[master-circleci-url]: https://app.circleci.com/pipelines/github/gregoranders/ts-csv?branch=master
[development-circleci-image]: https://circleci.com/gh/gregoranders/ts-csv/tree/development.svg?style=shield
[development-circleci-url]: https://app.circleci.com/pipelines/github/gregoranders/ts-csv?branch=development
