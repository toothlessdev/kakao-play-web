import { BaseComponent } from "../../../packages/base-component/BaseComponent.js";
import { html } from "../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class NavTop extends BaseComponent {
    render() {
        return html`
            <style>
                :host * {
                    box-sizing: border-box;
                }
                nav {
                    width: 100%;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                }
                ul {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;z

                    margin: 0;
                    max-width: 1000px;
                    height: 60px;

                    margin: 0 auto;
                    padding: 0px 20px;
                }
                li {
                    margin: 0;
                    list-style: none;
                }
                li:first-child {
                    font-weight: 400;
                    font-size: 20px;
                }
            </style>

            <nav>
                <ul>
                    <li>Kakao Play</li>
                    <li>
                        <movie-search-bar></movie-search-bar>
                    </li>
                </ul>
            </nav>
        `;
    }
}

customElements.define("nav-top", NavTop);
