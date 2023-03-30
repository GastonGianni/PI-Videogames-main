const { getAllGenres } = require('../controllers/genresControllers');

const getGenresHandler = async (req, res) => {
  try {
    const genres = await getAllGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { getGenresHandler };

// traer todos los generos de la api
// guardarlos en la base de datos
// consumir los generos desde la bbd
