import express from 'express';

const router = express.Router();

// routing
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'NeuroArte | Oficina de arte criativa para crianças em BH',
    style: 'home.css',
  });
});

router.get('/oficinas', (req, res) => {
  res.render('pages/oficinas', {
    title: 'Oficinas | NeuroArte',
    style: 'oficinas.css',
  });
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre', {
    title: 'Quem sou eu | NeuroArte',
    style: 'sobre.css',
  });
});

router.get('/politica', (req, res) => {
  res.render('pages/politica', {
    title: 'Política de Privacidade | NeuroArte',
    style: 'politica.css',
  });
});

export default router;
