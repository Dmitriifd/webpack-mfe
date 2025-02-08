import { isEven, multiply, sum } from '../math';

describe('Math utils', () => {
  describe('sum', () => {
    it('should add two numbers correctly', () => {
      expect(sum(1, 2)).toBe(3);
      expect(sum(-1, 1)).toBe(0);
      expect(sum(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('isEven', () => {
    it('should correctly determine if number is even', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isEven(0)).toBe(true);
      expect(isEven(-2)).toBe(true);
      expect(isEven(-3)).toBe(false);
    });
  });
});
