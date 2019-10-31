'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('tasks', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    note_category_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        table: 'note_categories',
        name: 'tasks_note_category_id_fk',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    content: {
      type: 'string'
    },
    task_status_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        table: 'task_statuses',
        name: 'tasks_task_status_id_fk',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },


  })};

exports.down = function(db) {
  return db.dropTable('tasks');
};

exports._meta = {
  "version": 1
};
