import { add } from "../utils/helpers";

describe("add function", () => {
  it("should return the sum of two numbers", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
    expect(add(-1, -1)).toBe(-2);
  });
});

import { setLast } from "../utils/helpers";

describe("setLast", () => {
  it("should return { A: false, B: false } when usersNumber is divisible by groupsNumber", () => {
    const result = setLast(10, 5);
    expect(result).toEqual({ A: false, B: false });
  });

  it("should return { A: false, B: true } when usersNumber is not divisible by groupsNumber", () => {
    const result = setLast(10, 3);
    expect(result).toEqual({ A: false, B: true });
  });

  it("should handle edge case when groupsNumber is 0", () => {
    const result = setLast(10, 0);
    expect(result).toEqual({ A: false, B: true });
  });

  it("should handle negative numbers", () => {
    const result = setLast(-10, 3);
    expect(result).toEqual({ A: false, B: true });
  });
});
