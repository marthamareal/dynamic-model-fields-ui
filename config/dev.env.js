'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API_URL: '"https://dynamic-modal-fields.herokuapp.com/api/v1"'
})
