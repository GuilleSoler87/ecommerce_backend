const { User, Order, Sequelize, Token } = require('../models/index.js'); // importo modelo
const { Op } = Sequelize;
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

const UserController = {
    // crea un usuario con password encriptada (bcrypt)
    async create(req, res) {
        req.body.role = "user";
        try {
            const password = await bcrypt.hashSync(req.body.password, 10) //encriptamos contraseña
            const user = await User.create({ ...req.body, password });
            res.status(201).send({ msg: "Usuario creado con éxito", user });
        } catch (error) {
            console.error(error)
            res.send(error) //para que en el postman (en la respueta) venga el error
        }
    },
    //login de usuario utilizando bcrypt + JWT(Token)
    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                },
            });
            if (!user) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password); //comparo contraseña
            if (!isMatch) {
                return res.status(400).send({ message: "Usuario o contraseña incorrectos" })
            }
            let token = jwt.sign({ id: user.id }, jwt_secret); //creo el token
            Token.create({ token, UserId: user.id });
            res.send({ token, message: 'Bienvenid@ ' + user.name, user });
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    // muestra usuario y sus órdenes
    async getAll(req, res) {
        try {
            const users = await User.findAll({
                include: [Order]
            })
            res.send(users)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    // trae usuarios por ID + Orders
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [Order]
            })
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    // trae usuario por nombre + Orders
    async getOneByName(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    },
                },
                include: [Order]
            })
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    // borra usuario y todas sus orders
    async delete(req, res) {
        //borro usuario
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            //borro órdenes del usuario
            await Order.destroy({
                where: {
                    UserId: req.params.id
                }
            });
            res.send({
                msg: 'El usuario ha sido eliminado con éxito'
            });
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
    //actualizar usuario
    async update(req, res) {
        try {
            await User.update(req.body,
                {
                    where: {
                        id: req.params.id
                    }
                });
            res.send('Usuario actualizado con éxito');
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    },
};


module.exports = UserController