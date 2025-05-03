import { BaseComponent } from "../../../packages/base-component/BaseComponent.js";
import { html } from "../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class SearchIcon extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return html`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-search-icon lucide-search"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        `;
    }
}

customElements.define("search-icon", SearchIcon);
