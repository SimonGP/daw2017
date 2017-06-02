
function noExcursion(date){
var day = date.getDay();
// aqui indicamos el numero correspondiente a los dias que ha de bloquearse (el 0 es Domingo, 1 Lunes, etc...)
return [(day != 0 && day != 1 && day != 2 && day != 3 && day != 4 && day != 5), ''];
}
// funcion calcular tiempo en horas y minutos
function calcularTiempo(minutos){
	var horas=Math.trunc(minutos/60);
	var minuto=minutos-horas*60;
	return (horas+"H "+minuto+"'")
	
}
// funcion carga el select con las rutas seleccionables
function cargarRutas(){		
	$.ajax({
		url: 'rutas/php/panel_admin_verRutas.php',  

		type: 'POST',
		DataType:'Json',		
		success: function(data){ 
			var enlace=""
			$('#listado').html("")			
			for(var x=0;x<data.length;x++){								
				if(x==0){
					enlace+="<option selected='selected'>"					
				}else{
					enlace+="<option>"
				}				
				enlace +=data[x].nombre
				enlace+="</option>"
			}			  			
			$('#listado').html(enlace)		
			var ruta=$('#listado').val()				
			CargarRutaInicio(ruta)
			$('#lista').change(function(){	
				var ruta=$('#listado').val()				
				CargarRutaInicio(ruta)								
			})			
		}		
	})
}

// funcion para mostrar los datos de la ruta seleccionada
function CargarRutaInicio(ruta){
	console.log("ruta"+ruta)
	var session=localStorage.getItem("id")
	
	if (session!=0){
		$('#listado').val(session)
		dato={
			ruta:session			
		}
		console.log("session valor"+session)
		localStorage.setItem('id', 0)
	}else{
		dato={
			ruta:ruta
		}
	}
	
	$.ajax({
		data:dato,
		url: 'rutas/php/cargar_ruta_valor.php',  
		type: 'POST',
		DataType:'Json',		
		success: function(data){ 
			var id=data[0].id				
			var tiempo=calcularTiempo(data[0].minutos)
			$('#id_ruta').val(data[0].id)
			$('#nombre_ruta').html(data[0].nombre)
			$('#localidad').html(data[0].localidad)
			$('#Tiempo').html(tiempo)
			$('#Distancia').html(data[0].km)
			$('#valoracion').html(data[0].valoracion)
			$('#Dificultad').html(data[0].dificultad)				
			$('#PDF').attr("href",data[0].pdf)
			$('#PDF').attr("download",(data[0].nombre))
			$('#descripcion').html(data[0].consejos)
			$('#mapa').html(data[0].mapa)	
			actualizarComentarios()
			dato={
				id:id
			}
			$.ajax({
				data:dato,
				url: 'rutas/php/calendario_una_ruta.php',
				type: 'POST',
				DataType: 'Json',
				success:function(data){									
					$('#fechas_ruta').html("")
					enlace="<select id='listado_rutas'>"
					for(var x=0;x<data.length;x++){
						fecha=data[x].fecha2					
						fechax=fecha.split("-")			
						anio=fechax[0]
						mes=fechax[1]
						dia=fechax[2]			
						fecha2=dia+'/'+mes+'/'+anio					
						if(x==0){
							enlace+="<option selected='selected'>"					
						}else{
							enlace+="<option>"
						}				
						enlace +=fecha2
						enlace+="</option>"
					}
					enlace+="</select>"   			
					$('#fechas_ruta').html(enlace)
					var consulta=$('#datepicker').val()					
					if(consulta!=undefined){						
						$('#listado_rutas').val(consulta)
					}
				}
			})
		}
	})	
}

// carga el select de rutas por fecha
function cargarRutasFecha(){	

	var fecha = $('#datepicker').val()	
	if (fecha == ""){
		
	}else{		
		var fechax=fecha.split("/")				
		var anio=fechax[2]
		var mes=fechax[1]
		var dia=fechax[0]			
		var fecha2=anio+'/'+mes+'/'+dia
		var dato={
			fecha:fecha2
		}		
		$.ajax({
			data:dato,
			url: 'rutas/php/busqueda_fecha.php', 
			type: 'POST',
			DataType:'Json',	
			success: function(data){ 			
				if(data[0].nombre=="vacio"){
						alerta("No Hay rutas para esa fecha")						
				}else{		
					$('#localidad_busqueda').val("Todas")
					$('#lista').html("")
					enlace="<select id='listado'>"
					for(var x=0;x<data.length;x++){										
						if(x==0){
							enlace+="<option selected='selected'>"					
						}else{
							enlace+="<option>"
						}				
						enlace +=data[x].nombre
						enlace+="</option>"
					}
					enlace+="</select>"   			
					$('#lista').html(enlace)		
						var ruta=$('#listado').val()				
						CargarRutaInicio(ruta)								
				}				
			}
		})
	}
}

// funcion carga el select de rutas por localidad
function cargarRutasLocalidad(){
	$('#datepicker').val("")	
	var local=$('#localidad_busqueda').val()
	var dato={
		localidad:local
	}
	$.ajax({
		data:dato,
		url:'rutas/php/localidad_ruta.php',
		type:'POST',
		DataType:'Json',
		success:function(data){
			$('#lista').html("")
			enlace="<select id='listado'>"
			for(var x=0;x<data.length;x++){								
				if(x==0){
					enlace+="<option selected='selected'>"					
				}else{
					enlace+="<option>"
				}				
				enlace +=data[x].nombre
				enlace+="</option>"
			}
			enlace+="</select>"   			
			$('#lista').html(enlace)		
			var ruta=$('#listado').val()				
			CargarRutaInicio(ruta)
		}
	})
}

$(document).ready(function(){
	$('#mostrar_comentarios').change(actualizarComentarios)
	$('#caja_comentario').keyup(cuenta)
	comprobarBotones()
	$('#enviarComentario').click(guardarComentario)	
	$('#reset').click(reseteo)
	$('#rutero').click(annadir)
	$('#nuevocomentario').click(abrirComentario)
	$('#localidad_busqueda').change(cargarRutasLocalidad)
	$('#close6').click(cerrarAlerta);
	var hoy= new Date()
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '< Ant',
		nextText: 'Sig >',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	 }
			$.datepicker.setDefaults($.datepicker.regional['es'])
			$("#datepicker").datepicker({
				minDate: hoy,
				changeMonth:true,
				beforeShowDay: noExcursion,
			})
			$('#datepicker').change(cargarRutasFecha)
		$( "#tabs" ).tabs({
			collapsible: true
	})	
	cargarRutas()		
	$('#guardar_Reserva').click(guardarReserva)
	$('#botonreserva').click(function() {
		console.log($('#nombre_ruta').html())		
		if($('#rutero').hasClass('ocultar')){
			$('#rutero').removeClass('ocultar')
		$('#rutero').addClass('mostrar')}
		if($('.acompanante').hasClass('ocultar')){
			$('.acompanante').removeClass('ocultar')
		$('.acompanante').addClass('mostrar')}
		if($('#listado_ruteros').hasClass('mostrar')){
			$('#listado_ruteros').removeClass('mostrar')
		$('#listado_ruteros').addClass('ocultar')}
		if($('#guardar_Reserva').hasClass('ocultar')){
			$('#guardar_Reserva').removeClass('ocultar')
		$('#guardar_Reserva').addClass('mostrar')}
		$.ajax({
			url:   'Usuarios/php/clase_sessiones.php',
            type:  'post',
			TypeData: 'Json',
			success:function(data){				
				$('#nombrecompleto').html(data.nombre+" "+data.apellidos)
				$('#rutareserva').html($('#nombre_ruta').html())
				$('#DNIreserva').html(data.dni)
			}
		})
		type = $(this).attr('data-type');		
		$('.overlay-container').fadeIn(function() {			
			window.setTimeout(function(){
				$('.window-container.'+type).addClass('window-container-visible');
			}, 100);
			
		});
	});	
	$('#close').click(cerrarPopUp);
	$('#close2').click(cerrarPopUpComentario);
})
// funcion guardar una reserva
function guardarReserva(){
	var fecha=$('#listado_rutas').val()	
	var id=$('#id_ruta').val()					
	var fecha2=cambiarFecha(fecha)
	datos={		
		fecha:fecha2,
		id_ruta:id
	}
	$.ajax({
		url: 'rutas/php/comprobarReserva.php',
		data:datos,
		type: 'POST',
		DataType:'Json',		
		success: function(data){
			console.log(data)
			if (data==1){
				alerta('Ya tienes una reserva realizada')
			}else{
				var id=$('#id_ruta').val()
				var fecha=$('#listado_rutas').val()	
				var fecha2=cambiarFecha(fecha)
				var nombre=$('#nombrecompleto').html()
				var dni=$('#DNIreserva').html()
				var mensaje="<p>"+nombre+" </p>#<p>"+dni+"</p>@"
				var contador=1;
				var acompanantes=$('.compi')
				var dniacompa=$('.dnicompi')		
				for (var x=0;x<acompanantes.length;x++){
					mensaje+="<p>"+acompanantes[x].innerHTML+" <p>#</p>"+dniacompa[x].innerHTML+"</p>@"
					contador++;
				}					
				datos={
					numero:contador,
					fecha:fecha2,
					id_ruta:id,
					reserva:mensaje
				}		
				console.log("datos:"+datos)
				$.ajax({
					url: 'rutas/php/guardarReserva.php',
					data:datos,
					type: 'POST',
					DataType:'Json',		
					success: function(data){
						
						$('#guardar_Reserva').removeClass('mostrar')
						$('#guardar_Reserva').addClass('ocultar')
						$('#rutero').removeClass('mostrar')
						$('#rutero').addClass('ocultar')
						$('.acompanante').removeClass('mostrar')
						$('.acompanante').addClass('ocultar')				
						$('#listado_ruteros').addClass('mostrar')				
						var acompa=$('#listado_ruteros').html()
						acompa+="<p>"+data+"</p>"				
						$('#listado_ruteros').html(acompa)
						cerrarPopUp()	
					}
				})
	
			}
					
		}
	})
	
}
	
	

function annadir(){
	console.log("dentro añadir")
	if($('#nombre_rutero').val()== "" || $('#dni_rutero').val()==""){
		alerta("Rellene todos los campos")
	}else{		
		console.log("dentro añadir 2")
		$('#listado_ruteros').removeClass("ocultar")
		$('#listado_ruteros').addClass("mostrar")
		
		var nombre=$('#nombre_rutero').val()
		var dni=$('#dni_rutero').val()		
		var mensaje=$('#listado_ruteros').html()
		console.log(nombre)
console.log(dni)
		mensaje+="<p>Nombre: <span class='compi'>"+nombre+"</span></p><p>DNI: <span class='dnicompi'>"+dni+"</span></p><br><hr/>"
		$('#listado_ruteros').html(mensaje)
	}
	
}

function cerrarPopUpComentario(){
	$('#caja_comentario').val("")
	$('.overlay-container2').fadeOut().end().find('.window-container2').removeClass('window-container-visible2');
}

function cerrarPopUp(){
	$('#listado_ruteros').removeClass("mostrar")
	$('#listado_ruteros').addClass("ocultar")
	$('#listado_ruteros').html("")
	$('#guardar_Reserva').removeClass('ocultar')
	$('#guardar_Reserva').addClass('mostrar')
	$('#rutero').removeClass('ocultar')
	$('#rutero').addClass('mostrar')
	$('.acompanante').removeClass('ocultar')
	$('.acompanante').addClass('mostrar')
	$('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
}
	
function reseteo(){
	$('#datepicker').val("")
	$('#localidad_busqueda').val("Todas")
	cargarRutas()
	var ruta=$('#listado').val()
	cargarRutaInicio(ruta)
}
	
function abrirComentario(){
	$('#caja_comentario').val("")
	type = $(this).attr('data-type');
	
	cuenta()
	$('.overlay-container2').fadeIn(function() {		
		window.setTimeout(function(){
			$('.window-container2.'+type).addClass('window-container-visible2');
		}, 100);
		
	});
}
	
function guardarComentario(){
	var idruta=$('#id_ruta').val()
	var comentario = $('#caja_comentario').val()
	datos={
		ruta:idruta,
		comentario:comentario
	}
	$.ajax({
		data:datos,
		url:'usuarios/php/Guardar_Comentario.php',
		type:'POST',
		DataType:'Json',
		success:function(data){			
			cerrarPopUpComentario()
			$('#caja_comentario').val("")
			actualizarComentarios()
		}
	})
}
	
function actualizarComentarios(){
	var idruta=$('#id_ruta').val()
	var datos={
		id:idruta
	}
	$.ajax({
		data:datos,
		url:'usuarios/php/mostrarComentarios.php',
		type:'POST',
		DataType:'Json',
		success:function(data){		
			var imprimir=0;
			$('#comentarios_usuarios').html("")
			var total = $('#mostrar_comentarios').val()
			if(data.length<=total){
				imprimir = data.length
			}else{
				imprimir = total
			}			
			var enlace=""
			for(var x=0;x<imprimir;x++){
				enlace+="<section class='foros'>"					
				enlace+="<article class='foros1'><span class='nick'>By "+data[x].nick+"</span><span class='fecha_foro'>"+data[x].fecha+"</span></article>"
				enlace+="<article class='container'><p class='foros2'>"+data[x].mensaje+"</p></article>"				
				enlace+="</section>"
			}
			if(imprimir==0){
				enlace+="<section class='foros'>"					
				enlace+="<article class='foros1'><span class='nick'></span><span class='fecha_foro'></span></article>"
				enlace+="<article class='container'><p class='foros2'>Sé el primero en hacer un comentario</p></article>"				
				enlace+="</section>"
			}			
			$('#comentarios_usuarios').html(enlace)
		}
	})
}
	
function comprobarBotones(){
	$.ajax({
		url:'usuarios/php/clase_sessiones.php',
		type:'POST',
		DataType:'Json',
		success:function(data){
			if(data.id==""){
				console.log(data.id+"sessino cambiar botones")
				$('#botonreserva').removeClass("mostrar")
				$('#botonreserva').addClass("oculto")
				$('#nuevocomentario').removeClass("mostrar")
				$('#nuevocomentario').addClass("oculto")
			}else{
				$('#botonreserva').removeClass("oculto")
				$('#botonreserva').addClass("mostrar")
				$('#nuevocomentario').removeClass("oculto")
				$('#nuevocomentario').addClass("mostrar")
			}
			
		}
	})
}
	
function cuenta(){
   var numeros = $('#caja_comentario').val() 
   var quedan = 2000 - numeros.length
   $('#contador').html(quedan)   
} 

function alerta(mensaje){
$('#alerta').html(mensaje)	
	type = $(this).attr('data-type');	
	$('.overlay-container6').fadeIn(function() {		
		window.setTimeout(function(){
			$('.window-container6.zoomin').addClass('window-container-visible6');
		}, 100);
		
	});
}

function cerrarAlerta(){
	$('#alerta').val("")
	$('.overlay-container6').fadeOut().end().find('.window-container6').removeClass('window-container-visible6');
}

function cambiarFecha(fecha){
	var fecha=$('#listado_rutas').val()
	var fechax=fecha.split("/")				
	var anio=fechax[2]
	var mes=fechax[1]
	var dia=fechax[0]			
	var fecha2=anio+'/'+mes+'/'+dia
	console.log("fecha"+fecha2)
	return fecha2
}

