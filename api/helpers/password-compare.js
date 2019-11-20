// const bcrypt = require('bcrypt')
const crypto = require('crypto');
module.exports = {


  friendlyName: 'Password compare',


  description: '',


  inputs: {
    password: {
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

    // const compareResult = await bcrypt.compare(inputs.password, inputs.hash)

    // const passwordHash = await new Promise((resolve, reject) => {
    //   crypto.scrypt(inputs.password, sails.config.jwt.secret, 64, (err, derivedKey) => {
    //     if (err) return reject(err);
    //     return resolve(derivedKey.toString('hex'));  // '3745e48...08d59ae'
    //   });
    // })

    const hasher = crypto.createHash('sha1');
    hasher.update(inputs.password)
    const passwordHash = hasher.digest('hex')

    const compareResult = passwordHash === inputs.hash
    // All done.
    return exits.success(compareResult);

  }


};

