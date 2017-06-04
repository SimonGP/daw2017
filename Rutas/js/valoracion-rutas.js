function guardarId(){
	var id = $(this).find('input').val()
	console.log("id:"+id)
	localStorage.setItem('id', id)
	
}

function mostrarValoracionUsuarios(){
	
		 $.ajax({            
            url:'Usuarios/php/usuarios_mas_valorados.php',
			type:'post',
			DataType:'Json',                      
            success:function (data) {
                var enlace=""				
				for( var x=0;x<data.length;x++){					
					     
                    enlace+="<fieldset class='perfil_ruta'><h4><p><a href='guias.html'>"+data[x].usuario+"</a></p><p>Valoración: "+data[x].km+" Kms</p></h4></fieldset>"
				}
				
				$('#usuarios_mas_valorados').html(enlace)
				
				
            }            
        })		
}

function mostrarValoracion(){
	
		 $.ajax({            
            url:'Rutas/php/mostrar-valoracion.php',
			type:'post',
			DataType:'Json',                      
            success:function (data) {
                var enlace=""				
				for( var x=0;x<data.length;x++){
                   
					
					enlace+="<fieldset class='perfil_ruta'><input type='hidden' value='"+data[x].nombre+"'/><h4><p><a href='rutas.html'>"+data[x].nombre+"</a></p><p>Valoración: "+data[x].valoracion+"</p></h4></fieldset>"
				}
				
				$('#mas-valoradas').html(enlace)
				$('.perfil_ruta').click(guardarId)
				
            }            
        })		
}
$(document).ready(function(){
mostrarValoracion()
mostrarValoracionUsuarios()
});

