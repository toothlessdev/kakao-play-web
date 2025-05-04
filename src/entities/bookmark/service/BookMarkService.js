import { GlobalPersistedBookMarkState } from "../store/GlobalPersistedBookMarkState.js";

export class BookMarkService {
    constructor() {
        this.globalPersistedBookMarkState = new GlobalPersistedBookMarkState();
    }

    isBookMarked(movieId) {
        return this.globalPersistedBookMarkState.state.bookmarkedMovieIds.includes(movieId);
    }

    addBookMark(movieId) {
        const newBookMarkState = [...this.globalPersistedBookMarkState.state.bookmarkedMovieIds, movieId];
        this.globalPersistedBookMarkState.state.bookmarkedMovieIds = newBookMarkState;
    }

    removeBookMark(movieId) {
        const newBookMarkState = this.globalPersistedBookMarkState.state.bookmarkedMovieIds.filter(
            (id) => id !== movieId
        );
        this.globalPersistedBookMarkState.state.bookmarkedMovieIds = newBookMarkState;
    }

    toggleBookMark(movieId) {
        if (this.isBookMarked(movieId)) this.removeBookMark(movieId);
        else this.addBookMark(movieId);
    }
}
