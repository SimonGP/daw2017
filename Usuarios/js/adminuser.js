var perfil=['administrador', 'Guia', 'Cliente']

function calcuPerfil(valor){
	var resultado=0
	for (var x=0;x<perfil.length;x++){
		
		if(perfil[x]==valor){
			
			resultado=x+1
		}
	}	
	return resultado
}

function guardarPerfil(){
	var id=$(this).attr('id')
	var idPerfil = calcuPerfil($(this).parent().parent().children().children('#perfil').val())
	
	var datos={
		id:id,
		perfil:idPerfil
	}
	$.ajax({
		data:datos,
		url: 'usuarios/php/admin_cambio_perfil.php',
		type: 'POST',
		DataType:'Json',		
		success: function(data){
				
				cargarUser()
		}
	})
	
}

function cargarUser(){
	$.ajax({
		url: 'usuarios/php/admin_users.php',
		type: 'POST',
		DataType:'Json',		
		success: function(data){
			$('#lista').html("")
			
			var enlace="<table><tr><th>Nick</td><perfil><th>acciones</th></tr>"
			for (var x=0 ; x<data.length;x++){
				enlace+="<tr>"
				enlace+="<td>"+data[x].id+"</td><td>"+data[x].nick+"</td><td><select id='perfil'>"
				if(data[x].perfil == "administrador"){
					enlace+="<option selected>administrador</option>"
				}else{
					enlace+="<option >administrador</option>"
				}
				if(data[x].perfil == "guia"){
					enlace+="<option selected>Guia</option>"
				}else{
					enlace+="<option >Guia</option>"
				}
				if(data[x].perfil == "cliente"){
					enlace+="<option selected>Cliente</option>"
				}else{
					enlace+="<option >Cliente</option>"
				}
				enlace+="</td><td><input id='"+data[x].id+"' type='submit' name='edit' value='Editar' class='reserva'/></td></tr>"
			}
			
			$('#lista').html(enlace)
			$('input').click(guardarPerfil)
		}
		
	})
}

$(document).ready(function(){
	cargarUser();
})