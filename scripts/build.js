// Gera o site estático em dist/ para publicar no Cloudflare Pages.
//
// Como funciona: sobe o mesmo app Express numa porta temporária, visita cada
// página e salva o HTML pronto. Assim tudo continua sendo editado do mesmo
// jeito (data/site.js, views/, public/) e o resultado é só arquivo estático:
// abre rápido, nunca "dorme" e a hospedagem é gratuita.
//
// Uso: npm run build   (o resultado fica em dist/)
// Endereço do site: variável SITE_URL (ex.: https://neurooarte.com.br).

import fs from 'node:fs';
import path from 'node:path';

// No Cloudflare, sem SITE_URL definido, usa o endereço da própria publicação
if (!process.env.SITE_URL && process.env.CF_PAGES_URL) {
  process.env.SITE_URL = process.env.CF_PAGES_URL;
}

const { default: app } = await import('../app.js');
const { pages } = await import('../routes/handlers.js');

const OUT = 'dist';

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// 1. arquivos públicos (css, js, imagens)
fs.cpSync('public', OUT, { recursive: true });

// 2. páginas renderizadas
const server = app.listen(0);
const { port } = server.address();
const base = `http://127.0.0.1:${port}`;

const save = (file, content) => {
  const dest = path.join(OUT, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
};

let erros = 0;

try {
  // "/" vira index.html; "/oficinas" vira oficinas.html (o Cloudflare serve em /oficinas)
  for (const page of pages) {
    const res = await fetch(base + page.path);
    if (!res.ok) {
      console.error(`ERRO ${res.status} em ${page.path}`);
      erros++;
      continue;
    }
    const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
    save(file, await res.text());
    console.log(`ok  ${page.path.padEnd(18)} -> ${file}`);
  }

  for (const file of ['sitemap.xml', 'robots.txt']) {
    const res = await fetch(`${base}/${file}`);
    save(file, await res.text());
    console.log(`ok  /${file}`);
  }

  // página de "não encontrada" (o Cloudflare usa o 404.html automaticamente)
  const notFound = await fetch(`${base}/__pagina-que-nao-existe__`);
  save('404.html', await notFound.text());
  console.log('ok  404.html');
} finally {
  server.close();
}

// 3. cache das imagens e arquivos (Cloudflare Pages lê o arquivo _headers)
save('_headers', `/images/*
  Cache-Control: public, max-age=2592000

/css/*
  Cache-Control: public, max-age=86400

/js/*
  Cache-Control: public, max-age=86400
`);

console.log(`\nSite gerado em ${OUT}/ com SITE_URL=${process.env.SITE_URL || '(não definido)'}`);
if (!process.env.SITE_URL) {
  console.warn('Aviso: defina SITE_URL para a prévia de links (WhatsApp) e o sitemap usarem o domínio certo.');
}
if (erros) process.exit(1);
