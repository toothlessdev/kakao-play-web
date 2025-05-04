import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { GlobalKeywordStore } from "../store/GlobalKeywordStore.js";
import { debounce } from "../../../shared/utils/debounce.js";
import { MovieApiService } from "../../../entities/movie/service/MovieApiService.js";

export class MovieSearchResult extends BaseComponent {
    constructor() {
        super();

        this.movieApiService = new MovieApiService();
        this.globalKeywordStore = new GlobalKeywordStore();
        this.debouncedSearch = debounce(this.searchMovie.bind(this), 1000);

        this.state.isPending = true;
        this.state.isError = false;
        this.state.data = null;
    }

    onAfterMount() {
        this.globalKeywordStore.subscribe(this, this.reRender.bind(this));
    }

    onUpdate() {
        this.debouncedSearch(this.globalKeywordStore.state.searchKeyword);
    }

    onUnmount() {
        this.globalKeywordStore.unsubscribe(this);
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

    render() {
        return html`
            <movie-card-container section-title="${this.globalKeywordStore.state.searchKeyword} 검색결과">
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

customElements.define("movie-search-result", MovieSearchResult);
