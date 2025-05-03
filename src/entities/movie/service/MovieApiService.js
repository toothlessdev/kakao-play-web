import { BaseApiService } from "../../../../packages/base-api-service/BaseApiService.js";
import { API_TOKEN } from "../../../app/constants/env.js";

export class MovieApiService extends BaseApiService {
    static instance = null;

    constructor() {
        if (MovieApiService.instance) return MovieApiService.instance;

        super("https://api.themoviedb.org/3", {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        MovieApiService.instance = this;
    }
}
