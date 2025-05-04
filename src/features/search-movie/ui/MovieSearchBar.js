import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../../../entities/movie/service/MovieApiService.js";
import { debounce } from "../../../shared/utils/debounce.js";

export class MovieSearchBar extends BaseComponent {
    constructor() {
        super();
        this.$input = null;
        this.$button = null;

        this.eventAbortController = new AbortController();
        this.movieApiService = new MovieApiService();

        this.state.searchKeyword = "";
        this.state.isPending = true;
        this.state.isError = false;
        this.state.data = null;

        this.debouncedSearch = debounce(this.searchMovie.bind(this), 1000);
    }

    async searchMovie(keyword) {
        const response = await this.movieApiService.get(
            `/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`
        );
        if (!response.ok) {
            this.state.isError = true;
            this.state.isPending = false;
            return;
        }
        this.state.data = await response.json();
        this.state.isPending = false;
    }

    onSearch(keyword) {
        console.log("onSearch", keyword);
        this.debouncedSearch(keyword);
    }
    onPressEnterSearch(e) {
        if (e.key === "Enter") this.onSearch(this.$input.value);
    }
    onClickSearch() {
        this.onSearch(this.$input.value);
    }
    onChange(e) {
        this.state.searchKeyword = e.target.value;
        this.onSearch(e.target.value);
    }

    onEffect() {
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
                <input type="text" placeholder="키워드로 영화를 검색하세요" value="${this.state.searchKeyword}" />
                <button>
                    <search-icon></search-icon>
                </button>
            </div>

            <movie-card-container section-title="검색결과">
                ${this.state.data &&
                this.state.data.results.slice(0, 10).map((movie) => {
                    return `
                            <movie-card
                                movie-id="${movie.id}"
                                title="${movie.title}"
                                img-src="${movie.poster_path}"
                                vote-average="${movie.vote_average}"
                                overview="${movie.overview}"
                            ></movie-card>
                        `;
                })}
            </movie-card-container>
        `;
    }
}

customElements.define("movie-search", MovieSearchBar);
