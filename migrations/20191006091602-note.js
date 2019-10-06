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
  return db.createTable('note', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'note_note_category_id_fk',
        table: 'note_category',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    content: {
      type: 'string'
    }

    })
};

exports.down = function(db) {
  return db.dropTable('note');
};

exports._meta = {
  "version": 1
};
