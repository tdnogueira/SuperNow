'use strict';

class Product {
  get vaidateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      description: 'required',
    };
  }
}

module.exports = Product;
