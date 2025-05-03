import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";

export class MovieCardContainer extends BaseComponent {
    static get observedAttributes() {
        return ["section-title"];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <style>
                :host {
                    box-sizing: border-box;
                }
                .movie-card-container {
                    width: 100%;
                    max-width: 1200px;

                    margin: 0 auto;
                    padding: 0px 10px;
                }
                .movie-card-list {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .movie-card-container h1 {
                    font-size: 32px;
                    font-weight: 400;
                }
            </style>

            <section class="movie-card-container">
                <h1>${this.getAttribute("section-title")}</h1>
                <div class="movie-card-list">
                    <slot></slot>
                </div>
            </section>
        `;
    }
}

customElements.define("movie-card-container", MovieCardContainer);
