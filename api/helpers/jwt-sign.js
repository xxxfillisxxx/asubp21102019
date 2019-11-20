const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Jwt sign',


  description: '',


  inputs: {
    login: {
      type: 'string',
      required: true
    },
    hash: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + sails.config.jwt.expired
    const { login, hash } = inputs

    const token = jwt.sign({
      iat,
      exp,
      login,
      hash
    }, sails.config.jwt.secret)
    
    // All done.
    return exits.success({ token, exp });

  }


};

