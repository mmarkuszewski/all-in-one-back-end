const bookshelf = require("../config/bookshelf");

const Note_category = bookshelf.model('Note_category',{
  tableName: 'note_category'
});

module.exports.create = (category) => {
  return new Note_category({
    name: category.name
  }).save();
}

module.exports.getAll = function(){
  try {
    return Note_category.fetchAll().then((data) => {
      // return data.toJSON().map((category => {
      //   return category['name']
      // }));
      return data.toJSON()
    })
  }catch (e) {
    logger.info(`No data found ${e}`);
  }
}