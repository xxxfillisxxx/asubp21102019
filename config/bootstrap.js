/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  const users = await User.find()
  if (users.length === 0) {
    await User.create({
      login: 'Admin',
      password: '12345',
      isAdmin: true
    })
  }

  // const counter = Array.from(Array(100))

  // await User.createEach(counter.map((a, index) => ({
  //   login: `test${index + 100}`,
  //   password: '12345'
  // })));

  // const subsystems = await Subsystem.createEach(counter.map((a, index) => ({
  //   name: `Подсистема №${index}`
  // }))).fetch()

  // // console.log(subsystems)

  // await Promise.all(subsystems.map(subsystem => Category.createEach(counter.map((a, index) => ({
  //   name: `Категория №${index}`,
  //   subsystem: subsystem.id
  // })))))


  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
