require('dotenv').config();
const { API_KEY } = process.env;
const apiUrl = 'https://api.rawg.io/api/genres';
const axios = require('axios');
const { Genre } = require('../db');

const getAllGenres = async () => {
  const apiGenres = (await axios.get(`${apiUrl}?key=${API_KEY}`)).data.results;

  await Genre.bulkCreate(apiGenres);

  const bdGenres = await Genre.findAll();

  return bdGenres;
};

module.exports = { getAllGenres };
