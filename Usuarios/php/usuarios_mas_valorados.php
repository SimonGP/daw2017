<?php
	require_once('clase_usuarios.php');
    $datos = array();
class datos  {
         
        public $usuario = "";
        public $km = "";
        
         
         function __construct($usuario, $km) {
             
             $this->usuario = $usuario;
             $this->km = $km;
             
         }
         
     }

	
	
	$enlace = new usuarios();
	$resultado = $enlace->masValorados();

while($fila = $resultado->fetch_assoc()) {
        $enlace = new datos($fila['usuario'], $fila['km']);
        
        array_push($datos,$enlace);
}	


	
	header('Content-Type: application/json');
	echo json_encode($datos);
	
?>
