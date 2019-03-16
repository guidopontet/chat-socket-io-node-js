var express=require('express')
var app=express();
var server=require('http').Server(app)


// CARGAMOS UNA VISTA ESTATICA A TRAVES DE UN MIDDLEWARE
	// Todos los html estaticos estan en la carpeta client
app.use(express.static('client'));

// SOCKETS
var io=require('socket.io')(server) /*Le pasamos el servidor como parametro*/


//ARRAY DE MENSAJES
var messages=[{
	id:1,
	text:'Bienvenido al chat privado de Socket.io y Node.js',
	nickname: 'Bot - guipon'
	}]


// ABRIMOS UNA CONEXION AL SOCKET
	// Cada vez que alguien se conecta, se ejecuta el metodo connection
io.on('connection',function(socket){
	console.log("El cliente con IP: "+socket.handshake.address+ " se ha conectado")
	// console.log(socket)

	// ENVIAMOS EL MENSAJE
	socket.emit('messages',messages)

	//RECIBIR MENSAJES DE LOS USUARIOS
	socket.on('add-message',function(data){
		// Agregamos el mensaje al array de mensajes
		messages.push(data);

		// Amitimos a todos los clientes los mensajes nuevamente
		io.sockets.emit('messages',messages)
	})


})

// SERVER
server.listen(6677,function(){
	console.log("El servidor está funcionando en el puerto 6677")
})