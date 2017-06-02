<?php
include "clase_usuarios.php";
$comprobar = true;

class ObjetoLoguin {
    public $nick = "";
    public $correo = "";
    public $perfil = "";
    
    
        function __construct($nick,$correo,$perfil) {
            $this->nick = $nick;
            $this->correo = $correo;
            $this->perfil = $perfil;
        }
    
        
}


$nick = $_REQUEST['nick'];
$correo = $_REQUEST['correo'];
$dni = $_REQUEST['dni'];
$nombre = $_REQUEST['nombre'];
$apellidos = $_REQUEST['apellidos'];
$fecna = $_REQUEST['fecna'];
$telefono = $_REQUEST['telefono'];
$perfil = $_REQUEST['perfil'];
$password = md5($_REQUEST['password']);



$enlace = new Usuarios(); 
$resultado=$enlace->nuevoUsuario($nick,$correo,$dni,$nombre,$apellidos,$fecna,$telefono,$perfil,$password);

if($resultado=="True"){	
	$resultado = $enlace->comprobarLogueo($nick,$password);   
	session_start();
		$_SESSION['ID']=$resultado[9];
        $_SESSION['nick'] = $resultado[0];
        $_SESSION['Correo'] = $resultado[2];
        $_SESSION['PerfilUsuario'] = $resultado[8];
		$_SESSION['dni']=$resultado[4];
		$_SESSION['nombre']=$resultado[5];
		$_SESSION['apellidos']=$resultado[3];
		$_SESSION['telefono']=$resultado[6];
		$_SESSION['fecna']=$resultado[7];          
}
$response = new ObjetoLoguin($_SESSION["nick"],$_SESSION["Correo"],$_SESSION["PerfilUsuario"]);
 header('Content-type: application/json');
        echo(json_encode($response));

?>