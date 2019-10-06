const express = require("express");
const note_category = require("./models/note_category");
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const bs = require("./config/bookshelf")//tylko test bazy danych

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/notes', function(req, res,next){
  console.log("get")
  note_category.getAll().then(notes => res.json({
    data: notes
  }))
});

app.post('/note', function(req, res, next){
  console.log(req.body)
  note_category.create({name: req.body.name})
    .then(response => res.send("created"))
});

app.listen(8080, () =>{
  bs.testConnection();
  console.log("Listening");

});