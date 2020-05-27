'use strict';

class User {
  get vaidateAll() {
    return true;
  }

  get rules() {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    };
  }
}

module.exports = User;
