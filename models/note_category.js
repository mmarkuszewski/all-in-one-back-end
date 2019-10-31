const bookshelf = require("../config/bookshelf");

const Note_category = bookshelf.model('Note_category',{
  tableName: 'note_categories',
  notes() {
    return this.hasMany('Note')
  }
});

module.exports.create = (category) => {
  return new Note_category({
    name: category.name
  }).save();
}

module.exports.getAll = function(){
  return Note_category.fetchAll().then((data) => {
    return data.toJSON()
  })
}

//można przeniesc do modelu notes
module.exports.getAllNotesFromCategory = async function(cat_id){
  try {
    let notes = await Note_category.where({id: cat_id}).fetch({
      withRelated: ['notes'], require: true
    })
    console.log(notes.toJSON())
  } catch (e) {

    console.info(`No data found ${e}`);
  }
}

