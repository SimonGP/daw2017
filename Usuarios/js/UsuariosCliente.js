//comentario
function comprobarSession(){
	$.ajax({
		url: 'usuarios/php/clase_sessiones.php',
		type: 'POST',
		DataType:'Json',		
		success: function(data){ 
		
		var liLogueo = $("#liLogueo");
                
                var liRegistro = $("#liRegistro");
		if (data.usuario==""){
				liLogueo.removeClass("ocultar");
                liLogueo.addClass("mostrar");
				liRegistro.removeClass("ocultar");
                liRegistro.addClass("mostrar");
				$('#botonreserva').removeClass("mostrar")
				$('#botonreserva').addClass("oculto")
				$('#nuevocomentario').removeClass("mostrar")
				$('#nuevocomentario').addClass("oculto")
				$('#botonPerfil').removeClass("mostrar")
				$('#botonPerfil').addClass("oculto")
			
		}else{
			
			
                var botonAdmin = $("#botonAdmin");
                var desconectar = $("#desc");
                
                var nickLogueado = $("#nickLogueado");
                
                var nickResultado = data.usuario;
                var correoResultado = data.correo;
                var perfilResultado = data.perfil;
                
                if(data.perfil == "administrador") {
                nickLogueado.html(nickResultado);    
                    
                botonAdmin.removeClass("ocultar");
                botonAdmin.addClass("mostrar");
                    
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                    
                
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                  $('#botonPerfil').removeClass("oculto")
				$('#botonPerfil').addClass("mostrar")  
               
                    
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar");    
                    
                }else if(data.perfil == "guia" ) {
                 nickLogueado.html(nickResultado); 
                 botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");  
                   
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                    
               $('#botonPerfil').removeClass("oculto")
				$('#botonPerfil').addClass("mostrar")  
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                    $('#opciones_guias').removeClass("oculto")	
	$('#opciones_guias').addClass("mostrar")
               
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar"); 
                    
                }else {
                 nickLogueado.html(nickResultado); 
                 botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");
                    
                liLogueo.removeClass("mostrar");
                liLogueo.addClass("ocultar");
                  $('#botonPerfil').removeClass("oculto")
				$('#botonPerfil').addClass("mostrar")    
                 
                
                liRegistro.removeClass("mostrar");
                liRegistro.addClass("ocultar");
                    
               
                    
                desconectar.removeClass("ocultar");
                desconectar.addClass("mostrar"); 
                
                }
		}
			
		}
	})
}
$(document).ready(function() {

	comprobarSession()
	$('#close3').click(cerrarAlerta);
    $('#loguearse').on('click',function() {

        var nick = $(this).parent().parent().children().children("#usuario").val();
        var password = $(this).parent().parent().children().children("#passwd").val();
        
        var enviarAjax = {"nick":nick,"passwd":password};
        
         $.ajax({
            data:  enviarAjax,
            url:   'Usuarios/php/loguearCliente.php',
            type:  'post',
             
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
				
				if(response.mensaje=='La password introducida no es correcta'){
					alerta("Contraseña incorrecta")
					
				}else if(response.mensaje=='El nick no es correcto'){
					alerta("No existe Nick")
					
				}else{
					
					var liLogueo = $("#liLogueo");
				   
					var liRegistro = $("#liRegistro");
				   
					var botonAdmin = $("#botonAdmin");
					var desconectar = $("#desc");
					$('#botonreserva').removeClass("oculto")
					$('#botonreserva').addClass("mostrar")
					$('#nuevocomentario').removeClass("oculto")
						$('#nuevocomentario').addClass("mostrar")
						$('#botonPerfil').removeClass("oculto")
					$('#botonPerfil').addClass("mostrar")  
					var nickLogueado = $("#nickLogueado");
					
					var nickResultado = response.nick;
					var correoResultado = response.correo;
					var perfilResultado = response.perfil;
					
					if(perfilResultado == "administrador") {
					nickLogueado.html(nickResultado);    
						
					botonAdmin.removeClass("ocultar");
					botonAdmin.addClass("mostrar");
						
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
					$('#botonreserva').removeClass("oculto")
					$('#botonreserva').addClass("mostrar")
						$('#nuevocomentario').removeClass("oculto")
						$('#nuevocomentario').addClass("mostrar")
				   
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
				   
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar");    
						
					}else if(perfilResultado == "guia") {
					 nickLogueado.html(nickResultado); 
					 botonAdmin.removeClass("mostrar");
					botonAdmin.addClass("ocultar");  
					$('#botonreserva').removeClass("oculto")
					$('#botonreserva').addClass("mostrar")
					   $('#nuevocomentario').removeClass("oculto")
						$('#nuevocomentario').addClass("mostrar")
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
						
				   $('#opciones_guias').removeClass("oculto")	
	$('#opciones_guias').addClass("mostrar")
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
				  
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar"); 
						
					}else {
					 nickLogueado.html(nickResultado); 
					 botonAdmin.removeClass("mostrar");
					botonAdmin.addClass("ocultar");
						
					liLogueo.removeClass("mostrar");
					liLogueo.addClass("ocultar");
					$('#botonreserva').removeClass("mostrar")
					$('#botonreserva').addClass("oculto")
						$('#nuevocomentario').removeClass("mostrar")
						$('#nuevocomentario').addClass("oculto")
					
					
					liRegistro.removeClass("mostrar");
					liRegistro.addClass("ocultar");
						
				  
						
					desconectar.removeClass("ocultar");
					desconectar.addClass("mostrar"); 
					
					
					}
				}
                comprobarSession()
            }
            
            
        });


    });



    $('#insertar').on('click',function() {    

	var nick = $(this).parent().parent().children().children("#usuario").val();
		var correo = $(this).parent().parent().children().children("#correo").val();
		var nombre = $(this).parent().parent().children().children("#nombre").val();
		var apellidos = $(this).parent().parent().children().children("#apellidos").val();
		var fecna = $(this).parent().parent().children().children("#fecna").val();
		var telefono = $(this).parent().parent().children().children("#telefono").val();
		var perfil = $(this).parent().parent().children().children("#perfil").val();
		var dni = $(this).parent().parent().children().children("#dni").val();
		var password = $(this).parent().parent().children().children("#passwd").val();
		var datos={
			usuario:nick,
			correo:correo,
			dni:dni
		}
		$.ajax({
			data:  datos,
            url:   'Usuarios/php/comprobarNick.php',
            type:  'post',
            dataType: 'Json',            
            success:  function (response) {				
				
				if(response== 0){			

					var enviarAjax = {"nick":nick,"correo":correo,"dni":dni,"nombre":nombre,"apellidos":apellidos,"fecna":fecna,"telefono":telefono,"perfil":perfil,"password":password};
					var validoMail=comprobarMail(correo)
					var validoTelefono=validarTelefono(telefono)
					var validoDNI = nif(dni)						
					var validoFecha = validarFormatoFecha(fecna)
					var validoNombre= validarCadena(nombre)
					var validoApellidos = validarCadena(apellidos)
					
					if ((validoMail + validoTelefono + validoDNI + validoFecha + validoNombre + validoApellidos) == 6){
						$.ajax({
						data:  enviarAjax,
						url:   'Usuarios/php/insertarCliente.php',
						type:  'post',
						dataType: 'Json',
						beforeSend: function () {
							$("#resultado").html("Procesando, espere por favor...");
						},
						success:  function (response) {				
							ocultarTrasLogueo(response.nick,response.correo,response.perfil)               				
							comprobarSession()
						}
						
						
					});
					}else{
						if (validoMail == 0){
							alerta("El Email no es correcto")
						}else if(validoTelefono == 0){
							alerta("El Número de teléfono no es correcto")
						}else if(validoDNI == 0){
							alerta("El DNI No es correcto")
						}else if(validoFecha == 0){
							alerta("La fecha de nacimiento no es correcta")
						}else if(validoNombre == 0){
							alerta("El nombre contiene un caracter no valido")
						}else if(validoApellidos == 0){
							alerta("El Apellido contiene un caracter no valido")
						}
					}
					
					
				}else{
					if(response==1){
						alerta('El Usuario ya Existe')
					}else if(response==2){
						alerta('El Correo ya Existe')
					}else{
						alerta('El DNI ya Existe')
					}
					
				}
            }
		})

        

    }); 
    $('#desconectar').on('click',function() {
       
        
      
        
        $.ajax({
           
            url:   'Usuarios/php/desconectarCliente.php',
            type:  'post',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                
                 var liLogueo = $("#liLogueo");
               
                var liRegistro = $("#liRegistro");
               
                var botonAdmin = $("#botonAdmin");
                var desconectar = $("#desc");
				$('#botonreserva').removeClass("mostrar")
				$('#botonreserva').addClass("oculto")
                $('#nuevocomentario').removeClass("mostrar")
				$('#nuevocomentario').addClass("oculto")
				$('#botonPerfil').removeClass("mostrar")
				$('#botonPerfil').addClass("oculto")  
                botonAdmin.removeClass("mostrar");
                botonAdmin.addClass("ocultar");
                    
                liLogueo.removeClass("ocultar");
                liLogueo.addClass("mostrar");
                $('#botonPerfil').removeClass("mostrar")
				$('#botonPerfil').addClass("oculto")    
                
                
                liRegistro.removeClass("ocultar");
                liRegistro.addClass("mostrar");
                    
               $('#opciones_guias').removeClass("mostrar")	
	$('#opciones_guias').addClass("oculto")
                    
                desconectar.removeClass("mostrar");
                desconectar.addClass("ocultar"); 
				redireccionar()
            }
            
            
        });
        
    });

});

function ocultarTrasLogueo(nickResultado,correoResultado,perfilResultado){
	
	var liLogueo = $("#liLogueo");
	
	var liRegistro = $("#liRegistro");
	
	var botonAdmin = $("#botonAdmin");
	var desconectar = $("#desc");
	
	var nickLogueado = $("#nickLogueado");	
	
	if(perfilResultado == "administrador") {
	nickLogueado.html(nickResultado);    
		
	botonAdmin.removeClass("ocultar");
	botonAdmin.addClass("mostrar");
		
	liLogueo.removeClass("mostrar");
	liLogueo.addClass("ocultar");
	$('#botonreserva').removeClass("oculto")
				$('#botonreserva').addClass("mostrar")
	$('#nuevocomentario').removeClass("oculto")
	$('#nuevocomentario').addClass("mostrar")
	$('#botonPerfil').removeClass("oculto")
				$('#botonPerfil').addClass("mostrar")  
	liRegistro.removeClass("mostrar");
	liRegistro.addClass("ocultar");
		

		
	desconectar.removeClass("ocultar");
	desconectar.addClass("mostrar");    
		
	}else if(perfilResultado == "guia") {
	 
	 botonAdmin.removeClass("mostrar");
	botonAdmin.addClass("ocultar"); 
$('#botonreserva').removeClass("oculto")
				$('#botonreserva').addClass("mostrar")	
	   $('#nuevocomentario').removeClass("oculto")
		$('#nuevocomentario').addClass("mostrar")
	liLogueo.removeClass("mostrar");
	liLogueo.addClass("ocultar");
		
	
	liRegistro.removeClass("mostrar");
	liRegistro.addClass("ocultar");
		
	$('#opciones_guias').removeClass("oculto")	
	$('#opciones_guias').addClass("mostrar")
		
	desconectar.removeClass("ocultar");
	desconectar.addClass("mostrar"); 
		
	}else {
	 nickLogueado.html(nickResultado); 
	 botonAdmin.removeClass("mostrar");
	botonAdmin.addClass("ocultar");
		
	liLogueo.removeClass("mostrar");
	liLogueo.addClass("ocultar");
	$('#botonreserva').removeClass("oculto")
				$('#botonreserva').addClass("mostrar")
		$('#nuevocomentario').removeClass("oculto")
		$('#nuevocomentario').addClass("mostrar")
	
	liRegistro.removeClass("mostrar");
	liRegistro.addClass("ocultar");
	
		
	desconectar.removeClass("ocultar");
	desconectar.addClass("mostrar"); 
	comprobarSession()
	}
}
                
function comprobarMail(email){
	var resultado=""
	 emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
	if (emailRegex.test(email)) {
		resultado = 1;
    } else {
		resultado = 0;
    }	
	return resultado
	
}       
     
function validarTelefono(telefono){
	  var resultado = 0
	  var expresionRegular1=/^[0-9]{9}$/;//<--- con esto vamos a validar el numero
	  var expresionRegular2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco
	 
	  if(telefono==''){
		  
			resultado = 0
		}
	  else if(expresionRegular2.test(telefono)){	
	  
			resultado = 0
		}
	  else if(expresionRegular1.test(telefono)){
		  
		  if(telefono.length== 9){
			  resultado = 1
		  }else{
			  resultado = 0
		  }
		  
	  }	
		return resultado
}

function nif(dni) {
  var numero
  var letr
  var letra
  var expresion_regular_dni
 
  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
 
  if(expresion_regular_dni.test (dni) == true){
     numero = dni.substr(0,dni.length-1);
     letr = dni.substr(dni.length-1,1);
     numero = numero % 23;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     letra=letra.substring(numero,numero+1);
    //if (letra!=letr.toUpperCase()) {
       //return 0;
     //}else{
       return 1
    //}
  }else{
     return 0
   }
}

function validarFormatoFecha(campo) {
      var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if ((campo.match(RegExPattern)) && (campo!='')) {
            return 1;
      } else {
            return 0;
      }
}

function validarCadena(cadena){
	var regexpNombre=/^[A-Za-zƒŠŒŽšœžŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèé êëìíîïðñòóôõöøùúûüýþÿ]*$/;
	if (regexpNombre.test(cadena)){
		return 1
	}else{
		return 0
	}
}

function alerta(mensaje){
$('#alerta').html(mensaje)	
	type = $(this).attr('data-type');	
	$('.overlay-container3').fadeIn(function() {		
		window.setTimeout(function(){
			$('.window-container3.zoomin').addClass('window-container-visible3');
		}, 100);
		
	});
}

function cerrarAlerta(){
	$('#alerta').val("")
	$('.overlay-container3').fadeOut().end().find('.window-container3').removeClass('window-container-visible3');
}

function redireccionar(){
	window.location="index.html";
}

