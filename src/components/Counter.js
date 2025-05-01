import { BaseComponent } from "../../packages/base-component/BaseComponent.js";
import { html } from "../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class Counter extends BaseComponent {
    constructor() {
        super();
        this.state.count = 0;
    }

    #increaseCount() {
        this.state.count++;
    }
    #decreaseCount() {
        this.state.count--;
    }

    onUpdate() {
        console.log("counter : ", this.state.count);
    }

    onEffect() {
        const $increaseBtn = this.shadowRoot.querySelector("#increase");
        $increaseBtn.addEventListener("click", this.#increaseCount.bind(this));

        const $decreaseBtn = this.shadowRoot.querySelector("#decrease");
        $decreaseBtn.addEventListener("click", this.#decreaseCount.bind(this));
    }

    onUnmount() {
        const $increaseBtn = this.shadowRoot.querySelector("#increase");
        $increaseBtn.removeEventListener("click", this.#increaseCount.bind(this));

        const $decreaseBtn = this.shadowRoot.querySelector("#decrease");
        $decreaseBtn.removeEventListener("click", this.#decreaseCount.bind(this));
    }

    render() {
        return html`
            <div>
                <h1>Counter</h1>
                <p>count : ${this.state.count}</p>
                <button id="increase">+</button>
                <button id="decrease">-</button>
            </div>
        `;
    }
}

customElements.define("my-counter", Counter);
