const { Client } = require('pg');

const config = {
  user: 'villains_user',
  password: 'password',
  database: 'villains',
  host: 'localhost'
};

const client = new Client(config);

const verb = process.argv.slice(2)[0];
let id;

client
  .connect()
  .then(() => {
    console.log('connected to the db'); 
    switch (verb) {
      case 'browse':
        client
          .query('SELECT * FROM movie_villains;')
          .then((res) => {
            console.log(res.rows);
            client.end();
          });
        break;

      case 'read':
        id = process.argv.slice(2)[1];
        client
          .query('SELECT * FROM movie_villains WHERE id = $1;', [id])
          .then((res) => {
            console.log(res.rows);
            client.end();
          });
        break;

      case 'edit':
        id = process.argv.slice(2)[1];
        const newVillainName = process.argv.slice(2)[2];
        client
          .query('UPDATE movie_villains SET villain = $1 WHERE id = $2;', [newVillainName, id])
          .then(() => {
            console.log('villain was updated');
            client.end();
          });
        break;

      case 'add':
        const villainName = process.argv.slice(2)[1];
        const movieName = process.argv.slice(2)[2];
        client
          .query('INSERT INTO movie_villains (villain, movie) VALUES ($1, $2);', [villainName, movieName])
          .then(() => {
            console.log('villain inserted');
            client.end();
          });
        break;

      case 'delete':
        id = process.argv.slice(2)[1];
        client
          .query('DELETE FROM movie_villains WHERE id = $1;', [id])
          .then(() => {
            console.log('villain destroyed');
            client.end();
          });
        break;

      default:
        client.end();
    }
  })
  .catch((err) => console.error(err));

