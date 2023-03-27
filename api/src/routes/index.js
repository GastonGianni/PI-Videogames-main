const { Router } = require('express');
const genresRouter = require('./genres');
const videogamesRouter = require('./videogamesRouter');

const router = Router();

router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

module.exports = router;

/*
    Rutas necesarias
    GET
    /videogames
    /videogames/:idVideogame
    /videogames/name?="..."
    /genres
    
    POST
    /videogames
    
    ENDPOINTS PERMITIDOS 
    Por id: "https://api.rawg.io/api/games/{id}"
    Por nombre: "https://api.rawg.io/api/games?search={game}"
    Por genero: "https://api.rawg.io/api/genres"
*/
