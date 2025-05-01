import { State } from "./State.js";

export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.state = new State({}, () => this.reRender());
    }

    connectedCallback() {
        this.onBeforeMount();
        this.reRender();
        this.onAfterMount();
    }

    disconnectedCallback() {
        this.onUnmount();
    }

    onBeforeMount() {}

    onAfterMount() {}

    onUpdate() {}

    onUnmount() {}

    onEffect() {}

    reRender() {
        const renderedNode = this.render(this.state);

        if (!(renderedNode instanceof Node)) {
            throw new Error("render() 메서드는 html tagged template literal 또는 Node를 반환해야 합니다. 현재 반환 값 타입: " + typeof renderedNode);
        }

        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(renderedNode);

        this.onUpdate();
        this.onEffect();
    }

    /**
     * @param {Record<string,unknown>} state
     * @returns {Node}
     */
    render(state) {
        throw new Error("render() 메서드가 오버라이드되지 않았습니다");
    }
}
