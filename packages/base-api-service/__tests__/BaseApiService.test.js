import { BaseApiService } from "../BaseApiService.js";

const api = new BaseApiService("https://api.themoviedb.org/3", {
    headers: {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRhMDRkMjU2NGZiNjA2MDU4OWM0YmE1NzU4MWY4MiIsIm5iZiI6MS43NDYwODM0OTE1NjE5OTk4ZSs5LCJzdWIiOiI2ODEzMWVhM2JjYmU3NjIxMTk5YjNhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vhqein715gcG1j69SS-riJM3P4tHeBIfTRDwTyKV8cA",
    },
});

(async () => {
    const request = await api.get("/movie/top_rated?language=en-US&page=1");
    const response = await request.json();
    console.log(response);
})();
