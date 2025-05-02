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

    unsubscribe() {
        this.#subscribers.delete(this);
    }
}
