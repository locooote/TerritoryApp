<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Mysqlite {

	public $db;
	
	public function __construct()
    {
		$CI =& get_instance();
		$CI->load->database();   
		$this->db = $CI->db;     
    }

    public function db_read($query)
    {
		$db_query  = $this->db_query();
		if($db_query && $query) {
			$result = $db_query->query($query);
			return $result->fetchAll(PDO::FETCH_ASSOC);
		}
    }

    public function db_query($query='')
    {
		$db_query  = new PDO($this->db->hostname) or die("cannot open the database");
		if($query) return $db_query->query($query);
		return $db_query;
    }

}

/* End of file Mysqlite.php */