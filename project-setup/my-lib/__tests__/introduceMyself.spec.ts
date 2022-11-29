import { introduceMyself } from '../src';

describe('introduceMyself', () => {
  it('should introduce me', () => {
    expect(introduceMyself('P', 'B-R')).toEqual('Mr. P B-R');
  });
});
