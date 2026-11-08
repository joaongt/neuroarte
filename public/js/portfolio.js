// PORTFÓLIO: filtros por categoria e janela com as fotos de cada projeto

const projects = JSON.parse(document.querySelector("#portfolio-data").textContent);
const cards = document.querySelectorAll(".project-card");

// FILTROS
document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        document.querySelectorAll(".filter-btn").forEach((b) => {
            b.classList.toggle("active", b === btn);
            b.setAttribute("aria-pressed", b === btn);
        });
        cards.forEach((card) => {
            card.hidden = filter !== "todos" && card.dataset.categoria !== filter;
        });
    });
});

// JANELA DO PROJETO
const dialog = document.querySelector("#project-dialog");
const img = document.querySelector("#dialog-img");
const thumbs = document.querySelector("#dialog-thumbs");
const prev = document.querySelector("#gallery-prev");
const next = document.querySelector("#gallery-next");
const instagram = document.querySelector("#dialog-instagram");

let current = null;
let photo = 0;

function showPhoto(i) {
    photo = (i + current.fotos.length) % current.fotos.length;
    img.src = current.fotos[photo].src;
    img.alt = current.fotos[photo].alt;
    thumbs.querySelectorAll("button").forEach((t, k) => t.classList.toggle("active", k === photo));
}

function openProject(index) {
    current = projects[index];
    const multi = current.fotos.length > 1;

    dialog.className = "project-dialog color-" + current.cor;
    document.querySelector("#dialog-badge").textContent = current.categoriaNome;
    document.querySelector("#dialog-title").textContent = current.titulo;
    document.querySelector("#dialog-text").textContent = current.texto;
    document.querySelector("#dialog-skills").innerHTML = "";
    current.habilidades.forEach((h) => {
        const li = document.createElement("li");
        li.textContent = h;
        document.querySelector("#dialog-skills").appendChild(li);
    });
    document.querySelector("#dialog-whatsapp").href = current.whatsapp;
    instagram.hidden = !current.instagram;
    if (current.instagram) instagram.href = current.instagram;

    thumbs.innerHTML = "";
    thumbs.hidden = !multi;
    prev.hidden = next.hidden = !multi;
    current.fotos.forEach((f, k) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Foto " + (k + 1));
        b.innerHTML = `<img src="${f.src}" alt="">`;
        b.addEventListener("click", () => showPhoto(k));
        thumbs.appendChild(b);
    });

    showPhoto(0);
    dialog.showModal();
    history.replaceState(null, "", "#" + current.id);
}

function closeProject() {
    dialog.close();
}

dialog.addEventListener("close", () => {
    history.replaceState(null, "", location.pathname);
});

document.querySelectorAll(".project-open").forEach((btn) => {
    btn.addEventListener("click", () => openProject(Number(btn.dataset.project)));
});

document.querySelector("#dialog-close").addEventListener("click", closeProject);
prev.addEventListener("click", () => showPhoto(photo - 1));
next.addEventListener("click", () => showPhoto(photo + 1));

// fecha clicando fora da janela
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeProject();
});

// setas do teclado trocam a foto
dialog.addEventListener("keydown", (e) => {
    if (current && current.fotos.length > 1) {
        if (e.key === "ArrowLeft") showPhoto(photo - 1);
        if (e.key === "ArrowRight") showPhoto(photo + 1);
    }
});

// link direto para um projeto: /portfolio#slime
const fromHash = projects.findIndex((p) => "#" + p.id === location.hash);
if (fromHash >= 0) openProject(fromHash);
