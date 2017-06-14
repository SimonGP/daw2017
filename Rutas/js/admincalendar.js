
var dureza=[]

function noExcursion(date){
var day = date.getDay();
// aqui indicamos el numero correspondiente a los dias que ha de bloquearse (el 0 es Domingo, 1 Lunes, etc...)
return [(day != 0 && day != 1 && day != 2 && day != 3 && day != 4 && day != 5), ''];
}

function cargarRutas(){	
	$.ajax({
		url: 'rutas/php/panel_admin_verRutas.php',  
		type: 'POST',
		DataType:'Json',		
		success: function(data){  	
			$('#listado').html("")
			enlace="<select id='listado'>"
			for(var x=0;x<data.length;x++){
				dureza.push([data[x].nombre,data[x].dificultad,data[x].id])
				
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
			$('#dureza').html(dureza[0][1])		
			$('#lista').change(function(){			
				var ruta=$('#listado').val()			
				var encontrado=true
				contador=0
				while(encontrado){
					if(dureza[contador][0]==ruta){
						encontrado=false					
						$('#dureza').html(dureza[contador][1])
						contador=0
					}
					contador++
				}				
			})
			mostrarT()
			$('#datepicker').change(mostrarC)
		}
		
	})
}





// visualiza las rutas fijadas para la fecha que se seleccione

function mostrarC(){
	var dato=$('#datepicker').val()
	
	
	var fechax=dato.split("/")
			
	var anio=fechax[2]
	var mes=fechax[1]
	var dia=fechax[0]			
	var fecha2=anio+'/'+mes+'/'+dia
	var fecha={
		fecha:fecha2
	}	
	$.ajax({
		url: 'rutas/php/panel_calendario_verCalendario.php',  
		type: 'POST',
		data:fecha,		
		DataType:'Json',	
		success: function(data){  
			
			$('#fechas').html("")
			if(data.length==0){
				$('#fechas').html("")
			}else{
				var enlace="<fieldset><legend>Rutas en este Fecha</legend><table>"
				
				for(var x=0;x<data.length;x++){
					var fech=data[x].fecha.split("-")
					var anio=fech[0]
					var mes=fech[1]
					var dia=fech[2]
					fecha=dia+"/"+mes+"/"+anio
					enlace+="<tr>"
					enlace += "<td><button class='borrar' id='"+data[x].id+"'>Borrar</button></td><td>"+devolverNombre(data[x].id_ruta)+"</td>"+"<td>"+data[x].id_ruta+"</td>"+"<td>"+fecha+"</td>"
					enlace+="</tr>"
				}
			enlace+="</table></fieldset>"

			}			
		   $('#fechas').html(enlace)
		   $('.borrar').click(borrarRuta)
		   comprobarMaximo()		   
			}
		})
	}





// visualiz todas las rutas fijadas

function mostrarT(){	
	
	$.ajax({
		url: 'rutas/php/panel_calendario_verCalendarioTodos.php',  
		type: 'POST',		
		DataType:'Json',	
		success: function(data){  		
			$('#todas_fechas').html("")
			if(data.length==0){
				$('#todas_fechas').html("")
			}else{
				var enlace="<fieldset><legend>Rutas creadas</legend><table>"
			
				for(var x=0;x<data.length;x++){
					var fech=data[x].fecha.split("-")
					var anio=fech[0]
					var mes=fech[1]
					var dia=fech[2]
					fecha=dia+"/"+mes+"/"+anio
					enlace+="<tr>"
					enlace += "<td><button class='borrar' id='"+data[x].id+"'>Borrar</button></td><td>"+devolverNombre(data[x].id_ruta)+"</td>"+"<td>"+data[x].id_ruta+"</td>"+"<td>"+fecha+"</td>"
					enlace+="</tr>"
				}
			enlace+="</table></fieldset>"
			}		
			
		    $('#todas_fechas').html(enlace)	   

			$('.borrar').click(borrarRuta)
			comprobarMaximo()			

		}
	})
}

$(document).ready(function(){
	$(function () {
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
		cargarRutas()
		$('#guardar').click(function(){
			$('#mensaje').html("")
			var fecha=$("#datepicker").val()
			var fechax=fecha.split("/")
			
			var anio=fechax[2]
			var mes=fechax[1]
			var dia=fechax[0]			
			var fecha2=anio+'/'+mes+'/'+dia			
			var ruta=$('#listado').val()
			
			var encontrado=true
			contador=0
			while(encontrado){
				if(dureza[contador][0]==ruta){
					encontrado=false					
					var id = dureza[contador][2]
					contador=0
				}
				contador++
			}
			
			if(fecha == "" || ruta == ""){
				$('#mensaje').html("Introduce todos los datos")
			}
			else{
				var datos={
					ruta:id,
					fecha:fecha2
				}
				
				$.ajax({
					url: 'rutas/php/panel_calendario_registro.php',  
					type: 'POST',					
					data: datos,		
					success: function(data){                
					   $('#mensaje').html(data)
					   mostrarC()
					   mostrarT()
					   $('.borrar').click(borrarRuta)	
					}
				})
			}
		})
	})
	
	
})

function devolverNombre(id){
	var respuesta=""
	var contador=0
	var encontrado=true
	while(encontrado){


		if(dureza[contador][2]==id){			

			encontrado=false					
			respuesta = dureza[contador][0]
			contador=0
		}
		contador++
	}	
	return respuesta
}

function borrarRuta(){
	
	var id= $(this).attr('id')
	datos={
		id:id
	}
	$.ajax({
		url: 'rutas/php/panel_calendario_borrar.php',  
		type: 'POST',					
		data: datos,		
		success: function(data){                
		   $('#mensaje').html(data)
		   mostrarC()
		   mostrarT()
comprobarMaximo()
		}
	})
}

		   
		

function comprobarMaximo(){
	
	var dato=$('#fechas tr' )
	if(dato.length==2){
		$(' #guardar').attr("disabled" , true)
	}else{
		$(' #guardar').attr("disabled" , false)
	}
	
	
}

