"use strict"

/**@param {Number} delay ms*/
export function setCookie(delay) {
  try {
    let type = typeof delay
    if (type !== 'number') throw 'parma in setCookie should be Number'
    document.cookie = `user = visited;age = 10;expires = ${new Date(Date.now() + delay).toUTCString()}`
  }
  catch (err) {
    console.error(err)
  }
}

/***/
export function checkCookie() {
  try {
    let data = document.cookie.length
    return data !== 0
  }
  catch (err) {
    console.error(err)
  }
}
