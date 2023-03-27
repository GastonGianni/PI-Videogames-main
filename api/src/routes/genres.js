const { Router } = require('express');

const genresRouter = Router();

genresRouter.get('/', (req, res) => {
  res.status(200).send('Ruta a generos');
});

module.exports = genresRouter;
