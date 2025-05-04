import { State } from "./State.js";

export class BaseGlobalState {
    static instances = new Map();

    #subscribers = new Map();

    constructor(initialState = {}) {
        const constructorName = this.constructor;
        if (BaseGlobalState.instances.has(constructorName)) {
            return BaseGlobalState.instances.get(constructorName);
        }

        BaseGlobalState.instances.set(constructorName, this);
        this.state = new State(initialState, this.#dispatch.bind(this));
    }

    #dispatch() {
        this.#subscribers.forEach((reRender) => reRender());
        this.onDispatch();
    }

    onDispatch() {}

    subscribe(component, reRender) {
        this.#subscribers.set(component, reRender);
    }

    unsubscribe(component) {
        this.#subscribers.delete(component);
    }
}
