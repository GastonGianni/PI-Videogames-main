const { Router } = require('express');
const { getVideogamesHandler, getVideogameHandler, createVideogameHandler } = require('../handlers/videogamesHandlers');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogamesHandler);
videogamesRouter.get('/:idVideogame', getVideogameHandler);
videogamesRouter.post('/', createVideogameHandler);

module.exports = videogamesRouter;
