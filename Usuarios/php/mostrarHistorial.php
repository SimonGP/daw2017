<?php
session_start();
include "clase_historial.php";

$reservas = array();

class mostrarReserva {
    public $idReservas = "";
    public $nombreRuta = "";
	public $valor = "";
 
    
    function __construct($idReservas,$nombreRuta, $valor) {
        $this->idReservas = $idReservas;
        $this->nombreRuta = $nombreRuta;
		$this->valor = $valor;
		
 
    }
}

$enlace = new Historial(); 
$visualizar = $enlace->seleccionarUnHistorial($_SESSION['ID']);

if(empty($visualizar)) {
    $respuestaNegativa = 0;
    echo $respuestaNegativa;
    
}else {
    
    while($fila = $visualizar->fetch_assoc()) {
        $idReservas = $fila['ID'];       
        $nombreRuta = $fila['RUTAS']; 
		$valor = $fila['valor']; 
        
        $objeto = new mostrarReserva($idReservas,$nombreRuta,$valor);
        
        array_push($reservas,$objeto);
        
    }
    
    header('Content-type: application/json; charset=UTF-8');
	echo json_encode($reservas);
    
}


?>