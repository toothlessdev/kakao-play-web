import { BaseComponent } from "../../../packages/base-component/BaseComponent.js";
import { html } from "../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class HeartIcon extends BaseComponent {
    static get observedAttributes() {
        return ["active"];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="${this.getAttribute("active") === "true" ? "red" : "none"}"
                stroke="red"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-heart-icon lucide-heart"
            >
                <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
            </svg>
        `;
    }
}

customElements.define("heart-icon", HeartIcon);
