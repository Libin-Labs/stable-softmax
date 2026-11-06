import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('uniform', () => {
  assert.deepEqual(api.softmax([2, 2, 2]), [1 / 3, 1 / 3, 1 / 3]);
});
test('analytic odds', () => {
  const p = api.softmax([0, Math.log(3)]);
  assert.ok(Math.abs(p[1] - 0.75) < 1e-14);
});
test('extreme stable', () => {
  assert.deepEqual(api.softmax([-Number.MAX_VALUE, Number.MAX_VALUE]), [0, 1]);
});
test('temperature', () => {
  const p = api.softmax([0, 2 * Math.log(3)], 2);
  assert.ok(Math.abs(p[1] - 0.75) < 1e-14);
});
test('shift and ownership', () => {
  const a = [1, 2, 3],
    p = api.softmax(a),
    q = api.softmax(a.map((v) => v + 100));
  for (let i = 0; i < 3; i++) assert.ok(Math.abs(p[i] - q[i]) < 1e-14);
  assert.deepEqual(a, [1, 2, 3]);
});
test('invalid inputs', () => {
  assert.throws(() => api.softmax([]));
  assert.throws(() => api.softmax([1, , 2]));
  assert.throws(() => api.softmax([Infinity]));
  assert.throws(() => api.softmax([1], 0));
});
test('overflowing subtraction with large temperature', () => {
  const p = api.softmax([-Number.MAX_VALUE, Number.MAX_VALUE], Number.MAX_VALUE);
  assert.ok(Math.abs(p[0] - 1 / (1 + Math.exp(2))) < 1e-14);
});
