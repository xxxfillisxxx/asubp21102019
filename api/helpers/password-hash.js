// const bcrypt = require('bcrypt')
const crypto = require('crypto');

module.exports = {


  friendlyName: 'Password hash',


  description: '',


  inputs: {
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // const hash = await bcrypt.hash(inputs.password, sails.config.bcrypt.saltRounds)
    // const hash = await new Promise((resolve, reject) => {
    //   crypto.scrypt(inputs.password, sails.config.jwt.secret, 64, (err, derivedKey) => {
    //     if (err) return reject(err);
    //     return resolve(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    //   });
    // })

    const hasher = crypto.createHash('sha1');
    hasher.update(inputs.password)
    const hash = hasher.digest('hex')

    // All done.
    return exits.success(hash);

  }


};

