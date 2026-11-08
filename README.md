# NeuroArte

Site da **NeuroArte**: oficinas de arte criativa para crianças, a domicílio e no seu evento, em Belo Horizonte.
Instagram: [@neurooarte](https://www.instagram.com/neurooarte/)

## Páginas

- `/` Início: apresentação, modalidades, benefícios da arte, quem sou eu, feedbacks
- `/oficinas` Oficina a domicílio, no seu evento e coletivas + como agendar + dúvidas
- `/festas-infantis` Página focada em aniversários (a busca mais comum das mães)
- `/sitemap.xml` e `/robots.txt` gerados automaticamente para o Google
- `/portfolio` Projetos com fotos, filtros por categoria e janela de detalhes (link direto: `/portfolio#slime`)
- `/sobre` Quem sou eu (Luciana) e valores
- `/politica` Política de Privacidade

## Como editar o conteúdo

Quase todo o texto fica em **`data/site.js`**: contato, WhatsApp, oficinas, benefícios, feedbacks, perguntas frequentes (`faq`) e o aviso de evento no topo do site (troque por `evento: null` para esconder).

Para adicionar um projeto ao portfólio, coloque as fotos em `public/images/portfolio/` (ideal: até 1200px, JPG) e copie um bloco da lista `portfolio` em `data/site.js`. A primeira foto é a capa.

Em cada oficina dá para preencher `idade` (ex.: `'3 a 10 anos'`) e `preco` (ex.: `'A partir de R$ 000'`). Se ficarem `null`, não aparecem.

## Marketing e medição

Configure no `.env` (veja `.env.example`):

- `SITE_URL`: endereço público do site, para a prévia do link com foto no WhatsApp/Instagram.
- `GA4_ID`: Google Analytics 4. Cada clique no WhatsApp vira o evento `generate_lead`.
- `META_PIXEL_ID`: Meta Pixel, para anúncios no Instagram/Facebook. Cada clique no WhatsApp vira o evento `Contact`.

Cada botão de WhatsApp envia uma mensagem pronta diferente (casa, festa, escola), assim a Luh sabe de onde a mãe veio.

## Estrutura

```
app.js                  servidor Express + Handlebars
routes/handlers.js      rotas das páginas
data/site.js            conteúdo do site
views/layouts/          estrutura (header, footer)
views/pages/            páginas
views/partials/         blocos reutilizados (CTA, feedbacks)
public/css/             header.css (global), lightMode/darkMode e um CSS por página
public/js/main.js       modo escuro, menu mobile, animações
public/images/          imagens
```

## Instalação

```bash
npm install
npm run dev
```

Acesse http://localhost:5500. Para produção: `npm start` (ou `npm run render-start` no Render).

## Tecnologias

- Node.js
- Express
- Handlebars
