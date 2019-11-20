/**
 * Category.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const orderField = require('../utils/orderField')

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true
    },

    ...orderField.mapAttributes(),

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    documents: {
      collection: 'document',
      via: 'category'
    },

    subsystem: {
      model: 'subsystem',
      //required: true
    },

    distributive: {
      model: 'distributive',
      //required: true
    }
  },

  ...orderField.mapCustomToJSON(),
  ...orderField.mapHooks('Category'),

  resort: async function (category, cb) {
    const criteria = category.subsystem?
    {
        name: 'subsystem',
        value: category.subsystem
    }:
    {
        name: 'distributive',
        value: category.distributive
    }
    const tableName = 'category';
    const datastore = Category.getDatastore()
    return sails.helpers.resort.with({
      criteria,
      tableName,
      datastore
    })
  }

};

