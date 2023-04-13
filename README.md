# ECOMMERCE - PROYECTO BACKEND

En este proyecto encontramos una base de datos relacional que simula una tienda online. Los datos que almacenamos dentro de esta base de datos son:
- Usuarios.
- Órdenes.
- Productos.
- Categoría de productos.
- Reseñas.

Para poder realizarla, utilizamos un entorno de ejecución (NODE), con frameworks, ORM y junto algunos middlewares que mencionaremos más adelante.
El diagrama que representa esta base de datos es la siguiente:

![Diagrama](./assets/diagrama.jpg)

## Comenzando 🚀

Para poder desplegar el proyecto correctamente, desde GitHub y con el acceso correspondiente al repositorio de la web, clonar el repositorio en su ordenador, también deberá instalar todas las herramientas, frameworks, y los middlewares para el funcionamiento correcto.

## Ejecutando Node ⌨️
Node es un entorno de ejecución de JavaScript orientado a eventos asíncronos. Node.js está diseñado para crear aplicaciones network escalables.

● Node.js es un entorno de servidor de código abierto.
● Node.js es gratis.
● Node.js se ejecuta en varias plataformas (Windows, Linux, Unix, Mac OS X, etc.)
● Node.js usa JavaScript en el servidor.

Lo descargamos del siguiente enlace [*NODE*](https://nodejs.org/es/).

### Instalación Nodemon:
Nodemon es una herramienta que ayuda a desarrollar aplicaciones basadas en node.js al reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos del directorio.

● npm install -D nodemon.


## Ejecutando Express ⌨️
Un framework como Express, es un patrón o esquema que ayuda a la programación a estructurar el código y a ahorrar tiempo y
esfuerzos a los programadores. Express.js es un framework de Node.js y permite crear una API robusta rápido y fácil.

● npm install express.


## Instalando Postman ⌨️
Postman es una herramienta que sirve de gran ayuda al equipo de desarrollo, permitiendo mantener las colecciones actualizadas, ahorrando los tiempos de respuesta al momento de realizar los test o las llamadas a los servicios.

Postman sirve para múltiples tareas dentro de las cuales destacaremos en esta oportunidad las siguientes:

- Testear colecciones o catálogos de APIs tanto para Frontend como para Backend.
- Organizar en carpetas, funcionalidades y módulos los servicios web.
- Permite gestionar el ciclo de vida (conceptualización y definición, desarrollo, monitoreo y mantenimiento) de nuestra API.
- Generar documentación de nuestras APIs.
- Trabajar con entornos (calidad, desarrollo, producción) y de este modo es posible compartir a través de un entorno cloud la información con   el resto del equipo involucrado en el desarrollo.

Lo descargamos del siguiente enlace [*POSTMAN*](https://www.postman.com/downloads/).

## Ejecutando Sequelize ⌨️

Sequelize es un ORM O(Object) R (Relational) M(Mapping) que permite a los usuarios llamar a funciones javascript para interactuar con SQL DB sin escribir consultas reales. Es bastante útil para acelerar el tiempo de desarrollo.

- Primero instalamos el CLI de Sequelize de forma global (solo se hace una vez en tu PC).

● npm install sequelize-cli -g.

- Para las veces posteriores, instalaremos varias herramientas de forma simultánea.

● npm install express sequelize mysql2.

## EXTRAS ⌨️
- Encriptación de contraseñas:
HASH --> Una función criptográfica hash- usualmente conocida como “hash”- es un algoritmo matemático que transforma cualquier
bloque arbitrario de datos en una nueva serie de caracteres con una longitud fija.

SALT --> Un salt es una string aleatoria. Al encriptar una contraseña de texto sin formato más un salt, la salida del
algoritmo hash ya no es predecible. La misma contraseña ya no producirá el mismo hash.

● npm i bcryptjs

### BCRYPT 🖳
>Ejemplo de importación del módulo bcrypt:
```json
const { User, Post } = require('../models/index.js');
const bcrypt = require ('bcryptjs');
const UserController = {
create(req, res) {
req.body.role = "user";
const password = bcrypt.hashSync(req.body.password,10)
User.create({...req.body, password:password })
.then(user => res.status(201).send({ message: 'Usuario creado con éxito', user }))
.catch(err => console.error(err))
},
```
>Creando ejemplo de login de la siguiente forma con bcrypt:
```json
const UserController = {
login(req,res){
User.findOne({
where:{
email:req.body.email
}
}).then(user=>{
if(!user){
return res.status(400).send({message:"Usuario o contraseña incorrectos"})
}
const isMatch = bcrypt.compareSync(req.body.password, user.password);
if(!isMatch){
return res.status(400).send({message:"Usuario o contraseña incorrectos"})
}
res.send(user)
})
},
```



## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [*VISUAL STUDIO CODE*](https://code.visualstudio.com/) - Code editor used (Version: 1.75.1)
* [*Live Server*](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Manejador de dependencias
* [*GitHub*](https://github.com/) - Almacenamiento de repositorios
* [*Bootstrap*](https://getbootstrap.com/) - framework front end CSS y Javascript (Usada esta web para sus componentes)
* [*Axios*](https://axios-http.com/es/docs/intro) - librería JavaScript (Usada para poder acceder a la API de https://opentdb.com/)
* [*ChartJS*](https://www.chartjs.org/) - biblioteca JavaScript (Usada para la visualización de datos.)


## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/GuilleSoler87/Quiz_JavaScript.git).

## Autores ✒️

* **Guillermo Soler Fernández** - *Proyecto Quiz - JavaScript* - [GuilleSoler87](https://github.com/GuilleSoler87)

* **Volodymyr Kolomiiets** - *Proyecto Quiz - JavaScript* - [VolodymyrKolomiets](https://github.com/VolodymyrKolomiets)


## Licencia 📄

Este proyecto actualmente no tiene licencia. Puede usarse todo su contenido sin el requisito de la misma.