import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { GlobalModalState } from "../store/GlobalModalState.js";

export class MovieCard extends BaseComponent {
    static get observedAttributes() {
        return ["movie-id", "img-src", "title", "vote-average", "overview"];
    }

    constructor() {
        super();
        this.globalModalState = new GlobalModalState();
        this.eventAbortController = new AbortController();
    }

    #onClick() {
        this.globalModalState.state.isOpen = true;
        this.globalModalState.state.movieId = this.getAttribute("movie-id");
    }

    onEffect() {
        this.shadowRoot.addEventListener("click", this.#onClick.bind(this), {
            signal: this.eventAbortController.signal,
        });
    }

    onUnmount() {
        this.shadowRoot.removeEventListener("click", this.#onClick.bind(this), {
            signal: this.eventAbortController.signal,
        });
    }

    render() {
        return html`
            <style>
                :host * {
                    box-sizing: border-box;
                    margin:0;
                    border:0;
                    padding:0;
                }
                .movie-card-container {
                    position: relative;

                    width: 230px;
                    height: 280px;
                    
                    border-radius: 10px;
                    overflow: hidden;
                }
                .movie-card-container img {
                    position: absolute;
                    inset: 0;

                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .movie-card-backdrop {
                    position: absolute;
                    inset: 0;
                    z-index: 1;

                    width: 100%;
                    height: 100%;

                    background: linear-gradient(180deg,rgba(42, 123, 155, 0) 0%, rgba(0, 0, 0, 1) 100%);
                }
                .movie-card-description {
                    position: absolute;
                    bottom: 0;
                    z-index: 2;

                    width: 100%;
                    padding: 12px;
                }
                .movie-card-description h2 {
                    margin: 0;
                    color: white;
                    font-size: 1.2rem;
                }
                .movie-card-description h3 {
                    margin: 0;
                    font-size: 10px;
                    color: #FAE100;
                }
                .movie-card-description p {
                    margin-bottom: 8px;

                    width: 100%;
                    color: lightgray;
                    font-size: 0.8rem;                   

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .movie-card-bookmark {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    z-index: 3;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 30px;
                    height: 30px;
                    background: none;
                }
            </style>

            <article class="movie-card-container">
                <button class="movie-card-bookmark">
                    <heart-icon active="false"></heart-icon>
                </button>
                <div class="movie-card-backdrop"></div>
                <img src="https://image.tmdb.org/t/p/w300${this.getAttribute("img-src")}"></img>
                <div class="movie-card-description">
                    <h2>${this.getAttribute("title")}</h2>
                    <h3>
                        <span>⭐️</span>
                        <span>${Number(this.getAttribute("vote-average")).toFixed(2)} / 10</span>
                    </h3>
                    <p>${this.getAttribute("overview")}</p>
                </div>
            </article>
        `;
    }
}

customElements.define("movie-card", MovieCard);
