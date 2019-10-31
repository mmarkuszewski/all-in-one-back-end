const express = require('express');
const router = express.Router();
note_category = require("../models/note_category")
note = require("../models/note")
task = require("../models/task")

router.get('/', function(req, res, next){
  note_category.getAll().then(categories => res.json({
    categories: categories
  })).catch(err => res.send(err));
});

router.post('/', function(req, res, next){
  note_category.create({name: req.body.name})
      .then(response => res.send("created"))
      .catch(err => res.send(err));
});

router.get('/:id/notes', function(req, res, next){
  note_category.getAllNotesFromCategory(req.params.id)
      .then(notes => res.json({
        notes: notes
  })).catch(err => res.send(err));
});

//brak odpowiedniej sktruktury
// router.post('/:id/notes', function(req, res, next){
//   console.log(req.body)
//   note.create({content: req.body.note, categoryId: req.params.id})
// });

router.get('/:catId/tasks', function(req, res, next){
  task.getAllFromCategory(req.params.catId)
      .then(tasks => res.json({
        tasks: tasks
      })
  ).catch(err => res.send(err));
});

router.post('/:catId/tasks', function(req, res, next){
  task.create({content: req.body.task, categoryId: req.params.catId})
      .catch(err => res.send(err));
});

router.put('/:catId/tasks/:taskId', function(req, res, next){
    task.changeStatus(req.params.taskId, 3)
        .catch(err => res.send(err));
});

module.exports = router;