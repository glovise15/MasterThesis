'use strict'

module.exports = function limitAlpha (string) {
  return string.replace(/[\W_]+/g, '')
}
