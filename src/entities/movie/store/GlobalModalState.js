import { BaseGlobalState } from "../../../../packages/base-component/BaseGlobalState.js";

export class GlobalModalState extends BaseGlobalState {
    static instance = null;

    constructor() {
        if (GlobalModalState.instance) return GlobalModalState.instance;
        super({ isOpen: false, movieId: null });
        GlobalModalState.instance = this;
    }
}
