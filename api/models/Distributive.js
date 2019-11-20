/**
 * Distributive.js
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

    server_bd: {
      type: 'string'
    },
    db_ms:{
      type:'string'
    },
    bd_name: {
      type: 'string'
    },
    server_app: {
      type: 'string'
    },
    server_update: {
      type: 'string'
    },
    server_web: {
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
      via: 'distributive'
    },

    subsystem: {
      model: 'subsystem'
    },

  },
  ...orderField.mapCustomToJSON(),
  ...orderField.mapHooks('Distributive'),

  resort: async function (distributive, cb) {

    const criteria = {
      name: 'subsystem',
      value: distributive.subsystem
    }

    const tableName = 'distributive';
    const datastore = Distributive.getDatastore()
    return sails.helpers.resort.with({
      criteria,
      tableName,
      datastore
    })
  }

};

