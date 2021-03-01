const express = require("express");
const session = require('express-session');

const app = express();
const port = 8000;
let count = 0;

app.use(express.static(__dirname + "/public"));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/static', express.static("static"));


app.use(express.json() );
app.use(express.urlencoded({extended:true})); 

app.get('/', function (req, res){
  res.render('index');
});
app.get('/colores', function (req, res){
  res.render('colores.ejs');
});


// Lanzamos nuestra aplicación
const server = app.listen(port, function() {
  console.log('Escuchando en el puerto ' + port);
});


// Ahora creamos nuestras funciones de Sockets
const io = require('socket.io')(server);

// cuando me conecte con algún cliente
io.on('connection', function(socket) {
  socket.emit('contando', {
    boton: `El botón épico ha sido presionado ${count} veces`
  });
  socket.broadcast.emit('contando', {
    boton: `El botón épico ha sido presionado ${count} veces`
  });


  socket.on('contando', function(data){
    count++;
    socket.emit('contando', {
      boton: `El botón épico ha sido presionado ${count} veces`
    });
    socket.broadcast.emit('contando', {
      boton: `El botón épico ha sido presionado ${count} veces`
    });
  });


  socket.on('reiniciando', function() {
    count = 0;
    socket.emit('resetear', {
        boton: `El botón épico ha sido presionado ${count} veces`
    });
    socket.broadcast.emit('resetear', {
      boton: `El botón épico ha sido presionado ${count} veces`
    });

  });

  socket.emit('coloreando-verde', {msg: 'hola'});
  socket.broadcast.emit('coloreando', {msg: 'hola'});

  socket.emit('coloreando-azul', {msg: 'hola'});
  socket.broadcast.emit('coloreando', {msg: 'hola'});

  socket.emit('coloreando-rosa', {msg: 'hola'});
  socket.broadcast.emit('coloreando', {msg: 'hola'});



  socket.on('coloreando-verde', function(data){
    //console.log('verde');
    socket.emit('cambiando-verde', {msg: 'chao'});
    socket.broadcast.emit('cambiando-verde', {msg: 'chao'});
  });

  socket.on('coloreando-azul', function(data){
    //console.log('azul');
    socket.emit('cambiando-azul', {msg: 'chao'});
    socket.broadcast.emit('cambiando-azul', {msg: 'chao'});
  });

  socket.on('coloreando-rosa', function(data){
    //console.log('rosa');
    socket.emit('cambiando-rosa', {msg: 'chao'});
    socket.broadcast.emit('cambiando-rosa', {msg: 'chao'});
  });

});
