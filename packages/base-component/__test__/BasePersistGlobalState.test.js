import { test, expect } from "../../__test__/test.js";
import { BasePersistGlobalState } from "../BasePersistGlobalState.js";
import { localStorageMock } from "../../base-json-storage-service/__mocks__/localStorage.mock.js";

class PersistGlobalState extends BasePersistGlobalState {
    static instance = null;

    constructor() {
        if (PersistGlobalState.instance) {
            return PersistGlobalState.instance;
        }
        super("test-storage-key", localStorageMock);
        PersistGlobalState.instance = this;
    }
}

class Component {
    reRenderCalledTimes = 0;

    constructor() {
        this.persistedGlobalState = new PersistGlobalState();
        this.persistedGlobalState.state.count = 0;
        this.persistedGlobalState.subscribe(this, this.reRender.bind(this));
    }

    reRender() {
        this.reRenderCalledTimes++;
    }
}

test("PersistGlobalState 의 상태가 변경되면 구독한 컴포넌트의 reRender 가 호출된다", () => {
    const component = new Component();

    component.persistedGlobalState.state.count++;
    component.persistedGlobalState.state.count++;
    component.persistedGlobalState.state.count++;

    expect(component.reRenderCalledTimes).toBe(3);

    component.persistedGlobalState.jsonStorageService.clear();
});

test("PersistGlobalState 의 상태가 변경되면 localStorage 에 저장된다", () => {
    const component = new Component();

    component.persistedGlobalState.state.count++;
    component.persistedGlobalState.state.count++;
    component.persistedGlobalState.state.count++;

    expect(component.persistedGlobalState.jsonStorageService.getData()).toEqual({ count: 3 });
});
