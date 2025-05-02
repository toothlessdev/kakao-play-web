import { State } from "./State.js";

export class BaseGlobalState {
    static globalStateInstance = null;

    /** @type {Map<import("./BaseComponent.js").BaseComponent, Function>} */
    #subscribers = null;

    constructor(initialState = {}) {
        if (BaseGlobalState.globalStateInstance) {
            return BaseGlobalState.globalStateInstance;
        }
        BaseGlobalState.globalStateInstance = this;

        this.state = new State(initialState, this.dispatch.bind(this));
        this.#subscribers = new Map();
    }

    dispatch() {
        this.#subscribers.forEach((reRenderFunction) => {
            reRenderFunction();
        });
    }

    /**
     * @param {import("./BaseComponent.js").BaseComponent} webComponentInstance
     * @param {Function} reRenderFunction
     */
    subscribe(webComponentInstance, reRenderFunction) {
        this.#subscribers.set(webComponentInstance, reRenderFunction);
    }

    unsubscribe(webComponentInstance) {
        // #subscribers Map 에서 this 를 삭제하는경우, GlobalState 가 제거됨
        // 실제 webComponentInstance 를 Map 에서 삭제해야함
        this.#subscribers.delete(webComponentInstance);
    }
}
