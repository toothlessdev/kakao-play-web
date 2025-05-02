import { BaseGlobalState } from "../BaseGlobalState.js";
import { test, expect } from "../../__test__/test.js";

class GlobalState extends BaseGlobalState {
    static instance = null;

    constructor() {
        if (GlobalState.instance) {
            return GlobalState.instance;
        }
        super();
        this.state.count = 0;
        GlobalState.instance = this;
    }
}

class TestComponent {
    reRenderFunctionCalled = false;

    constructor() {
        this.globalState = new GlobalState();
        this.globalState.subscribe(this, this.reRender.bind(this));
    }

    // 실제 BaseComponent extends 하는 경우 onUnMount 에서 구독해제 해야함!

    reRender() {
        this.reRenderFunctionCalled = true;
    }
}

test("GlobalState 가 변경되면 구독한 컴포넌트가 바인딩한 함수가 호출됩니다", () => {
    const testComponent = new TestComponent();
    testComponent.globalState.state.count++;

    // 실제 BaseComponent extends 하는 경우 onUnMount 에서 구독해제 해야함!
    // 테스트용으로 GlobalState 명시적으로 gc 가 수거해가도록
    GlobalState.instance = null;

    expect(testComponent.reRenderFunctionCalled).toBe(true);
});
