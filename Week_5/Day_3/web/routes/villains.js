const express = require('express');
const router = express.Router();
const { getVillains } = require('../db/villains-queries');

router.get('/', (request, response) => {
  getVillains((villains) => {
    response.render('villains', { villains });
  });
});

module.exports = router;
