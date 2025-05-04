import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../service/MovieApiService.js";
import { GlobalModalState } from "../store/GlobalModalState.js";

export class MovieModal extends BaseComponent {
    constructor() {
        super();
        this.movieApiService = new MovieApiService();
        this.globalModalState = new GlobalModalState();
        this.eventAbortController = new AbortController();
    }

    #onCloseModal() {
        this.globalModalState.state.isOpen = false;
        this.globalModalState.state.movieId = null;
    }

    onAfterMount() {
        this.globalModalState.subscribe(this, this.reRender.bind(this));
    }

    onEffect() {
        const $modalCloseBtn = this.shadowRoot.querySelector(".movie-modal-btn-close");

        if (!$modalCloseBtn) return;
        $modalCloseBtn.addEventListener("click", this.#onCloseModal.bind(this), {
            signal: this.eventAbortController.signal,
        });
    }

    onUnmount() {
        this.globalModalState.unsubscribe(this);
        this.eventAbortController.abort();
    }

    render() {
        return html`
            <style>
                :host * {
                    box-sizing: border-box;
                    margin: 0;
                    border: 0;
                    padding: 0;
                }
                .movie-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 9999;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.8);
                }
                .movie-modal-container {
                    position: relative;

                    background-color: #fff;

                    border-radius: 14px;
                    margin: 24px;
                    padding: 24px;
                }
                .movie-modal-btn-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;

                    background: none;
                }
                .movie-modal-btn-close:hover {
                    cursor: pointer;
                }
            </style>

            ${this.globalModalState.state.isOpen
                ? /*html*/
                  `<div class="movie-modal">
                        <div class="movie-modal-container">
                            <button class="movie-modal-btn-close">
                                <x-icon></x-icon>
                            </button>
                            <movie-modal-content></movie-modal-content>
                        </div>
                  </div>`
                : ""}
        `;
    }
}

customElements.define("movie-modal", MovieModal);
