// export function rendreCatalogue(products, container) {
//     if (!container) return;

//     if (products.length === 0) {
//         container.innerHTML = `<div class="col-span-full text-center py-8 text-gray-500">Aucun produit trouvé.</div>`;
//         return;
//     }

//     const cardsHTML = products.map(product => {
//         return `
//             <div draggable="true" data-id="${product.id}" class="product-card bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-grab active:cursor-grabbing">
//                 <div class="pointer-events-none">
//                     <!-- Image du produit -->
//                     <div class="w-full h-40 bg-gray-50 rounded-xl mb-3 flex items-center justify-between overflow-hidden p-2 pointer-events-none">
//                         <img src="${product.image || 'assets/img/placeholder.png'}" alt="${product.name}" class="max-h-full max-w-full object-contain mx-auto">
//                     </div>
                    
//                     <!-- Catégorie & Nom -->
//                     <span class="text-[10px] font-bold tracking-wider text-gray-400 uppercase pointer-events-none">${product.category || 'Général'}</span>
//                     <h3 class="font-bold text-[#14375f] text-sm line-clamp-2 mt-1 mb-2 pointer-events-none" title="${product.name}">${product.name}</h3>
//                 </div>

//                 <!-- Prix et Bouton d'action -->
//                 <div class="pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
//                     <span class="font-extrabold text-[#14375f] text-sm pointer-events-none">${product.price} FCFA</span>
//                     <button class="add-to-cart-btn bg-[#fdc62d] text-[#14375f] hover:bg-opacity-90 font-bold text-xs px-3 py-1.5 rounded-lg transition-all" data-id="${product.id}">
//                         Ajouter
//                     </button>
//                 </div>
//             </div>
//         `;
//     }).join('');

//     container.innerHTML = cardsHTML;
// }

// js/ui.js

export function rendreCatalogue(products, container, onProductDragStart) {
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-8 text-gray-500">Aucun produit trouvé.</div>`;
        return;
    }

    const cardsHTML = products.map(product => {
        return `
            <div draggable="true" data-id="${product.id}" class="product-card bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-grab active:cursor-grabbing">
                <div>
                    <!-- Image du produit -->
                    <div class="w-full h-40 bg-gray-50 rounded-xl mb-3 flex items-center justify-between overflow-hidden p-2 pointer-events-none">
                        <img src="${product.image || 'assets/img/placeholder.png'}" alt="${product.name}" class="max-h-full max-w-full object-contain mx-auto">
                    </div>
                    
                    <!-- Catégorie & Nom -->
                    <span class="text-[10px] font-bold tracking-wider text-gray-400 uppercase pointer-events-none">${product.category || 'Général'}</span>
                    <h3 class="font-bold text-[#14375f] text-sm line-clamp-2 mt-1 mb-2 pointer-events-none" title="${product.name}">${product.name}</h3>
                </div>

                <!-- Prix et Bouton d'action -->
                <div class="pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <span class="font-extrabold text-[#14375f] text-sm pointer-events-none">${product.price} FCFA</span>
                    <button class="add-to-cart-btn bg-[#fdc62d] text-[#14375f] hover:bg-opacity-90 font-bold text-xs px-3 py-1.5 rounded-lg transition-all pointer-events-auto" data-id="${product.id}">
                        Ajouter
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHTML;

    // --- ACTIVATION DIRECTE DES CARTES GLISSABLES ---
    const cardElements = container.querySelectorAll(".product-card");
    cardElements.forEach(card => {
        card.addEventListener("dragstart", (e) => {
            const productId = card.dataset.id;
            e.dataTransfer.setData("text/plain", productId);
            e.dataTransfer.effectAllowed = "copy";
            card.classList.add("opacity-50");
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("opacity-50");
        });
    });
}