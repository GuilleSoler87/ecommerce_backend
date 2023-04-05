const { Order, User, Product, OrderProduct } = require('../models/index.js'); // importo modelo
const OrderController = {
    // crea una orden (incluye usuario y producto), requiere authentication
    async create(req, res) {
        try {
            const order = await Order.create({ ...req.body, UserId: req.user.id });
            await order.addProduct(req.body.ProductId); // Para insertar en la tabla intermedia
            res.status(201).send({ msg: "Order creada con éxito", order })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)//para que en el postman (en la respuesta) venga el error
        } // error del servidor
    },
    // muestra órdenes y su usuario, requiere authentication
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
    // trae órdenes por ID + User, requiere authentication
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
    //borra una orden y sus productos, requiere authentication
    async delete(req, res) {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            });
            //borro productos de esa orden
            await OrderProduct.destroy({
                where: {
                    OrderId: req.params.id
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
    //muestra los pedidos y los productos que contienen, requiere authentication
    async getAll(req, res) {
        try {
            const orders = await Order.findAll({
                include: [Product]
            })
            res.send(orders)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
};

module.exports = OrderController