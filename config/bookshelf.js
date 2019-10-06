const knex = require("knex")(require("./knexfile"));
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;

module.exports.testConnection = () => {
  knex.raw('select 1+1 as result').catch(err => {
    console.log(err);
    process.exit(1);
  });
}