import { BaseGlobalState } from "../../../../packages/base-component/BaseGlobalState.js";

export class GlobalKeywordStore extends BaseGlobalState {
    static instance = null;

    constructor() {
        if (GlobalKeywordStore.instance) return GlobalKeywordStore.instance;
        super({ searchKeyword: "" });
        GlobalKeywordStore.instance = this;
    }
}
