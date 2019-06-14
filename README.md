## inject2 

> Dependency Injection for Node.js

[![inject2](https://img.shields.io/npm/v/inject2.svg)](https://npmjs.org/inject2)
[![Build Status](https://travis-ci.org/song940/injector.svg?branch=master)](https://travis-ci.org/song940/injector)

### Installation

```bash
$ npm install inject2
```

### Example

```js
const Injector = require('inject2');

const invoke = Injector({
  a:1,
  b:2,
  c: (a,b) => a+b
});

invoke(c => c).then(console.log); // 3
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---
