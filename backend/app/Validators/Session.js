'use strict';

class Session {
  get vaidateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }
}

module.exports = Session;
