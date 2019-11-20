/**
 * Comments.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const orderField = require('../utils/orderField') 
module.exports = {

  attributes: {

    upComment: {
      type: 'number',
      required: false
    },
    text: {
      type: 'string',
      required: true
    },
    control: {
      model: 'controls'
    },
    user:{
      model: 'user'
    },
    
    ...orderField.mapAttributes()
  
  },

};

