import axios from 'axios'

export default class BaseService {
  constructor() {
    this.baseUrl = null
  }

  callAjax(method, url, data = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: url,
        data: data
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(this.decodeError(error))
        })
    })
  }

  decodeError(error) {
    let message = ''
    if (error.response) {
      message = error.response.data
      try {
        if (message && typeof message === 'object' && message.message) {
          message = message.message
        }
      } catch (e) {
        message = 'Error appeard. Please contact with support.'
      }
    } else if (error.request) {
      message = error.request
    } else {
      message = 'Error: ' + error.message + '. Please contact with support.'
    }
    return message
  }
}
