<?php 
class DataBase {

    /**
     * Objet PDO
     * 
     * @var PDO
     */
    private $db;

    /**
     * Récupération de la connexion PDO
     */
    public function __construct() {
        $config = require(ROOTPATH."/config/dbConfig.php");
        $this->db = new PDO("mysql:host=".$config["HOST"].";port=".$config["PORT"].";dbname=".$config["DATABASE"], $config["USER"], $config["PASSWORD"]);
        $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
    }

    /**
     * Retourne la connexion PDO
     * 
     * @return PDO
     */
    public function getPDO() {
        return $this->db;
    }
    
    /**
     * Return number of link created
     * 
     * @return countLink
     */
    public function getCountLink(){ 
        $req = $this->db->prepare("SELECT COUNT(*) as total FROM link");
        $req->execute();
    
        $result = $req->fetch(PDO::FETCH_ASSOC);
        
        return $result['total'];
    } 

    /**
     * Return dataLink if ID is on database
     * 
     * @return dataLink
     */
    public function checkID($id){
        $req = $this->db->prepare("SELECT * FROM link WHERE IDLINK = :IDLINK");
        $req->bindValue(":IDLINK", $id, PDO::PARAM_STR);
        $req->execute();

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Return dataLink if url is on database
     * 
     * @return dataLink
     */
    public function checkURL($url){
        $req = $this->db->prepare("SELECT * FROM link WHERE LINK = :LINK");
        $req->bindValue(":LINK", $url, PDO::PARAM_STR);
        $req->execute();

        return $req->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Insert data about Link in database
     * 
     */
    public function insertLink($id, $url){
        $req = $this->db->prepare("INSERT INTO link (IDLINK, LINK) VALUES (:IDLINK, :LINK)");
        $req->bindValue(":IDLINK", $id, PDO::PARAM_STR);
        $req->bindValue(":LINK", $url, PDO::PARAM_STR);
        $req->execute();
    }
}
?>