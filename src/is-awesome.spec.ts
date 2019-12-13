import { isAwesome } from './is-awesome';

describe('isAwesome', () => {
  it('should return true for eXtreme Programming', () => {
    expect(isAwesome('eXtreme Programming')).toBe(true);
  });
});
