const Injector = require('..');

const invoke = Injector({
  a:1,
  b:2,
  c: (a,b) => a+b
});

invoke(c => c).then(console.log);
