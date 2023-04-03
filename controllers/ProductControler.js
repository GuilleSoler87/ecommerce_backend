const { Product, Order } = require('../models/index.js');

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      await product.addCategory(req.body.CategoryId); // Para insertar en la tabla intermedia
      res.status(201).send({ msg: "Producto creado con éxito", product });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};


module.exports = ProductController