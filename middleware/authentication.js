const { User, Product, Category, Order, Token, Sequelize } = require('../models');
const { Op } = Sequelize;
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

//valida la posesión de token para realizar acciones
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, jwt_secret);
        const user = await User.findByPk(payload.id);
        const product = await Product.findByPk(payload.id);
        const category = await Category.findByPk(payload.id);
        const order = await Order.findByPk(payload.id);
        const tokenFound = await Token.findOne({
            where: {
                [Op.and]: [
                    { UserId: user.id },
                    { token: token }
                ]
            }
        });
        if (!tokenFound) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        req.product = product;
        req.category = category;
        req.order = order;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
};
// permiso para realizar acciones por rol
const isAdmin = async (req, res, next) => {
    const admins = ['admin', 'superadmin']; //lista de roles
    //miro si el usuario tiene el rol correcto
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permisos'
        });
    }
    //si tiene un rol dentro de la lista de roles, le dejamos pasar
    next();
};


module.exports = { authentication, isAdmin }