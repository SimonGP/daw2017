<?php

include "clase_reservas.php";

$reservas = array();

class mostrarReserva {
    public $km = "";
    public $fecha = "";
    public $nombreRuta = "";
    public $personas = "";
	public $nick="";
	
    
    function __construct($km,$fecha,$nombreRuta,$personas,$nick) {
        $this->km = $km;
        $this->fecha = $fecha;
        $this->nombreRuta = $nombreRuta;
        $this->personas = $personas;
		$this->nick=$nick;
		
    }
}
/*

$ruta=$_POST['ruta'];
$fecha=$_POST['fecha'];*/
$envio=$_POST['datos'];
$dividir=explode("/",$envio);


$ruta=$dividir[0];
$fecha=$dividir[1];


$enlace = new reservas(); 
$visualizar = $enlace->pasarAHistorial($ruta, $fecha);
$contador = 1;

    while($fila = $visualizar->fetch_assoc()) {
        $km = $fila['KM'];
        $fecha = $fila['FECHA'];
        $nombreRuta = $fila['RUTAS'];
		$persona=$fila['PERSONAS'];		
		$nick = $fila['ID'];
		$objeto = new mostrarReserva($km,$fecha,$nombreRuta,$persona,$nick);        
        array_push($reservas,$objeto);
        
		
		

	}	


header('Content-type: application/json; charset=UTF-8');
echo json_encode($reservas);
    



?>
