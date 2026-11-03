# NeuroArte

Site da **NeuroArte**: oficinas de arte criativa para crianças, a domicílio e no seu evento, em Belo Horizonte.
Instagram: [@neurooarte](https://www.instagram.com/neurooarte/)

## Páginas

- `/` Início: apresentação, modalidades, benefícios da arte, quem sou eu, feedbacks
- `/oficinas` Oficina a domicílio, no seu evento e coletivas + como agendar
- `/sobre` Quem sou eu (Luciana) e valores
- `/politica` Política de Privacidade

## Como editar o conteúdo

Quase todo o texto fica em **`data/site.js`**: contato, WhatsApp, oficinas, benefícios, feedbacks e o aviso de evento no topo do site (troque por `evento: null` para esconder).

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
