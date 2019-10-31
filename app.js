const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const bs = require("./config/bookshelf");//tylko test bazy danych
//routing
const categories = require("./controllers/categories")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/categories', categories)

app.listen(8080, () =>{
  bs.testConnection();
  console.log("Listening");
});