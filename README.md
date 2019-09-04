Requisitos:

Node: v10.15.0 o superior (Se puede descargar del siguiente link: https://nodejs.org/en/).

Luego instalamos el servidor web de node para correr nuestra aplicacion:

Desde distribuciones de linux:
```
sudo npm install http-server -g
```

Desde distribuciones de windows (correr como administrador):
```
npm install http-server -g
```

Cuando el repositorio termina de clonarse, nos situamos en el root de aplicacion y corremos lo siguiente:

```
http-server
```

De correr de manera correcta, deberiamos ver algo asi en la consola:

```
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://10.78.17.67:8080
  http://10.42.0.1:8080
Hit CTRL-C to stop the server
```

En el navegador ingresar a 'http://127.0.0.1:8080/index.html'

La logica de la conexión a la api se encuentra en './js/main.js'. Los estilos se encuentran en './css/main.css'.

