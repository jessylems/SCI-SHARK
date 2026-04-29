
function filtrar(tipo){

    const popup = document.getElementById("popup");
    const energias = document.querySelector(".energias");

    // ocultar popup con animación
    popup.style.opacity = "0";

    setTimeout(() => {
        popup.style.display = "none";
    }, 300);

    // mostrar energías
    energias.style.display = "flex";

    const cards = document.querySelectorAll(".energia");

    cards.forEach(card => {

        if(!card.classList.contains(tipo)){
            card.style.display = "none";
        } else {
            card.style.display = "flex";
        }

    });

}

