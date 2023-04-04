const { Product, Category, Classification, Order } = require('../models/index.js');

const ProductController = {
  // crea producto y añade categorías, requiere authentication
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
  //update producto y sus categorías, requiere authentication
  async update (req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: 'Producto no encontrado' });
      }
  
      // Actualizar el producto
      await Product.update(req.body, {
        where: {
          id: productId
        }
      });
  
      // Actualizar la relación con la categoría
      if (req.body.CategoryId) {
        const category = await Category.findByPk(req.body.CategoryId);
        if (!category) {
          return res.status(404).send({ message: 'Categoría no encontrada' });
        }
        await product.setCategories(category);
      }
  
      res.send({ message: 'Producto actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha ocurrido un error al actualizar el producto' });
    }
  },
   // borra producto y todas sus categorías, requiere authentication
   async delete(req, res) {
    //borro producto
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        //borro categorías del usuario
        await Classification.destroy({
            where: {
                ProductId: req.params.id
            }
        });
        res.send({
            msg: 'El producto ha sido eliminado con éxito'
        });
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
},
//muestra los productos y a las categorías que pertenece
async getAll(req, res) {
  try {
      const products = await Product.findAll({
          include: [Category]
      })
      res.send(products)
  } catch (error) {
      console.error(error)
      res.status(500).send(error)
  }
},

};


module.exports = ProductController