import { BasePersistGlobalState } from "../../../../packages/base-component/BasePersistGlobalState.js";

export class GlobalPersistedBookMarkState extends BasePersistGlobalState {
    static instance = null;

    constructor() {
        if (GlobalPersistedBookMarkState.instance) {
            return GlobalPersistedBookMarkState.instance;
        }

        super("movie-bookmarks", window.localStorage);

        if (!this.state) this.state.bookmarkedMovieIds = [];
        this.onDispatch();

        GlobalPersistedBookMarkState.instance = this;
    }
}
