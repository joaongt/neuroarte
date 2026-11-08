// SCRIPT GLOBAL: tema, menu mobile, aviso, voltar ao topo e animações

// localStorage pode falhar (aba anônima, bloqueio de cookies)
function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
}

function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
}

// DARK-LIGHT MODE
const root = document.documentElement;
const modeSwitch = document.querySelector("#mode-switch");

function updateModeIcon() {
    const isDark = root.classList.contains("dark-mode");
    modeSwitch.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
}

modeSwitch.addEventListener("click", () => {
    root.classList.toggle("dark-mode");
    storageSet("theme", root.classList.contains("dark-mode") ? "dark" : "light");
    updateModeIcon();
});

updateModeIcon();

// MOBILE MENU
const menu = document.querySelector("#menu");
const menuToggle = document.querySelector("#menu-toggle");

menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu'></i>";
});

menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", false);
        menuToggle.innerHTML = "<i class='bx bx-menu'></i>";
    });
});

// AVISO DE EVENTO (fica fechado depois que a pessoa fecha)
const announcement = document.querySelector("#announcement");

if (announcement) {
    const key = "announcement:" + announcement.textContent.trim();
    if (storageGet(key) === "closed") announcement.classList.add("hidden");

    document.querySelector("#announcement-close").addEventListener("click", () => {
        announcement.classList.add("hidden");
        storageSet(key, "closed");
    });
}

// HEADER SHADOW + VOLTAR AO TOPO
const header = document.querySelector("#header");
const toTop = document.querySelector("#to-top");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
    toTop.classList.toggle("visible", window.scrollY > 600);
}, { passive: true });

toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach((el) => observer.observe(el));
} else {
    reveals.forEach((el) => el.classList.add("in-view"));
}

// CONVERSÕES: conta cada clique para o WhatsApp no Analytics e no Meta Pixel
// (só funciona se GA4_ID / META_PIXEL_ID estiverem configurados no .env)
document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;
    const origem = window.location.pathname;
    if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { method: "whatsapp", page: origem });
    }
    if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", { content_name: origem });
    }
});

// CARROSSEL DA FOTO PRINCIPAL (página inicial)
const heroSlides = document.querySelectorAll(".hero-slide");

if (heroSlides.length > 1) {
    const dots = document.querySelectorAll(".hero-dot");
    // com "reduzir movimento" ligado a foto continua trocando, só que sem zoom e mais devagar
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let timer = null;

    const show = (i) => {
        current = (i + heroSlides.length) % heroSlides.length;
        heroSlides.forEach((img, k) => {
            img.classList.toggle("active", k === current);
            img.setAttribute("aria-hidden", k !== current);
        });
        dots.forEach((d, k) => {
            d.classList.toggle("active", k === current);
            if (k === current) d.setAttribute("aria-current", "true");
            else d.removeAttribute("aria-current");
        });
    };

    const start = () => {
        if (timer) return;
        timer = setInterval(() => show(current + 1), reduceMotion ? 6500 : 4500);
    };
    const stop = () => { clearInterval(timer); timer = null; };

    dots.forEach((d) => d.addEventListener("click", () => {
        stop();
        show(Number(d.dataset.slide));
        start();
    }));

    // pausa quando a aba não está visível ou o mouse está em cima
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    const box = document.querySelector(".hero-image");
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", start);

    start();
}
