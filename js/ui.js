import { fetchData } from "./api.js";

const catalogue = document.querySelector("#catalog-container");

fetchData()
    .then(data => {
        console.log(data.products);
    });