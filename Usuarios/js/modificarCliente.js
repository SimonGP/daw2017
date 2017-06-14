$(document).ready(function() {
     $('#modificar').on('click',function() {
          var nick = $(this).parent().parent().children().children("#usuario").val();
        
        var correo = $(this).parent().parent().children().children("#correo").val();

        var nombre = $(this).parent().parent().children().children("#nombre").val();

        var apellidos = $(this).parent().parent().children().children("#apellidos").val();

        var fecna = $(this).parent().parent().children().children("#fecna").val();

        var telefono = $(this).parent().parent().children().children("#telefono").val();

        var dni = $(this).parent().parent().children().children("#dni").val();

        var password = $(this).parent().parent().children().children("#passwd").val();
         
         var nuevaPassword = $(this).parent().parent().children().children("#nuevaPassword").val();
         
          var enviarAjax = {"nick":nick,"correo":correo,"dni":dni,"nombre":nombre,"apellidos":apellidos,"fecna":fecna,"telefono":telefono,"password":password,"nuevaPassword":nuevaPassword};
        
         $.ajax({
            data:  enviarAjax,
            url:   'Usuarios/php/modificarCliente.php',
            type:  'post',
            dataType: 'Json',
            beforeSend: function () {
                $("#resultado").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                $("#resultado").html(response);
            }
            
            
        });
     });
});