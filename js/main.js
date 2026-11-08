import { fetchData } from "./api.js";

fetchData()
    .then(data => {
        console.log(data)
    });