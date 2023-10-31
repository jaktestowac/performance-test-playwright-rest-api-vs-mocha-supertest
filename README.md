# Performance Test: Playwright vs Mocha with SuperTest for REST API

This repository contains performance test scripts and configurations for comparing the performance of two popular testing frameworks, **Playwright** and **Mocha with SuperTest**, in the context of testing RESTful APIs.

## Introduction

When it comes to testing RESTful APIs, selecting the right testing framework is crucial. This project aims to provide insights into the performance of Playwright compared with Mocha with SuperTest. 

## 🧰 Requirements

### Libs

Tests were written in JavaScript/TypeScript.

You will need:
- node.js - https://nodejs.org/en (tested with v18.17.1)

### System under test (SUT) 

Tests were prepared for application **🦎GAD** that is available at:

https://github.com/jaktestowac/gad-gui-api-demo


## 🚀 Getting Started

Follow these instructions to get started with running tests.

To check time from starting command to finish, use following command (Windows, Powershell):

```
Measure-Command { start-process npm 'run test' -wait}
```

or:
```
Measure-Command { start-process npm 'run test' -wait -NoNewWindow}
```

### Playwright

Navigate to directory `./playwright` and run:

```
npm i
```
In config.js there is variable `numberOfRuns` that indicates number of runs.

To run tests use following command:
```
npm run test
```

Results will be displayed on console and in `results.json` file.

### Mocha + Supertest

Navigate to directory `./mocha-supertest` and run:

```
npm i
```
In config.js there is variable `numberOfRuns` that indicates number of runs.

To run tests use following command:
```
npm run test
```

Results will be displayed on console and in `results.json` file.

## 💭 Final Thoughts

This is just a sample and simple tests suit. As you explore the results and insights gathered in this repository, keep in mind that the best choice of framework may vary depending on the specific needs and requirements of your project. Playwright offers a comprehensive approach that includes end-to-end testing and browser automation, while Mocha with SuperTest is well-established in the API testing domain.

Both have their strengths and weaknesses, and your selection should align with your objectives and constraints.

We encourage you to further investigate and adapt these frameworks to suit your unique testing scenarios.
