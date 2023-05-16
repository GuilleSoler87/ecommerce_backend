const { Product, Category, Classification, Order, User, Review, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const ProductController = {
  // crea producto y añade categorías, requiere authentication
  async create(req, res, next) {
    try {
      const { name, price, description, CategoryId } = req.body;
      const product = await Product.create({
        name,
        price,
        description,
        image: req.file ? req.file.filename : null
      });
      if (CategoryId) {
        await product.addCategory(CategoryId);
      }
      res.status(201).send({ msg: "Producto creado con éxito", product });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
    
  //update producto y sus categorías, requiere authentication
  async update(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).send({ message: 'Producto no encontrado' });
      }
  
      const { name, price, CategoryId } = req.body;
      const updates = { name, price };
  
      if (req.file) { // Si se ha subido una imagen, se actualiza en la base de datos
        updates.image = req.file.filename;
      }
  
      // Actualizar el producto
      await Product.update(updates, {
        where: {
          id: productId
        }
      });
  
      // Actualizar la relación con la categoría, requiere authentication
  
      await product.setCategories(CategoryId);
  
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
  //muestra los productos y a las categorías que pertenece, requiere authentication
  // async getAll(req, res) {
  //   try {
  //     const products = await Product.findAll({
  //       include: [Category]
  //     })
  //     res.send(products)
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).send(error)
  //   }
  // },


  //muestra los productos y a las categorías que pertenece + sus reseñas con el usuario que la hizo, requiere authentication (ACTUALIZADO)
  async getAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ['name']
          },
          {
            model: Review,
            attributes: ['id', 'tittle', 'comment'],
            include: {
              model: User,
              attributes: ['name']
            }
          }
        ]
      });
      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  // trae productos por ID + Categorías, requiere authentication
  // async getById(req, res) {
  //   try {
  //     const product = await Product.findByPk(req.params.id, {
  //       include: [Category]
  //     })
  //     res.send(product)
  //   } catch (error) {
  //     console.error(error)
  //     res.status(500).send(error)
  //   }
  // },



  // trae productos por ID + Categorías, requiere authentication (ACTUALIZADO)
  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          { model: Category },
          {
            model: Review,
            include: User,
          }
        ]
      });
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  // trae Producto por nombre + Categorías, requiere authentication
  async getOneByName(req, res) {
    try {
      const product = await Product.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`
          },
        },
        include: [Category]
      })
      res.send(product)
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }
  },
  //busca producto por precio, requiere authentication
  async searchByPrice(req, res) {
    try {
      const { minPrice, maxPrice } = req.query;

      const products = await Product.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice],
          },
        },
      });

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  // ordena los productos de mayor a menor, requiere authentication
  async getByPriDesc(req, res) {
    try {
      const products = await Product.findAll({
        order: [["price", "DESC"]],
      });

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};


module.exports = ProductController