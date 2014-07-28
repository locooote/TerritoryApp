<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{

		// CI PDO SQLite doesn't work, made a library
		$this->load->library('mysqlite');
		$db = $this->mysqlite->db;
		
		// the publisher
		$user = array(
		'firstName' => 'Johny',
		'lastName' => 'doe2',
		'territories' => "{ id: '2', terrNumber: 2 },
                { id: '1', terrNumber: 1 }"
		);
		 
		// insert publisher data
		// $db->insert('publishers', $user);
		 
		// get users
		// $result = $db->where('firstName', 'John')->get('publishers');

		// $result = $db->get('publishers');
		
		$query =  "SELECT * FROM publishers";
		
		$result = $this->mysqlite->db_read($query);
		/*
		foreach ($result as $row)
		{
		    var_dump($row);
			echo '<br>';
		}
		*/
		// var_dump($result);
		
		// var_dump($db-> hostname);
		
		$this->load->view('welcome_message');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */