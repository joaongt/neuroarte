import express from 'express';
import site, { waLink } from '../data/site.js';

const router = express.Router();

// Portfólio com o nome da categoria e um WhatsApp já citando o projeto
const nomeCategoria = Object.fromEntries(site.categoriasPortfolio.map((c) => [c.id, c.nome]));
const portfolio = site.portfolio.map((p) => ({
  ...p,
  categoriaNome: nomeCategoria[p.categoria],
  capa: p.fotos[0],
  whatsapp: waLink(`Olá, Luh! Vi o projeto "${p.titulo}" no portfólio da NeuroArte e quero saber como fazer essa oficina.`),
}));

// Páginas públicas: título e descrição pensados nas buscas das mães no Google.
const pages = [
  {
    path: '/',
    view: 'pages/home',
    title: 'Oficina de Arte para Crianças em BH | NeuroArte',
    description: 'Oficinas de arte criativa para crianças em Belo Horizonte: em casa, no aniversário e na escola. Materiais inclusos e a criança leva a criação para casa.',
    style: 'home.css',
    faq: true,
  },
  {
    path: '/oficinas',
    view: 'pages/oficinas',
    title: 'Oficinas Criativas Infantis a Domicílio em BH | NeuroArte',
    description: 'Oficina de arte a domicílio, em festas e em escolas de BH. Oficinas sensoriais para bebês e temas como urso, foguete e fundo do mar.',
    style: 'oficinas.css',
    faq: true,
  },
  {
    path: '/festas-infantis',
    view: 'pages/festas',
    title: 'Oficina de Arte para Aniversário Infantil em BH | NeuroArte',
    description: 'Atividade para festa infantil em BH: oficina de arte temática no aniversário do seu filho. As crianças criam, brincam e levam a obra para casa.',
    style: 'oficinas.css',
    faq: true,
  },
  {
    path: '/portfolio',
    view: 'pages/portfolio',
    title: 'Portfólio de Oficinas de Arte Infantil | NeuroArte',
    description: 'Veja oficinas que já fizemos em BH: cavalinho de pau, foguete, slime, asas de borboleta, oficinas sensoriais para bebês e muito mais.',
    style: 'portfolio.css',
    script: 'portfolio.js',
    locals: { portfolio },
  },
  {
    path: '/sobre',
    view: 'pages/sobre',
    title: 'Quem sou eu | NeuroArte',
    description: 'Conheça a Luh, arte educadora e criadora da NeuroArte, oficinas de arte criativa para crianças em Belo Horizonte.',
    style: 'sobre.css',
  },
  {
    path: '/creditos',
    view: 'pages/creditos',
    title: 'Créditos do site | NeuroArte',
    description: 'Quem fez o site da NeuroArte: desenvolvimento, fotos, ícones e fontes.',
    style: 'politica.css',
  },
  {
    path: '/politica',
    view: 'pages/politica',
    title: 'Política de Privacidade | NeuroArte',
    description: 'Como a NeuroArte trata as informações de quem visita o site.',
    style: 'politica.css',
  },
];

// FAQ em formato que o Google entende (pode aparecer direto no resultado da busca)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: site.faq.map((item) => ({
    '@type': 'Question',
    name: item.pergunta,
    acceptedAnswer: { '@type': 'Answer', text: item.resposta },
  })),
};

for (const page of pages) {
  router.get(page.path, (req, res) => {
    res.render(page.view, {
      title: page.title,
      description: page.description,
      style: page.style,
      script: page.script,
      ...page.locals,
      faqSchema: page.faq ? faqSchema : null,
    });
  });
}

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${res.locals.baseUrl}/sitemap.xml\n`);
});

router.get('/sitemap.xml', (req, res) => {
  const urls = pages
    .map((p) => `  <url><loc>${res.locals.baseUrl}${p.path}</loc></url>`)
    .join('\n');
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
});

export default router;
