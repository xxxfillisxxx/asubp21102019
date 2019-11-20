module.exports = {


  friendlyName: 'Count',


  description: 'Count something.',


  inputs: {
    req: {
      type: 'ref',
      description: 'Request',
      required: true
    },
    model: {
      type: 'ref',
      description: 'Model object',
      // required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const params = inputs.req.allParams()
    const count = await inputs.model.count(params)

    // All done.
    return exits.success({ count });

  }


};

