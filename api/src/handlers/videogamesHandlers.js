const { createVideogame, getVideogameById } = require('../controllers/videogamesControllers');

const getVideogamesHandler = (req, res) => {
  const { name } = req.query;
  name !== undefined ? res.send(`Buscando videojuegos con name : ${name}`) : res.send('Mostrar todos los videojuegos');
};
const getVideogameHandler = async (req, res) => {
  const { idVideogame } = req.params;

  const source = isNaN(idVideogame) ? 'bbdd' : 'api';

  try {
    const videogame = await getVideogameById(idVideogame, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createVideogameHandler = async (req, res) => {
  const { name, description, platforms, image, release_date, rating } = req.body;
  try {
    const newVideogame = await createVideogame(name, description, platforms, image, release_date, rating);
    res.status(201).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getVideogamesHandler, getVideogameHandler, createVideogameHandler };

/*
{
  "name":"League of legends",
  "description":"Juego re piolon",
  "platforms":["PC","PS4","MOBILE"],
  "image":"www.cachito/aasd",
  "release_date":"2001-01-20",
  "rating":"4.9"
} 
MODELO DE POST

*/
