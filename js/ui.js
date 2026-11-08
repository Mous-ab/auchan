export function rendreCatalogue(products, container) {
    if (!container) return;

    const cardsHTML = products.map(product => {
        return `
            <div class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                    <div class="w-full h-40 bg-gray-50 rounded-xl mb-3 flex items-center justify-between overflow-hidden p-2">
                        <img src="${product.image || 'assets/img/placeholder.png'}" alt="${product.title}" class="max-h-full max-w-full object-contain mx-auto">
                    </div>
                    
                    <!-- Catégorie & Titre -->
                    <span class="text-[10px] font-bold tracking-wider text-gray-400 uppercase">${product.category || 'Général'}</span>
                    <h3 class="font-bold text-[#14375f] text-sm line-clamp-2 mt-1 mb-2" title="${product.title}">${product.title}</h3>
                </div>

                <!-- Prix et Bouton d'action -->
                <div class="pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <span class="font-extrabold text-[#14375f] text-sm">${product.price} FCFA</span>
                    <button class="bg-[#fdc62d] text-[#14375f] hover:bg-opacity-90 font-bold text-xs px-3 py-1.5 rounded-lg transition-all">
                        Ajouter
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHTML;
}