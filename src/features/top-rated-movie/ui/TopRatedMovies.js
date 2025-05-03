import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../../../entities/movie/service/MovieApiService.js";

export class TopRatedMovies extends BaseComponent {
    constructor() {
        super();

        this.state.isPending = true;
        this.state.isError = false;
        this.state.data = null;

        this.movieApiService = new MovieApiService();
    }

    onAfterMount() {
        this.getTopRatedMovies();
    }

    async getTopRatedMovies() {
        const response = await this.movieApiService.get("/movie/top_rated?language=ko-KR&page=1");
        if (!response.ok) {
            this.state.isError = true;
            this.state.data = null;
        }
        const data = await response.json();
        this.state.data = data.results;
        this.state.isPending = false;
    }

    render() {
        if (this.state.isPending) return html`<div>Loading...</div>`;

        return html`
            <movie-card-container section-title="최고 평점 영화">
                ${this.state.data.slice(0, 10).map((movie) => {
                    return /* html */ `
                        <movie-card
                            movie-id="${movie.id}"
                            title="${movie.title}"
                            img-src="${movie.poster_path}"
                            vote-average="${movie.vote_average}"
                            overview="${movie.overview}"
                        >
                        </movie-card>
                    `;
                })}
            </movie-card-container>
        `;
    }
}

customElements.define("top-rated-movies", TopRatedMovies);
