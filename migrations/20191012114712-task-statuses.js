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
  return db.createTable('task_statuses', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: 'string'
    }
  }).then(() => {
    db.insert('task_statuses', ['id', 'status'], [1, 'TODO'])
  }).then(() => {
    db.insert('task_statuses', ['id', 'status'], [2, 'WORK'])
  }).then(() => {
    db.insert('task_statuses', ['id', 'status'], [3, 'DONE'])
  })
};

exports.down = function(db) {
  return db.dropTable('task_statuses');
};

exports._meta = {
  "version": 1
};
