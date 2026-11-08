import { fetchData } from "./api.js";
import { rendreCatalogue } from "./ui.js";

const catalogContainer = document.getElementById("catalog-container");
const recherche = document.getElementById("search-input");
const paginationContainer = document.getElementById("pagination-container");

let tousProduits = [];
let produitsFiltres = [];
let currentPage = 1;
const itemsPerPage = 8;

fetchData()
    .then(data => {
        if (data && data.products) {
            tousProduits = data.products;
            produitsFiltres = tousProduits;
            mettreAJourAffichage();
        }
    })

    .catch(error => {
        console.error("Erreur lors de l'initialisation du catalogue", error);
    });

function mettreAJourAffichage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const produitsPagines = produitsFiltres.slice(startIndex, endIndex);

    rendreCatalogue(produitsPagines, catalogContainer);

    rendrePagination();
}

function rendrePagination() {
    if (!paginationContainer) return;

    const totalPages = Math.ceil(produitsFiltres.length / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    let paginationHTML = "";

    paginationHTML += `
        <button
            id="prev-page"
            class="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium bg-white text-[#14375f] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentPage === 1 ? 'disabled' : ''}>
            Précédent
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHTML += `
            <button
                class="page-number px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${isActive ? 'bg-[#14375f] text-white shadow-sm' : 'bg-white border border-gray-200 text-[#14375f] hover:bg-gray-100'}"
                data-page="${i}">
                ${i}
            </button>
        `;
    }

    paginationHTML += `
        <button
            id="next-btn"
            class="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium bg-white text-[#14375f] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentPage === totalPages ? 'disabled' : ''}>
            Suivant
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;

    const prevBtn = document.getElementById("prev-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                mettreAJourAffichage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                mettreAJourAffichage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    const pageButtons = paginationContainer.querySelectorAll(".page-number");
    pageButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentPage = parseInt(e.target.dataset.page);
            mettreAJourAffichage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

recherche.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    produitsFiltres = tousProduits.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;

    mettreAJourAffichage();
});