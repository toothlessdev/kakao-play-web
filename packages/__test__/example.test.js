import { test, expect } from "./test.js";

test("toBe()", () => {
    expect(1 + 1).toBe(2);
});

test("toEqual()", () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
});
