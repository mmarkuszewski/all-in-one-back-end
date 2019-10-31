const bookshelf = require("../config/bookshelf");

const Task = bookshelf.model('Task',{
    tableName: 'tasks',
    category(){
        return this.belongsTo("Note_category")
    }
});

module.exports.create = (task) => {
    return new Task({
        content: task.content,
        note_category_id: task.categoryId,
        task_status_id: 1
    }).save();
}

module.exports.getAllFromCategory = async (categoryId) => {
    try {
        let todo = await Task.where({note_category_id: categoryId, task_status_id: 1})
            .fetchAll({columns: ['id','content']})
        let work = await Task.where({note_category_id: categoryId, task_status_id: 2})
            .fetchAll({columns: ['id','content']})
        let done = await Task.where({note_category_id: categoryId, task_status_id: 3})
            .fetchAll({columns: ['id','content']})
        return {todo: todo.toJSON(), work: work.toJSON(), done: done.toJSON()}
    } catch (e) {
        console.info(`No data found ${e}`);
    }
}

module.exports.changeStatus = async (taskId, status) => {
    return Task.where({id: taskId})
        .save({task_status_id: status}, {patch: true})
}
