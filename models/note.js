const bookshelf = require("../config/bookshelf");

const Note = bookshelf.model('Note',{
    tableName: 'notes',

});

module.exports.create = (note) => {
    return new Note({
        content: note.content,
        note_category_id: note.categoryId
    }).save();
}

module.exports.getAllFromCategory = (categoryId) =>{
    return Note
}

