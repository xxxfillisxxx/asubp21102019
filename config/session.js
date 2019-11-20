/**
 *  Using express-session
 */

const sessionOptions = {
  secret: 'f77ab22eafeceb10f873c7e4525566cd',

  resave: false,
  saveUninitialized: true,

}

if (process.env.NODE_ENV === 'production') {

  const MySQLStore = require('express-mysql-session')
  const { datastores: { default: { url } } } = require('./env/production')

  const r = /(^.+):\/\/(.+):(.+)@(.+):([0-9]+)\/(.*)/
  const [, protocol, user, password, host, port, database] = url.match(r)

  const mysqlOptions = {
    user,
    password,
    host,
    port,
    database
  }

  const sessionStore = new MySQLStore(mysqlOptions) 

  sessionOptions.store = sessionStore
}
module.exports.session = {

  ...sessionOptions


};
