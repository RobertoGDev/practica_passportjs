# Express passportjs

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

**Nota: Esto es un proyecto correspondiente a un ejercicio de estudios, por favor tenga en cuenta que no va a tener soporte ni mejoras (por ahora)**.

Express passportjs es un sistema básico de autorización desarrollado en express en el que puede realizar las siguientes acciones:  

  - Puede añadir un user
  - Login con estrategia local
  - Check username y email del usuario

### Tecnología

Express passportjs utiliza algunos sistemas open source para su funcionamiento como son:

* [node.js] - para el backend
* [mongo] - mongo para bases de datos
* [Express] - framework de desarrollo
* [passportjs] - paquete para el middleware de acceso

### Instalación

Express passportjs requiere [Node.js](https://nodejs.org/) v4+ to run.

Instale las dependencias

```sh
$ npm install
```

Debe crear las variables de entorno en un archivo .env
```js
PORT //Puerto en el que el servidor se va a mostrar
DB_URL //localhost en caso de servidor local o la url
DB_PORT //Puerto de la base de datos Mongo
DB_NAME //Nombre de la base de datos Mongo
```
### Códigos de Error

Para evitar intrusión en el sistema y posibles ataques (no sé si es lo más correcto) el sistema devuelve una serie de códigos de error que puede conocer a continuación:

1. Error 001: Incorrect username
2. Error 002: Incorrect password
3. Error 003: User not found


License
----

MIT
