import { getParam, getHash } from './parsers';

describe('#Router parser', () => {
  test('getParam', () => {
    const id = getParam('url?id=1', 'id');
    expect(id).toBe('1');
  });

  test('route', () => {
    const hash = getHash('#test?id=1');
    expect(hash).toBe('#test');
  });
});
