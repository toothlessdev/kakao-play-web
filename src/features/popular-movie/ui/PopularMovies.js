import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../../../entities/movie/service/MovieApiService.js";

export class PopularMovies extends BaseComponent {
    constructor() {
        super();

        this.state.isPending = true;
        this.state.isError = false;
        this.state.data = null;

        this.movieApiService = new MovieApiService();
    }

    onAfterMount() {
        this.getPopularMovies();
    }

    async getPopularMovies() {
        const response = await this.movieApiService.get("/movie/popular?language=ko-KR&page=1");
        if (!response.ok) {
            this.state.isError = true;
            this.state.data = null;
        }
        const data = await response.json();
        this.state.data = data.results;
        this.state.isPending = false;
    }

    render() {
        if (this.state.isPending) {
            return html`
                <movie-card-container section-title="인기 영화">
                    <div class="loading">Loading...</div>
                </movie-card-container>
            `;
        }

        return html`
            <movie-card-container section-title="인기 영화">
                ${this.state.data.slice(0, 10).map((movie) => {
                    return /*html*/ `
                        <movie-card
                            movie-id="${movie.id}"
                            img-src="${movie.poster_path}"
                            title="${movie.title}"
                            vote-average="${movie.vote_average}"
                            overview="${movie.overview}"
                        ></movie-card>
                    `;
                })}
            </movie-card-container>
        `;
    }
}

customElements.define("popular-movies", PopularMovies);
