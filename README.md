[<img src="./typescript.svg" />][typescript-url]

# @gregoranders/csv

## Simple CSV parser in [TypeScript][typescript-url]

## [API Docs](./docs/index.md)

[![License][license-image]][license-url]
[![Issues][issues-image]][issues-url]
[![Code maintainability][code-maintainability-image]][code-maintainability-url] [![Code issues][code-issues-image]][code-issues-url] [![Code Technical Debt][code-tech-debt-image]][code-tech-debt-url]

[![types][npm-types-image]][npm-types-url]
[![node][node-image]][node-url]

[![Main Language][language-image]][code-metric-url] [![Languages][languages-image]][code-metric-url] [![Code Size][code-size-image]][code-metric-url] [![Repo-Size][repo-size-image]][code-metric-url]

## Features

- [TypeScript][typescript-url]
- [Jest][jest-url] Unit Tests with Code Coverage
- GitHub CI Integration (feature, development, master, release)
- Publish via CI
- Code Quality via Code Climate

|                                                                  |                                                                            |                                                                              |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [![Release][release-image]][release-url]                         |                                                                            | [![npm][npm-image]][npm-url]                                                 |
| [![Master Build][master-build-image]][master-url]                | [![Master Coverage][master-coveralls-image]][master-coveralls-url]         | [![Master Version][master-version-image]][master-version-url]                |
| [![Development Build][development-build-image]][development-url] | [![Test Coverage][development-coveralls-image]][development-coveralls-url] | [![Development Version][development-version-image]][development-version-url] |

## Example

```sh
npm install @gregoranders/csv
```

```ts
import Parser from '@gregoranders/csv';

const parser = new Parser();
const rows = parser.parse('a,b,c\n1,2,3\n4,5,6');
```

```ts
console.log(JSON.stringify(rows, null, 2));

[
  [
    "a",
    "b",
    "c"
  ],
  [
    "1",
    "2",
    "3"
  ],
  [
    "4",
    "5",
    "6"
  ]
]
```

```ts
console.log(JSON.stringify(parser.rows, null, 2));

[
  [
    "a",
    "b",
    "c"
  ],
  [
    "1",
    "2",
    "3"
  ],
  [
    "4",
    "5",
    "6"
  ]
]
```

```ts
console.log(JSON.stringify(parser.json, null, 2));

[
  {
    "a": "1",
    "b": "2",
    "c": "3"
  },
  {
    "a": "4",
    "b": "5",
    "c": "6"
  }
]
```

### Clone repository

```sh
git clone https://github.com/gregoranders/ts-csv
```

### Install dependencies

```sh
npm install
```

### Build

```sh
npm run build
```

### Testing

#### Test using [Jest][jest-url]

```sh
npm test
```

### Code Climate Checks [docker required](docs/CODECLIMATE.md)

```sh
npm run codeclimate
```

### Clear

```sh
npm run clear
```

[release-url]: https://github.com/gregoranders/ts-csv/releases
[master-url]: https://github.com/gregoranders/ts-csv/tree/master
[development-url]: https://github.com/gregoranders/ts-csv/tree/development
[repository-url]: https://github.com/gregoranders/ts-csv
[code-metric-url]: https://github.com/gregoranders/ts-csv/search?l=TypeScript
[travis-url]: https://travis-ci.org/gregoranders/ts-csv
[travis-image]: https://travis-ci.org/gregoranders/ts-csv.svg?branch=master
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
[npm-url]: https://www.npmjs.com/package/@gregoranders/csv
[npm-image]: https://img.shields.io/npm/v/@gregoranders/csv
[node-url]: https://www.npmjs.com/package/@gregoranders/csv
[node-image]: https://img.shields.io/node/v/@gregoranders/csv
[npm-types-url]: https://www.npmjs.com/package/@gregoranders/csv
[npm-types-image]: https://img.shields.io/npm/types/@gregoranders/csv
[release-url]: https://www.npmjs.com/package/@gregoranders/csv
[release-image]: https://img.shields.io/github/release/gregoranders/ts-csv
[language-image]: https://img.shields.io/github/languages/top/gregoranders/ts-csv
[languages-image]: https://img.shields.io/github/languages/count/gregoranders/ts-csv
[code-size-image]: https://img.shields.io/github/languages/code-size/gregoranders/ts-csv
[repo-size-image]: https://img.shields.io/github/repo-size/gregoranders/ts-csv
[typescript-url]: http://www.typescriptlang.org/
[jest-url]: https://jestjs.io
