// ===== SCISHARK TEAM JS =====

// ===== SELECTORES =====
const miembros = document.querySelectorAll(".miembros-equipo");
const buscador = document.getElementById("buscador");
const filtros = document.querySelectorAll("[data-filtro]");

// ===== ANIMACIÓN AL HACER SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

miembros.forEach(miembro => {
    observer.observe(miembro);
});

// ===== BUSCADOR EN TIEMPO REAL =====
if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();

        miembros.forEach(miembro => {
            const nombre = miembro.querySelector("h3").textContent.toLowerCase();
            const rol = miembro.querySelector(".tittle").textContent.toLowerCase();

            if (nombre.includes(texto) || rol.includes(texto)) {
                miembro.style.display = "block";
            } else {
                miembro.style.display = "none";
            }
        });
    });
}

// ===== FILTROS POR ROL =====
filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        const filtro = btn.dataset.filtro.toLowerCase();

        miembros.forEach(miembro => {
            const rol = miembro.querySelector(".tittle").textContent.toLowerCase();

            if (filtro === "todos" || rol.includes(filtro)) {
                miembro.style.display = "block";
            } else {
                miembro.style.display = "none";
            }
        });
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const destino = document.querySelector(link.getAttribute("href"));
        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ===== LAZY LOAD DE IMÁGENES =====
const imagenes = document.querySelectorAll("img");

const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute("data-src") || img.src;
            img.classList.add("cargada");
            obs.unobserve(img);
        }
    });
});

imagenes.forEach(img => imgObserver.observe(img));

// ===== RESALTAR MIEMBRO ACTIVO =====
miembros.forEach(miembro => {
    miembro.addEventListener("mouseenter", () => {
        miembros.forEach(m => m.classList.remove("activo"));
        miembro.classList.add("activo");
    });
});

// ===== CONTADOR ANIMADO (POR SI LO USAS) =====
const counters = document.querySelectorAll(".contador");

const contadorAnimado = (el) => {
    const objetivo = +el.dataset.valor;
    let actual = 0;

    const incremento = objetivo / 50;

    const actualizar = () => {
        actual += incremento;
        if (actual < objetivo) {
            el.textContent = Math.floor(actual);
            requestAnimationFrame(actualizar);
        } else {
            el.textContent = objetivo;
        }
    };

    actualizar();
};

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contadorAnimado(entry.target);
        }
    });
});

counters.forEach(c => counterObserver.observe(c));

// ===== BOTÓN VOLVER ARRIBA =====
const btnTop = document.createElement("button");
btnTop.textContent = "↑";
btnTop.classList.add("btn-top");
document.body.appendChild(btnTop);

btnTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        btnTop.style.opacity = "1";
    } else {
        btnTop.style.opacity = "0";
    }
});

// ===== MENSAJE DE CARGA =====
window.addEventListener("load", () => {
    console.log("SCI SHARK cargado correctamente 🚀");
});

// ===== DETECCIÓN DE DISPOSITIVO =====
if (window.innerWidth < 768) {
    document.body.classList.add("mobile");
}

// ===== EFECTO PARALLAX SUAVE =====
window.addEventListener("scroll", () => {
    const y = window.scrollY;
    document.body.style.backgroundPositionY = y * 0.3 + "px";
});