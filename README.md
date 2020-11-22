# data-search (AKA data-search-code-challenge-ts)

A small command-line app written in TypeScript, to search structured data provided in JSON files (as part of a code challenge).  
The aim of this code base is to satisfy the requirements of a code challenge.

The code challenge solution in question has also been written in Ruby [here](https://github.com/philipwindeyer/data-search-code-challenge), although the Ruby version differs significantly and is generic in nature (in that it can be used to search any data set).

It specifically provides the ability to search for "organisations", "users" and "tickets" (provided via JSON files), and will display accompanying related data.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/data-search.svg)](https://github.com/philipwindeyer/data-search-code-challenge-ts/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) - the app is built on v15 but will run on older versions also (v12 and up)
- [Yarn](https://yarnpkg.com/) - or NPM if you'd prefer to use that

# Usage

<!-- TODO: update this to reflect local usage only -->

<!-- usage -->

```sh
$ npm install -g data-search
$ data-search COMMAND
running command...
$ data-search (-v|--version|version)
data-search/0.0.1 darwin-x64 node-v15.0.1
$ data-search --help [COMMAND]
USAGE
  $ data-search COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

## yarn

`yarn` will pull all necessary node dependencies required for the app to run, and for tasks (AKA scripts) to execute successfully.

It essentially bootstraps the app so it can be run. tested, linted, etc.

## yarn test

`yarn test` will execute the test suite.

Ideally, a contributer should aim to achieve 100% test coverage with their tests.

In this ideal scenario, the output will look something like this:

```sh
% yarn test
yarn run v1.22.10
$ nyc --extension .ts mocha --forbid-only "test/**/*.test.ts"


  <suite-name>
    #<test-group-name>
      ✓ <test-name>

  ...

  <x> passing (285ms)

----------------------------------|----------|----------|----------|----------|-------------------|
File                              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------------------|----------|----------|----------|----------|-------------------|
All files                         |      100 |      100 |      100 |      100 |                   |
 src                              |      100 |      100 |      100 |      100 |                   |
  index.ts                        |      100 |      100 |      100 |      100 |                   |
 src/data-repository              |      100 |      100 |      100 |      100 |                   |
  data-repository.ts              |      100 |      100 |      100 |      100 |                   |
  ...                             |      100 |      100 |      100 |      100 |                   |
----------------------------------|----------|----------|----------|----------|-------------------|
✨  Done in 6.18s.
```

## yarn lint

`yarn lint` will execute the linter.

Run `yarn lint --fix` to autocorrect anything that can easily be corrected.

The linter in use, also uses `prettier` under the hood to apply styles (tab == 2 spaces, etc).

Ideal output looks something like this:

```sh
% yarn lint
yarn run v1.22.10
$ eslint . --ext .ts --config .eslintrc
✨  Done in 2.33s.
```

<!-- commandsstop -->
