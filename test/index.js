const injector = require('..');
const test = require('./test');
const assert = require('assert');

test('injector#invoke', async () => {
  const invoke = injector({
    a: 1,
    b: 2,
    c: (a, b) => a + b
  });
  const result = await invoke(c => c);
  assert.equal(result, 3);
});

test('injector#getParameterNames', () => {
  const fn1 = (a, b, c) => {};
  assert.deepEqual(injector.getParameterNames(fn1), [ 'a', 'b', 'c' ]);

  const fn2 = async a => 1;
  assert.deepEqual(injector.getParameterNames(fn2), [ 'a' ]);

  function fn3(){}
  assert.deepEqual(injector.getParameterNames(fn3), [  ]);

});