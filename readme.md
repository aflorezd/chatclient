Cliente chat, configurado para trabajar con el  server https://github.com/aflorezd/chatserver

Desarrollado en Ionic Framework 4, haciendo uso de websocket (socket.io) y angular.

configuracion de la direccion y puerto en src/app/app.module.ts (por defecto http://localhost:2500)


Install Ionic

npm install -g ionic


Install NPM dependencies

npm install


ionic build


Ejecuta el proyecto

ionic serve --external  (external permite poder iniciar clientes con la direccion ip de la maquina y el puerto por defecto 8100)
