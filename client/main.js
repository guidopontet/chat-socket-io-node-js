var socket = io.connect('http://172.16.0.142:6677',{'forceNew':true});

// RECIBIMOS EL MENSAJE POR EL SOCKET QUE ENVIA EL SERVIDOR
socket.on('messages',function(data){
	// console.log(data)
	// LLAMO A LA FUNCION PARA QUE MUESTRE LOS MENSAJES
	render(data)
})

// FUNCION PARA MOSTRAR LOS MENSAJES
function render(data){
	// MAP recorre cada uno de los mensajes
	var html=data.map(function(message,index){
		// Devolvemos un HTML con interpolación de datos ECMASCRIPT 6
		return (`
			<div class="message">
				<strong>${message.nickname}</strong> dice:
				<p>${message.text}</p>
			</div>
		`)
	}).join(' ') /*Para meter un espacio entre elemento y elemento*/

	// Metemos el contenido al div con id 'messages' 
	var div_messages=document.getElementById('messages');
	div_messages.innerHTML= html;

	// Scrolleamos al ultimo mensaje
	div_messages.scrollTop=div_messages.scrollHeight
	
}

// FUNCION QUE ENVIA MENSAJES DESDE LA VISTA
function addMessage(event){
	var message={
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	}

	/*Ocultamos el nickname */
	document.getElementById('nickname').style.display='none'

	// EMITIMOS UN EVENTO DESDE EL CLIENTE AL SERVIDOR CON EL MENSAJE
	socket.emit('add-message',message);
	return false;
}