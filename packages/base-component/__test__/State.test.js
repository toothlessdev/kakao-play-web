import { test, expect } from "../../__test__/test.js";
import { State } from "../State.js";

test("State 상태가 변경되면 onChange 가 호출된다", () => {
    let paramKey = null;
    let paramValue = null;

    const state = new State({ count: 0 }, (key, value) => {
        paramKey = key;
        paramValue = value;
    });

    state.count++;
    expect(paramKey).toBe("count");
    expect(paramValue).toBe(1);
    expect(state.count).toBe(1);

    state.count++;
    expect(paramKey).toBe("count");
    expect(paramValue).toBe(2);
    expect(state.count).toBe(2);
});

test("State 의 value 이 배열일 때 불변성을 유지하며 상태를 변경한다", () => {
    let paramKey = null;
    let paramValue = null;

    const state = new State({ list: [] }, (key, value) => {
        paramKey = key;
        paramValue = value;
    });

    state.list = [1];
    expect(paramKey).toBe("list");
    expect(paramValue).toEqual([1]);
    expect(state.list).toEqual([1]);

    state.list = [...state.list, 2];
    expect(paramKey).toBe("list");
    expect(paramValue).toEqual([1, 2]);
    expect(state.list).toEqual([1, 2]);
});
