var historial_user=[]

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
	cargarReservas()
	cargarHistorial()
});

function cargarHistorial(){
	 $.ajax({            
            url:'Rutas/php/mostrar_historial_guias.php',
			type:'post',
			DataType:'Json',                      
            success:function (response) {
             var tabla=""
			   
			   tabla+="<select id='historial'><option></option>"
			   for(var i = 0; i < response.length; i++) {
					tabla+="<option>"+response[i].id+"/"+response[i].nombre+"</option>"
					
									
				}
				tabla+="</select><span class='boton reserva' id='historial_boton'>Historial</span></div><div id='registro'></div>"	
					$('#historial_guias').html(tabla)					
					$('#historial_boton').click(annadirHistorial)					
            }            
        })
}


function cargarReservas(){
	 $.ajax({            
            url:'Rutas/php/mostrar_reservas_guias.php',
			type:'post',
			DataType:'Json',                      
            success:function (response) {
             var tabla=""
			   
			   tabla+="<select id='reser'><option></option>"
			   for(var i = 0; i < response.length; i++) {
					tabla+="<option>"+response[i].id+"/"+response[i].nombre+"</option>"
					
									
				}
				tabla+="</select><span class='boton reserva' id='descargar_reserva'>Ver Inscritos</span></div><div id='inscritos'></div>"	
					$('#reserva_guias').html(tabla)
					$('#descargar_reserva').click(pdf)
									
            }            
        })
}

function pdf(){
	reserva=$('#reser').val();
	
	datos={
				datos:reserva
			}
	$.ajax({      
		
			data:datos,	
            url:'Rutas/php/pdf_reserva.php',
			type:'post',
			DataType:'Json',                      
            success:function (response) {
				
				var tabla="<div id='centrar_historial'>"
				for(var i = 0; i < response.length; i++) {
						
				var separarFilas=response[i].personas.split("@")
					for (var x=0;x<separarFilas.length;x++){
							tabla+="<div>"
						var separarPersonas=separarFilas[x].split("#")						
							if(x%2!=0){
								
								tabla+="<div>"+separarPersonas[0]+"</div>"
							}else{
								tabla+="<div>"+separarPersonas[0]+"</div>"
							}
							
						}	
				tabla+="</div></div>"						
					}	
					$('#inscritos').html(tabla)
					$('#PDF').attr("href",response[0].direccion)
            }            
        })	
}



function annadirHistorial(){
	
	var ruta =$('#historial').val()
	
	var datos={
		datos:ruta
	}
	 $.ajax({ 
			data:datos,
            url:'Rutas/php/guardar_historial.php',
			type:'post',	
			DataType:'Json', 			
            success:function (response) {
             var tabla=""
			
			   $('#km').val(response[0].km)
			   $('#fecha').val(response[0].fecha)
			  
			   $('#NomRuta').val(response[0].id)
			  
			   for(var i = 0; i < response.length; i++) {						
				var separarFilas=response[i].personas.split("@")
					for (var x=0;x<separarFilas.length;x++){
						historial_user.push(response[i].id)
							tabla+="<div id='recorrer'>"
						var separarPersonas=separarFilas[x].split("#")						
							if(x==0){
								
								tabla+="<p><input type='checkbox' checked id='"+response[x].nick+"' />"+separarPersonas[0]+"</p>"
							}
							
						}	
									
					}
					tabla+="<span class='button reserva' id='guardar_histo'>Guardar</span>"
					$('#registro').html(tabla)
					$('#guardar_histo').click(guardarFinal)
            }            
        })
}

function guardarFinal(){
	var nick=""
	var km =$('#km').val()
	var ruta =$('#NomRuta').val()
	var fecha = $('#fecha').val()
	var total = $('#recorrer input[type="checkbox"]:checked')
	
	for (var x=0; x<total.length;x++){
		
		nick+=total[x].id+"#"
		
		
		
		
	}
	var datos={
		usuarios:nick,
		km:km,
		ruta:ruta,
		fecha:fecha
	}
	
	$.ajax({ 
			data:datos,
            url:'Usuarios/php/annadir_historial.php',
			type:'post',	
			DataType:'Json', 			
            success:function (response) {
				
            }            
        })
}