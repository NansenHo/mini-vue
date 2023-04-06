// You need to use Babel to transpile ES6 Modules into CommonJS Modules in NodeJS
// Detail: https://jestjs.io/docs/getting-started#using-babel
import { add } from '../index'

it('init', () => {
  expect(add(1, 1)).toBe(2)
});