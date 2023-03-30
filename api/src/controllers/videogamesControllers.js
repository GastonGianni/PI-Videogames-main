require('dotenv').config();
const axios = require('axios');
const { Op, Sequelize } = require('sequelize');
const { Videogame } = require('../db');
const { API_KEY } = process.env;
const apiUrl = `https://api.rawg.io/api/games`;

const getAllVideogames = async () => {
  const databaseVideogames = await Videogame.findAll();

  const apiVideogames1 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=1&page_size=40`)).data.results;
  const apiVideogames2 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=2&page_size=40`)).data.results;
  const apiVideogames3 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=3&page_size=20`)).data.results;

  const apiResult = [...apiVideogames1, ...apiVideogames2, ...apiVideogames3];

  return [...apiResult, ...databaseVideogames];
};
const getVideogameByName = async (name, limit) => {
  const nameLowerCase = name.toLowerCase();
  const databaseVideogames = await Videogame.findAll({
    where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + nameLowerCase + '%'),
    limit: limit || 15,
  });

  const apiVideogames1 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=1&page_size=40`)).data.results;
  const apiVideogames2 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=2&page_size=40`)).data.results;
  const apiVideogames3 = (await axios.get(`${apiUrl}?key=${API_KEY}&page=3&page_size=20`)).data.results;

  const apiResult = [...apiVideogames1, ...apiVideogames2, ...apiVideogames3];

  const apiResultFiltered = apiResult.filter((game) => game.name.toLowerCase().includes(nameLowerCase)).slice(0, limit);

  return [...apiResultFiltered, ...databaseVideogames];
};

const createVideogame = async (name, description, platforms, image, release_date, rating) =>
  await Videogame.create({ name, description, platforms, image, release_date, rating });

const getVideogameById = async (idVideogame, source) => {
  const videogame = source === 'api' ? (await axios.get(`${apiUrl}/${idVideogame}?key=${API_KEY}`)).data : await Videogame.findByPk(idVideogame);

  return videogame;
};

module.exports = { createVideogame, getVideogameById, getAllVideogames, getVideogameByName };

/*
Modelo de datos API 
{
  "count": 0,
  "next": "http://example.com",
  "previous": "http://example.com",
  "results": [
    {
      "id": 0,
      "slug": "string",
      "name": "string",
      "released": "2023-03-28",
      "tba": true,
      "background_image": "http://example.com",
      "rating": 0,
      "rating_top": 0,
      "ratings": {},
      "ratings_count": 0,
      "reviews_text_count": "string",
      "added": 0,
      "added_by_status": {},
      "metacritic": 0,
      "playtime": 0,
      "suggestions_count": 0,
      "updated": "2023-03-28T21:17:23Z",
      "esrb_rating": {
        "id": 0,
        "slug": "everyone",
        "name": "Everyone"
      },
      "platforms": [
        {
          "platform": {
            "id": 0,
            "slug": "string",
            "name": "string"
          },
          "released_at": "string",
          "requirements": {
            "minimum": "string",
            "recommended": "string"
          }
        }
      ]
    }
  ]
}



 */
