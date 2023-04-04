const { Category, Product } = require('../models/index.js');

const CategoryController = {
  //creat categoría, requiere authentication
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ msg: "Categoría creada con éxito", category });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  //update categoría, requiere authentication
  async update(req, res) {
    try {
      await Category.update(req.body,
        {
          where: {
            id: req.params.id
          }
        });
      res.send('Categoría actualizada con éxito');
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },
  //borrar una categoría, requiere authentication
  async delete(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.send({
        msg: 'La Categoría ha sido eliminada con éxito'
      });
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },
  //Muestra las categorías y los productos que contiene
  async getAll(req, res) {
    try {
        const categories = await Category.findAll({
            include: [Product]
        })
        res.send(categories)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
  },

};


module.exports = CategoryController