/**
 * Document.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const orderField = require('../utils/orderField')

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string',
      columnType: 'TEXT'
    },

    publishedAt: {
      type: 'number',
    },

    ...orderField.mapAttributes(),
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    category: {
      model: 'category'
    },

    file: {
      model: 'file'
    }
  },

  ...orderField.mapCustomToJSON(),
  ...orderField.mapHooks('Document'),

  resort: async (options, cb) => {

    const criteria = {
      name: 'category',
      value: options.category
    }

    const tableName = 'document';
    const datastore = Category.getDatastore()

    return sails.helpers.resort.with({
      criteria,
      tableName,
      datastore
    })
  }

};

