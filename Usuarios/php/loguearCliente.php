<?php

include "clase_usuarios.php";

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
$password = md5($_REQUEST['passwd']);


$loguear = new Usuarios();

$resultado = $loguear->comprobarLogueo($nick,$password);

if($resultado == 0) {
    $respuestaNegativa = ["El nickname no existe"];
    echo(json_encode($respuestaNegativa));
    
}else {
    if($nick == $resultado[0] && $password == $resultado[1]) {
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
        
        $respuesta = new ObjetoLoguin($_SESSION["nick"],$_SESSION["Correo"],$_SESSION["PerfilUsuario"]);
        header('Content-type: application/json');
        echo(json_encode($respuesta));
        
    }else {
        $respuestaNegativa = ["La password introducida no es correcta"];
        echo(json_encode($respuestaNegativa));
    }
}







?>