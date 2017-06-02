<?php

session_start();
include "clase_historial.php";
include "../../rutas/php/clase_rutas.php";

$valor=$_POST['valor'];
$id=$_POST['id'];
$ruta=$_POST['id_ruta'];


$enlace = new Historial(); 

$ver = $enlace->guardarValoracion($id, $valor,$ruta);
	while($fila = $ver->fetch_assoc()) {

        $resultado = $fila['valor'];         
    }
	echo $resultado;

$id_ruta = buscarLoc($ruta);

$nuevo = new Rutas();
$resul = $nuevo->nuevaValoracion($resultado, $id_ruta);
echo $resul;

function buscarLoc($local){
	$localidades= array('Abadía','Aldeanueva del Camino','Baños de Montemayor','Gargantilla','Casas del Monte','Segura del Toro','La Garganta','Hervás');
	$resultado=0;
	for ($x=0;$x<count($localidades);$x++){
		
		if($localidades[$x]==$local){
			
			$resultado=$x+1;
		}
	}	
	return $resultado;
}


?>