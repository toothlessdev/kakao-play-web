import { BaseComponent } from "../../../../packages/base-component/BaseComponent.js";
import { html } from "../../../../packages/html-tagged-template-literal/HTMLTaggedTemplateLiteral.js";
import { MovieApiService } from "../service/MovieApiService.js";
import { GlobalModalState } from "../store/GlobalModalState.js";

export class MovieModalContent extends BaseComponent {
    constructor() {
        super();

        this.state.isPending = true;
        this.state.isError = false;
        this.state.data = null;

        this.globalModalState = new GlobalModalState();
        this.movieApiService = new MovieApiService();
        this.eventAbortController = new AbortController();
    }

    async getMovieDetails() {
        const movieId = this.globalModalState.state.movieId;
        if (!movieId) return;

        const response = await this.movieApiService.get(`/movie/${movieId}?language=ko-KR`);

        if (!response.ok) {
            this.state.isError = true;
            this.state.isPending = false;
            return null;
        }

        this.state.data = await response.json();
        this.state.isPending = false;
    }

    #onViewMovie() {
        const movieUrl = this.state.data.homepage;
        if (!movieUrl) return;

        window.open(movieUrl, "_blank");
    }

    #onLikeMovie() {}

    onAfterMount() {
        this.getMovieDetails();
    }

    onEffect() {
        const $viewMovieBtn = this.shadowRoot.querySelector(".movie-modal-content__buttons button:nth-child(1)");
        const $likeMovieBtn = this.shadowRoot.querySelector(".movie-modal-content__buttons button:nth-child(2)");

        if (!$viewMovieBtn || !$likeMovieBtn) return;

        $viewMovieBtn.addEventListener("click", this.#onViewMovie.bind(this), {
            signal: this.eventAbortController.signal,
        });
        $likeMovieBtn.addEventListener("click", this.#onLikeMovie.bind(this), {
            signal: this.eventAbortController.signal,
        });
    }

    onUnmount() {
        this.eventAbortController.abort();
    }

    render() {
        if (this.state.isPending) {
            return html`
                <div class="movie-modal-content">
                    <h1>Loading...</h1>
                </div>
            `;
        }

        return html`
            <style>
                :host * {
                    box-sizing: border-box;
                    margin: 0;
                    border: 0;
                    padding: 0;
                }
                .movie-modal-content {
                    width: 800px;
                    height: 500px;

                    display: flex;
                }
                .movie-modal-content img {
                    height: 100%;
                    border-radius: 10px;
                }
                .movie-modal-content__container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    margin: 0px 12px;
                }
                p {
                    width: 100%;
                    height: 100px;
                }
                .movie-modal-content__buttons {
                    display: flex;
                    gap: 10px;
                }
                .movie-modal-content__buttons button {
                    width: 100%;
                    height: 40px;
                    border-radius: 10px;
                }
                .movie-modal-content__buttons button:hover {
                    cursor: pointer;
                }
                .movie-modal-content__buttons button:nth-child(1) {
                    background: #fae100;
                }
                .movie-modal-content__buttons button:nth-child(2) {
                    border: 1px solid #fae100;
                    background: none;
                }
            </style>

            <div class="movie-modal-content">
                <img src="https://image.tmdb.org/t/p/w300${this.state.data.poster_path}" />
                <div class="movie-modal-content__container">
                    <div class="movie-modal-content__description">
                        <h1>🎬 ${this.state.data.title}</h1>
                        <h4>📆 개봉일 : ${this.state.data.release_date}</h4>
                        <h4>📖 장르 : ${this.state.data.genres.map((genre) => genre.name).join(", ")}</h4>
                        <h4>⏳ 상영시간 : ${this.state.data.runtime}분</h4>
                        <h4>⭐️ 평점 : ${Number(this.state.data.vote_average).toFixed(2)} / 10</h4>
                        <p>${this.state.data.overview}</p>
                    </div>

                    <div class="movie-modal-content__buttons">
                        <button>영화 보러가기</button>
                        <button>좋아요</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("movie-modal-content", MovieModalContent);
