// Imports
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import router from './routes/handlers.js';
import site from './data/site.js';

// .env configuration
dotenv.config();

const PORT = process.env.PORT || 5500;

// Analytics (opcionais): só são carregados se os IDs estiverem no .env
const analytics = {
  ga4: process.env.GA4_ID || null,
  metaPixel: process.env.META_PIXEL_ID || null,
};

// Express middleware
const app = express();
app.set('trust proxy', true); // Render/Docker: respeita https e o host original
app.use(express.static('public'));

// Endereço absoluto do site (prévia de links no WhatsApp/Instagram e Google)
const baseUrlFor = (req) =>
  (process.env.SITE_URL || site.url || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');

// Global data available in every view (header, footer, popup)
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.year = new Date().getFullYear();
  res.locals.path = req.path;
  res.locals.baseUrl = baseUrlFor(req);
  res.locals.analytics = analytics;
  // Dados estruturados para o Google entender o negócio local
  res.locals.schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.nome,
    description: 'Oficinas de arte criativa para crianças a domicílio, em festas e escolas em Belo Horizonte e região.',
    url: res.locals.baseUrl,
    image: `${res.locals.baseUrl}/images/kids.png`,
    logo: `${res.locals.baseUrl}/images/logo.png`,
    telephone: '+55 31 98292-5328',
    email: site.contato.email,
    areaServed: { '@type': 'City', name: 'Belo Horizonte' },
    address: { '@type': 'PostalAddress', addressLocality: 'Belo Horizonte', addressRegion: 'MG', addressCountry: 'BR' },
    sameAs: [site.contato.instagramLink],
    founder: {
      '@type': 'Person',
      name: site.responsavelNome,
      jobTitle: 'Arte educadora',
      sameAs: [site.responsavelInstagramLink],
    },
  };
  next();
});

// Set up the Handlebars template engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'structure',
  helpers: {
    eq: (a, b) => a === b,
    or: (a, b) => a || b,
    inc: (n) => Number(n) + 1,
    // JSON seguro para <script type="application/ld+json">
    json: (obj) => JSON.stringify(obj).replace(/</g, '\\u003c'),
  },
}));
app.set('view engine', 'handlebars');

// use the router middleware
app.use(router);

// 404 - Page not found
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Página não encontrada | NeuroArte',
    style: 'politica.css',
    noindex: true,
  });
});

// Error handler (unexpected errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Erro do servidor');
});

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
