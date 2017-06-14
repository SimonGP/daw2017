$(document).ready(function() {

	mostrar()
     $('#listado_pueblos').change(function() {


        var localidad = $('#listado_pueblos').val();
         
         if(localidad == 'Todos'){
             
             
             mostrar()
         }else{
         
            
        
        var enviarAjax = {pueblo:localidad};
         
         $.ajax({ 
            
            url:'Usuarios/php/mostrarHospedaje.php',
			type:'post',
			data:enviarAjax,
			DataType:'Json',                      
            success:function (data) {
               $("#mostrar").html('')
                var enlace="<table id='tabla-hospe'>"
                enlace+="<tr><th>Nombre</th><th>Localidad</th><th>Descripción</th></tr>"
				for( var x=0;x<data.length;x++){
					enlace+="<tr>"
					enlace+="<td><a href='"+data[x].web+"'>"+data[x].nombre+"</a></td><td>"+data[x].localidad+"</td><td>"+data[x].descripcion+"</td>"
					enlace+="</tr>"
				}
				enlace+="</table>"
                
				$('#mostrar').html(enlace)
            }            
        })
     
}
    }); 
    
    
});


function mostrar(){
	var pueblo=$('#listado_pueblos').val()
	
		datos={
			pueblo:pueblo
		}
		 $.ajax({            
            url:'Usuarios/php/mostrarHospedaje.php',
			type:'post',
			data:datos,
			DataType:'Json',                      
            success:function (data) {
                $("#mostrar").html('')
                var enlace="<table id='tabla-hospe'>"
                enlace+="<tr><th>Nombre</th><th>Localidad</th><th>Descripción</th></tr>"
				for( var x=0;x<data.length;x++){
					enlace+="<tr>"
					enlace+="<td><a href='"+data[x].web+"'>"+data[x].nombre+"</a></td><td>"+data[x].localidad+"</td><td>"+data[x].descripcion+"</td>"
					enlace+="</tr>"
				}
				enlace+="</table>"
				$('#mostrar').html(enlace)
				
            }            
        })		
}
 