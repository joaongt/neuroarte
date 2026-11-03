// Imports
import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import router from './routes/handlers.js';
import site from './data/site.js';

// .env configuration
dotenv.config();

const PORT = process.env.PORT || 5500;

// Express middleware
const app = express();
app.use(express.static('public'));

// Global data available in every view (header, footer, popup)
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.year = new Date().getFullYear();
  res.locals.path = req.path;
  next();
});

// Set up the Handlebars template engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'structure',
  helpers: {
    eq: (a, b) => a === b,
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
