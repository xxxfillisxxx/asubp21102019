const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Jwt verify',


  description: '',


  inputs: {
    req: {
      type: 'ref',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const bearer = inputs.req.headers.Auth
    const split = bearer.split(' ')
    if (split.length === 2 && split[0] === 'Bearer') {
      const token = split[1]
      const now = Math.floor(Date.now() / 1000)
      const decoded = jwt.verify(token, sails.config.jwt.secret)
      const expired = decoded.exp < now
    } else {
      const expired = true
      const decoded = undefined
    }

    // All done.
    return exits.success({ expired, decoded });

  }


};

