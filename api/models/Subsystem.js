/**
 * Subsystem.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const orderField = require('../utils/orderField')

console.log(sails.models)

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    name: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string'
    },

    ...orderField.mapAttributes(),

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    categories: {
      collection: 'category',
      via: 'subsystem'
    },

    faq: {
      model: 'faq'
    },

    distributives: {
      collection: 'distributive',
      via: 'subsystem'
    },

    contacts: {
        collection: 'contact',
        via: 'subsystem'
    },

    permittedUsers: {
      collection: 'user',
      via: 'subsystem',
      through: 'permission'
    }
  },
  ...orderField.mapCustomToJSON(),
  ...orderField.mapHooks('Subsystem'),

  resort: async (options, cb) => {

    const tableName = 'subsystem';
    const datastore = Subsystem.getDatastore()
    return sails.helpers.resort.with({
      tableName,
      datastore
    })
  }

};

