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
        this.handleIncrease = this.#increaseCount.bind(this);
        $increaseBtn.addEventListener("click", this.handleIncrease);

        const $decreaseBtn = this.shadowRoot.querySelector("#decrease");
        this.handleDecrease = this.#decreaseCount.bind(this);
        $decreaseBtn.addEventListener("click", this.handleDecrease);
    }

    onUnmount() {
        const $increaseBtn = this.shadowRoot.querySelector("#increase");
        $increaseBtn.removeEventListener("click", this.handleIncrease);

        const $decreaseBtn = this.shadowRoot.querySelector("#decrease");
        $decreaseBtn.removeEventListener("click", this.handleDecrease);
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
