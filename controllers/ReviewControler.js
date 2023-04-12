const { Review, Product, User, Category, Classification, Sequelize } = require('../models/index.js');
const { Op } = Sequelize;

const ReviewController = {
    // crea una reseña y añade usuario y Producto, requiere authentication
    async create(req, res, next) {
        try {
            const review = await Review.create(req.body);
            await review.setUser(req.body.UserId); // Para insertar en la tabla intermedia
            await review.setProduct(req.body.ProductId); // Para insertar en la tabla intermedia
            res.status(201).send({ msg: "Reseña creada con éxito", review });
        } catch (error) {
            console.error(error);
            next(error); //Pasa el error al siguiente middleware de manejo de errores
        }
    },
    //update una reseña con su usuario y Producto, requiere authentication
    async update(req, res) {
        try {
            const reviewId = req.params.id;
            const review = await Review.findByPk(reviewId);
            if (!review) {
                return res.status(404).send({ message: 'Reseña no encontrada' });
            }

            // Actualizar la reseña
            await Review.update(req.body, {
                where: {
                    id: reviewId
                }
            });

            // Actualizar la relación con el usuario, requiere authentication
            if (req.body.UserId) {
                const user = await User.findByPk(req.body.UserId);
                if (!user) {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
                await review.setUser(user);
            }

            // Actualizar la relación con el producto, requiere authentication
            if (req.body.ProductId) {
                const product = await Product.findByPk(req.body.ProductId);
                if (!product) {
                    return res.status(404).send({ message: 'Producto no encontrado' });
                }
                await review.setProduct(product);
            }

            res.send({ message: 'Reseña actualizada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error al actualizar la reseña' });
        }
    },
    // borra la reseña con sus usuarios y productos, requiere authentication
    async delete(req, res, next) {
        try {
            const review = await Review.findByPk(req.params.id);

            if (!review) {
                return res.status(404).send({ msg: "Reseña no encontrada" });
            }

            // Elimina la relación de la reseña con el usuario y el producto
            await review.setUser(null);
            await review.setProduct(null);

            // Borra la reseña de la base de datos
            await review.destroy();

            res.send({ msg: "La reseña ha sido eliminada con éxito" });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    // trae las reviews, junto al usuario que la hizo, requiere authentication
    async getAll(req, res) {
        try {
            const reviews = await Review.findAll({
                include: User,
            });
            res.send({ reviews });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Ha ocurrido un error al obtener las reseñas' });
        }
    },
};


module.exports = ReviewController