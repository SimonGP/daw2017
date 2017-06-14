<?php
include("mpdf/mpdf.php");
include "clase_reservas.php";

$reservas = array();

class mostrarReserva {
    public $idReservas = "";
    public $fecha = "";
    public $nombreRuta = "";
    public $personas = "";
	public $direccion ="";
    
    function __construct($idReservas,$fecha,$nombreRuta,$personas,$direccion) {
        $this->idReservas = $idReservas;
        $this->fecha = $fecha;
        $this->nombreRuta = $nombreRuta;
        $this->personas = $personas;
		$this->direccion=$direccion;
    }
}


$ruta="";
$fecha="";
$envio=$_POST['datos'];
$dividir=explode("/",$envio);


$ruta=$dividir[0];
$fecha=$dividir[1];
$imprimir="
<style>
#izquierda{
font-size:20px;
color:green;
float:left;
}
#derecha{
position:relative;
left:5px;
top:5px;
}
p{
width:45%;
display:inline;
}
</style><h3>Inscritos</h3>";

$cabecera="<html><body><span id='izquierda'>".$ruta."</span> / <span id='derecha'>".$fecha."</span>";
$array=array("@","</p>#<p>");
$enlace = new reservas(); 
$visualizar = $enlace->TodasReservasImprimir($ruta, $fecha);

    while($fila = $visualizar->fetch_assoc()) {
        $idReservas = $fila['ID'];
        $fecha = $fila['FECHA'];
        $nombreRuta = $fila['RUTAS'];		 
        $personas = str_replace($array,"",$fila['PERSONAS']);
		$imprimir.=$personas;
		
		$objeto = new mostrarReserva($idReservas,$fecha,$nombreRuta,$fila['PERSONAS'],"rutas/reservas/".$ruta.".pdf");        
        array_push($reservas,$objeto);

	}	
	$footer="</body></html>";

$mpdf=new mPDF();
$mpdf->SetHTMLHeader($cabecera);
$mpdf->WriteHTML($imprimir);
$mpdf->SetHTMLFooter($footer);
$direccion='../reservas/'.$ruta.'.pdf';
$mpdf->Output($direccion,'F');

header('Content-type: application/json; charset=UTF-8');
echo json_encode($reservas);
    



?>

