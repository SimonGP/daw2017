<?php
//comprobamos que sea una petición ajax
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
{
 
    //obtenemos el archivo a subir
    $file = $_FILES['archivo']['name'];
 
    //comprobamos si existe un directorio para subir el archivo
    //si no es así, lo creamos
    if(!is_dir("../pdf/")) 
	{
        mkdir("../pdf/");
	}
	$directorio=$file;
        
    //comprobamos si el archivo ha subido
    if ($file && move_uploaded_file($_FILES['archivo']['tmp_name'],"../pdf/".$directorio))
    {
      if(!empty($directorio)){
			 echo $directorio;//devolvemos el nombre del archivo para pintar la imagen
	  }else{
			echo "Sin fichero";
	  }
      
    }else{
		echo "Sin Fichero";
	}
}else{
    echo "no es un Ajax";  
	
}