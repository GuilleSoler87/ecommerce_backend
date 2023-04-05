const { User, Order, Product, Sequelize, Token } = require('../models/index.js'); // importo modelo
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer.js');
const { jwt_secret } = require('../config/config.json')['development']

const UserController = {
    // crea un usuario con password encriptada (bcrypt)
    async create(req, res, next) {
        // Verificar si todos los campos están presentes (esta es otra opción de validación)
        // const { name, email, password } = req.body;
        // if (!name || !email || !password) {
        //     return res.status(400).send({ msg: "Todos los campos son obligatorios" });
        // }
        // if (password.length < 6) {
        //     return res.status(400).send({ msg: "La contraseña debe tener al menos 6 caracteres" });
        // }
        // req.body.role = "user";
        try {
            let hashedPassword
            if (req.body.password) { hashedPassword = bcrypt.hashSync(req.body.password, 10) };//encriptamos contraseña

            const user = await User.create({
                ...req.body,
                password: hashedPassword,
                confirmed: false,
                role: "user"
            });
            const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, { expiresIn: '48h' })
            const url = 'http://localhost:8080/users/confirm/' + emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                <a href="${url}"> Click para confirmar tu registro</a>
                `,
            });
            res.status(201).send({ msg: "Te hemos enviado un correo para confirmar el registro", user });
        } catch (error) {
            console.error(error)
            next(error) //Pasa el error al siguiente middleware de manejo de errores
        }
    },
    //confirmación del correo de usuario
    async confirm(req, res) {
        try {
            const token = req.params.emailToken
            const payload = jwt.verify(token, jwt_secret)
            await User.update({ confirmed: true }, {
                where: {
                    email: payload.email
                }
            })
            res.status(201).send("Usuario confirmado con éxito");
        } catch (error) {
            console.error(error)
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
            if (!user.confirmed) {
                return res.status(400).send({ message: "Debes confirmar tu correo" }) //validación de correo
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
    // logout de usuario, requiere authentication
    async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    },
    // muestra usuario y sus órdenes, requiere authentication
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
    // trae usuarios por ID + Orders, requiere authentication
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
    // trae usuario por nombre + Orders, requiere authentication
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
    // trae usuario conectado + Pedidos + Productos, requiere authentication
    async getUserOrders(req, res) {
        try {
            if (!req.user || !req.user.id) {
                return res.status(400).send('El usuario no está autenticado.');
            }
            const user = await User.findByPk(req.user.id, {
                include: {
                    model: Order,
                    include: {
                        model: Product,
                    },
                },
            });

            res.status(200).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    // borra usuario y todas sus orders, requiere authentication
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
    //actualizar usuario, requiere authentication
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