import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../../../entities/movie/service/MovieApiService.js";
import { GlobalKeywordStore } from "../store/GlobalKeywordStore.js";

export class MovieSearchBar extends BaseComponent {
    constructor() {
        super();
        this.$input = null;
        this.$button = null;

        this.eventAbortController = new AbortController();
        this.movieApiService = new MovieApiService();
        this.globalKeywordStore = new GlobalKeywordStore();
    }

    onSearch(keyword) {
        this.globalKeywordStore.state.searchKeyword = keyword;
    }
    onPressEnterSearch(e) {
        if (e.key === "Enter") this.onSearch(this.$input.value);
    }
    onClickSearch() {
        this.onSearch(this.$input.value);
    }
    onChange(e) {
        this.onSearch(e.target.value);
    }

    onAfterMount() {
        this.$input = this.shadowRoot.querySelector("input");
        this.$button = this.shadowRoot.querySelector("button");

        this.$input.addEventListener("keyup", this.onPressEnterSearch.bind(this), {
            signal: this.eventAbortController.signal,
        });
        this.$button.addEventListener("click", this.onClickSearch.bind(this), {
            signal: this.eventAbortController.signal,
        });
        this.$input.addEventListener("input", this.onChange.bind(this), {
            signal: this.eventAbortController.signal,
        });
    }

    onUnmount() {
        this.eventAbortController.abort();
    }

    render() {
        return html`
            <style>
                :host * {
                    box-sizing: border-box;
                }
                .movie-search-container {
                    position: relative;

                    width: 400px;
                    height: 100%;

                    margin: 40px auto;
                }
                input {
                    width: 100%;
                    height: 40px;
                    padding: 0 14px;
                    border-radius: 20px;
                    border: none;
                    background-color: #f0f0f0;
                    font-size: 16px;
                }
                input::placeholder {
                    color: #999999;
                }
                input:focus {
                    outline: none;
                }
                button {
                    position: absolute;
                    top: 0;
                    right: 0;

                    display: block;
                    width: 40px;
                    height: 40px;

                    border: none;
                    border-radius: 20px;

                    background-color: #fae100;
                }
                button:hover {
                    cursor: pointer;
                }
            </style>

            <div class="movie-search-container">
                <input type="text" placeholder="키워드로 영화를 검색하세요" />
                <button>
                    <search-icon></search-icon>
                </button>
            </div>
        `;
    }
}

customElements.define("movie-search-bar", MovieSearchBar);
