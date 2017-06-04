<?php

include ('clase_historial.php');

$enlace = new historial();
$super=array();


$contador = 1;
	$fichero = file("historial.TXT");
	foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->nuevoHistorial($fila[0],$fila[1],$fila[2],$fila[3]);
		echo $resultado;
	}
//$fichero = file("corredores.txt");
/*
foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->insertarRegiones($fila[0],$fila[1]);
		echo $resultado;
}*/
/*
foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->insertarPaises($fila[0],$fila[1],$fila[2]);
		echo $resultado;
}*/

/*
$fichero = file("ESPECIALIDADES.txt");
foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->insertarEspecialidad($fila[0],$fila[1]);
		echo $resultado;
	}*/
	/*
$contador=1;
$fichero = file("equipos.txt");
foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->insertarEquipo($fila[1],$fila[3]);
		echo $resultado;
	}	*//*
$contador = 1;
	$fichero = file("CICLISTAS.TXT");
	foreach($fichero as $num_linea){
		$contador=$contador + 1;
		$fila=explode("#",$num_linea);
		echo $contador;
		print_r($fila);
		$resultado=$enlace->insertarNuevoCorredor($fila[0],$fila[2],$fila[1],$fila[2]." ".$fila[1],$fila[4],$fila[5],$fila[7],$fila[8],$fila[9],$fila[10],$fila[11],$fila[12],$fila[13],$fila[14],$fila[15],$fila[16],$fila[17],$fila[18],$fila[19],$fila[20],$fila[21],$fila[22]);
		echo $resultado;
	}
	
	*/
/*$super2=array();
$contador2 = 1;
	$fichero2 = file("contratos.txt");
	foreach($fichero2 as $num_linea){
		$contador2=$contador2 + 1;
		$fila2=explode("#",$num_linea);
		echo $contador2;
		print_r($fila2);
		$resultado=$enlace->insertarContrato($fila2[0],$fila2[1],$fila2[2]);
		echo $resultado;
	}*/
	
	
?>
