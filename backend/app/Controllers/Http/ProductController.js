"use strict";

const Product = use("App/Models/Product");
const User = use("App/Models/User");
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   */
  async index({ auth }) {
    if (!auth.user.id) {
      return;
    }

    const products = await Product.all();

    return products;
  }

  /**
   * Create/save a new product.
   * POST products
   */
  async store({ request, auth }) {
    if (!auth.user.id) {
      return;
    }

    const data = request.only([
      "title",
      "description",
      "createdby_id",
      "status",
    ]);

    const product = await Product.create(data);

    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   */
  async show({ params, auth }) {
    if (!auth.user.id) {
      return;
    }
    const product = await Product.findOrFail(params.id);

    return product;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   */
  async update({ params, request, response, auth }) {
    if (!auth.user.id) {
      return;
    }

    const data = request.only([
      "email",
      "title",
      "description",
      "status",
      "createdby_id",
    ]);

    const product = await Product.findOrFail(params.id);

    const user = await User.findOrFail(auth.user.id);

    if (product.status != data.status) {
      if (!user.admin) {
        return response.status(401).send({
          error: {
            message: "Usuario nao tem permissao para alterar o produto",
          },
        });
      } else if (data.status == "aprovado" || data.status == "reprovado") {
        product.approvedby_id = auth.user.id;
      }
    }

    product.merge(data);

    await product.save();

    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   */
  async destroy({ params, auth }) {
    if (!auth.user.id) {
      return;
    }
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }
}

module.exports = ProductController;
