/**
 * Contact.js
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

    position: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    icq: {
      type: 'string'
    },
    linkService: {
      type: 'string'
    },
    isFemale: {
        type: 'boolean',
        defaultsTo: false
    },


    ...orderField.mapAttributes(),

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    subsystem: {
      model: 'subsystem'
    },

  },
  ...orderField.mapCustomToJSON(),
  ...orderField.mapHooks('Contact'),

  resort: async function (contact, cb) {

    const criteria = {
      name: 'subsystem',
      value: contact.subsystem
    }

    const tableName = 'contact';
    const datastore = Contact.getDatastore()
    return sails.helpers.resort.with({
      criteria,
      tableName,
      datastore
    })
  }

};

