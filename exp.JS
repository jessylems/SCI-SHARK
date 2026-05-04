document.addEventListener("DOMContentLoaded", () => {
    //  Inicio po
    const config = {
        input: document.getElementById("buscador"),
        container: document.querySelector(".tarjeta-espacio"),
        cards: document.querySelectorAll(".cardsinfo"),
        animTime: 300 // Tiempo en milisegundos para transiciones
    };

    //  Elementos de Feedback TT
    const feedbackMessage = document.createElement("div");
    feedbackMessage.id = "search-feedback";
    feedbackMessage.innerHTML = `
        <div class="no-results" style="display: none; text-align: center; padding: 20px;">
            <i class="fa-solid fa-fish-fins" style="font-size: 3rem; color: #ccc;"></i>
            <p>No encontramos experimentos que coincidan. ¡Sigue explorando!</p>
        </div>
    `;
    config.container.appendChild(feedbackMessage);

    
     // Motor de Normalización de Textito
    const normalize = (text) => {
        return text.toLowerCase()
                   .normalize("NFD")
                   .replace(/[\u0300-\u036f]/g, "")
                   .trim();
    };

    //visibilidad :3
    const filterExperiments = () => {
        const searchTerm = normalize(config.input.value);
        let visibleCount = 0;

        config.cards.forEach(card => {
            // pa más precisión
            const title = card.querySelector("h3").textContent;
            const tag = card.querySelector(".tag").textContent;
            const fullContent = normalize(`${title} ${tag}`);

            if (fullContent.includes(searchTerm)) {
                // transición
                card.style.display = "block";
                setTimeout(() => card.style.opacity = "1", 10);
                visibleCount++;
            } else {
                card.style.opacity = "0";
                setTimeout(() => card.style.display = "none", config.animTime);
            }
        });

        //  sin resultado :)
        const noResultsDiv = feedbackMessage.querySelector(".no-results");
        noResultsDiv.style.display = (visibleCount === 0 && searchTerm !== "") ? "block" : "none";
    };

    // optimmm
     
    if (config.input) {
        
        config.input.addEventListener("input", filterExperiments);

        // para enterhehe
        config.input.addEventListener("keydown", (event) => {
            // se limpia
            if (event.key === "Enter") {
                event.preventDefault(); // opotimmm
                config.input.value = "";
                filterExperiments(); //  mostrar todo
            }
            
            // Escape se limpia la búsqueda
            if (event.key === "Escape") {
                config.input.value = "";
                filterExperiments();
            }
        });
    }
    console.log("SCI SHARK Engine: Sistema de búsqueda inicializado correctamente.");
});
