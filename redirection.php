<?php
    if(isset($_GET['redirect'])){
        require_once('getRoot.php');
        require_once('model/database.php');

        $id = $_GET['redirect'];

        $database = new DataBase();
        $result = $database->checkID($id);

        if(!empty($result) && filter_var($result['LINK'], FILTER_VALIDATE_URL)){
            header('Location: ' . $result['LINK']);
        }else{
            header('Location: https://short.aroz.be/');
        }
    }else{
        header('Location: https://short.aroz.be/');
    }
?>