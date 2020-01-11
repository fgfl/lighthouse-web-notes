const db = require('./db');

const getVillains = (cb) => {
  db
    .query('SELECT * FROM movie_villains;')
    .then((res) => {
      cb(res.rows);
    })
    .catch((err) => cb(err));
};

module.exports = {
  getVillains
};
