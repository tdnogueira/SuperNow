"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, auth }) {
    const data = request.only([
      "username",
      "email",
      "password",
      "admin",
      "token",
    ]);

    const user = await User.create(data);

    return user;
  }

  async index({ auth }) {
    if (!auth.user.id) {
      return;
    }
    const user = await User.all();

    return user;
  }

  /**
   * Display a single product.
   * GET user/:id
   */
  async show({ params, auth }) {
    if (!auth.user.id) {
      return;
    }
    const user = await User.findOrFail(params.id);

    return user;
  }
}

module.exports = UserController;
