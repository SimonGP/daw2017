$(document).ready(function(){
mostrarValoracion()
function mostrarValoracion(){
	
		 $.ajax({            
            url:'Rutas/php/mostrar-guias.php',
			type:'post',
			DataType:'Json',                      
            success:function (data) {
                var enlace="<table id='tabla-hospe'>"
                enlace+="<tr><th>Imagen</th><th>Nombre</th><th>Experiencia</th></tr>"
				for( var x=0;x<data.length;x++){
                   
                    enlace+="<tr>"					
					enlace+="<td><img src='"+data[x].imagen_guia+"'/></td><td>"+data[x].nombre_guia+"</td><td>"+data[x].experiencia+"</td>"
                    enlace+="</tr>"
				}
				enlace+="</table>"
				$('#caja-guias').html(enlace)
				
            }            
        })		
}



});