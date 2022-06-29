<?php 
require_once('../getRoot.php');
require_once(ROOTPATH.'/model/database.php');

// Create object to use database
$database = new DataBase();

/** JDRS 
 * execute script.php in index.html with POST method
 * if user try to execute without he is redirect in main page
*/

if(isset($_POST['need'])) {
    if($_POST['need'] == "makeid"){
        $url = $_POST['url'];

        if(filter_var($url, FILTER_VALIDATE_URL)){
            $checklink = $database->checkURL($url);

            if(!empty($checklink)){
                echo $checklink['IDLINK'];
            }else{

                do{
                    $id = makeID(6);
                    $result = $database->checkID($id);
                }while(!empty($result));

                if(empty($result)){
                    $database->insertLink($id, $url);
                    echo $id;
                }
            }
        }else{
            echo FALSE;
        }
    }
    if($_POST['need'] == "count"){
        echo $database->getCountLink();
    }
}else{
    header('Location: https://short.aroz.be/');
}

function makeID($lentgh){
    $results = "";
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    $charactersLength = strlen($characters);
    for($i = 0; $i < $lentgh; $i++){
        $results .= $characters[rand(0,$charactersLength)];
    }
    return $results;
}
?>