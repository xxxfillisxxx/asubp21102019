/**
 * nuxt config and init
 */



const { Nuxt, Builder } = require('nuxt');

class NuxtBuilder {

  constructor() {
    this.instances = {}
  }

  build(config) {
    const nuxt = new Nuxt(config)
    // if (nuxt.options.dev) {
      this.enableReload(nuxt)
    // }
    this.instances[config.name] = nuxt
    return nuxt
  }

  enableReload(nuxt) {
      new Builder(nuxt).build();
  }

  getNuxtInstance(name) {
    return this.instances[name]
  }

  mapMiddleware() {
    return Object
      .entries(this.instances)
      .reduce((acc, [key, ins]) => ({ ...acc, [`${key}`]: (req, res) => {
        return ins.render(req, res)
      } }), {})
  }

  mapNames() {
    return Object.keys(this.instances)
  }
}

const builder = new NuxtBuilder()
builder.build(require('../nuxt.config'))

console.log('builder')

module.exports = { builder };