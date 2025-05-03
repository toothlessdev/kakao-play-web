import { BaseComponent } from "../packages/base-component/BaseComponent.js";
import { html } from "../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class App extends BaseComponent {
    render() {
        return html`
            <header>
                <nav-top></nav-top>
            </header>

            <footer></footer>
        `;
    }
}

customElements.define("app-root", App);
