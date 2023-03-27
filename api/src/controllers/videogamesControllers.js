require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const { API_KEY } = process.env;

const createVideogame = async (name, description, platforms, image, release_date, rating) =>
  await Videogame.create({ name, description, platforms, image, release_date, rating });

const getVideogameById = async (idVideogame, source) => {
  const videogame =
    source === 'api' ? (await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data : await Videogame.findByPk(idVideogame);

  return videogame;
};

module.exports = { createVideogame, getVideogameById };
