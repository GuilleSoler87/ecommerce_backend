const { Order, User } = require('../models/index.js'); // importo modelo
const OrderController = {
    // crea una orden (incluye usuario y producto)
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            await order.addProduct(req.body.ProductId); // Para insertar en la tabla intermedia
            res.status(201).send({ msg: "Order creada con éxito", order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)//para que en el postman (en la respuesta) venga el error
        } // error del servidor
    },
    // muestra órdenes y su usuario
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [User]
            })
            res.send(orders)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    // trae órdenes por ID + User
    async getById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [User]
            })
            res.send(order)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    //borra una orden
    async delete(req, res) {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.send({
                msg: 'La Order ha sido eliminada con éxito'
            });
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
};

module.exports = OrderController