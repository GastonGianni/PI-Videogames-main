const { createVideogame, getVideogameById, getAllVideogames, getVideogameByName } = require('../controllers/videogamesControllers');

const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;
  const limit = 15;
  try {
    // console.log(videogames.length);
    const videogames = name ? await getVideogameByName(name, limit) : await getAllVideogames();
    res.status(200).json(videogames);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
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
--MODELO DE POST--
{
  "name":"League of legends",
  "description":"Juego re piolon",
  "platforms":["PC","PS4","MOBILE"],
  "image":"www.cachito/aasd",
  "release_date":"2001-01-20",
  "rating":"4.9"
} 
*/
