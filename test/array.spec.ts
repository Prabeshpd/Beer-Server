import { expect } from 'chai';

describe('Array.indexOf', () => {
  it('should return the index of given element in the array', () => {
    const arr = ['a', 'b', 'c'];

    expect(arr.indexOf('a')).to.equal(0);
  });
});
