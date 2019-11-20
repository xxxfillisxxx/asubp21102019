const axios = require('axios')
module.exports = {


  friendlyName: 'Request',


  description: 'Request something.',


  inputs: {
    url: {
      type: 'string',
      required: true
    },
    withProxy: {
      type: 'boolean',
      defaultsTo: true
    },
    type: {
      type: 'string',
      defaultsTo: 'GET'
    },
    params: {
      type: 'ref',
      defaultsTo: {}
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    function generateProxyParams() {
      const { proxy } = sails.config.request
      const [ host, port ] = proxy.split(':')
      return { 
        host,
        port
      }
    }

    const { url, withProxy, type, params } = inputs

    const proxy = withProxy ? generateProxyParams() : null
    let result = null
    const config = {
      headers: { 'User-Agent': sails.config.request.UserAgent }
    }
    if (proxy) config.proxy = proxy

    switch (type) {
      case 'GET':
        config.params = params
        result = await axios.get(url, config)
        break
      case 'POST':
        result = await axios.post(url, params, config)
        break
    }

    const { data } = result

    // All done.
    return exits.success(data);

  }


};

