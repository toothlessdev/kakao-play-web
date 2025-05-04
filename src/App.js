import { BaseComponent } from "../packages/base-component/BaseComponent.js";
import { html } from "../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class App extends BaseComponent {
    render() {
        return html`
            <movie-modal></movie-modal>

            <header>
                <nav-top></nav-top>
            </header>

            <main>
                <movie-search-bar></movie-search-bar>
                <movie-search-result></movie-search-result>

                <popular-movies></popular-movies>
                <top-rated-movies></top-rated-movies>
            </main>

            <footer></footer>
        `;
    }
}

customElements.define("app-root", App);
