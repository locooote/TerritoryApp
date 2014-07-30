<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends CI_Controller {

	public $db;
	
	public function index()
	{
		$method = $_SERVER['REQUEST_METHOD'];
		switch ($method) {
			case 'PUT':
				// HTTP request methods, PUT and DELETE are not supported by all browsers.
				break;
			case 'POST':
							
				$this->load_db();
				$table = $this->input->post('module');
				$column = $this->input->post('column');
				$id = $this->input->post('id');
 				
				// CREATE
				if($this->input->post('add')) {
                    $data = array();
                    $columns = explode(',',$column);
					if($columns) 
                        foreach($columns as $field) 
						  if($this->input->post(trim($field)))
                            $data[$field] = $this->input->post(trim($field));
                    // insert  data
				    $this->db->insert($table, $data);
                    
                    // addresses
				    if($table=='addresses') {
                        $address_id = $this->db->insert_id();
                        $date = array(
                            'date' => $this->input->post('date'),
                            'address_id' => $address_id
                        );
                        if($this->input->post('notes')) 
                            $date['notes'] = $this->input->post('notes');				                // insert publisher data
					    $this->db->insert('dates', $date);          
                    }
                    /*
					// the publisher
                    if($table=='publishers') {
                        $publisher = array(
                            'firstName' => $this->input->post('firstName'),
                            'lastName' => $this->input->post('lastName')
                        );
					   // insert publisher data
					   $this->db->insert('publishers', $publisher);
                    }
                    */
				}
				// READ
				else if($this->input->post('view')) {
  					$result = $this->mysqlite->db_read("SELECT $column FROM $table");
					$return = array();
					foreach ($result as $row)
					{
					  	// publishers
						if($table=='publishers') {					
 							$row['territories'] = json_decode('['.$row['territories'].']');
							$return[] = $row;
						}
						// territories
						if($table=='territories') {
							// addresses
							$addresses = array();					
							$addresses_fetch = $this->mysqlite->db_read("SELECT * FROM addresses WHERE territory_id = '".$row['id']."'");
							foreach ($addresses_fetch as $address)
							{									
								// dates
								$dates = array();
								$dates_fetch = $this->mysqlite->db_read("SELECT * FROM dates WHERE address_id = '".$address['id']."'");
								foreach ($dates_fetch as $date)
								{	
									$dates[] = $date;
								}
								$address['dates'] = $dates;
								$addresses[] = $address;
							}
							$row['addresses'] = $addresses;
							$return[] = $row;		
						}
					}
					// var_dump($return); exit;
					// Output
					header('Content-Type: application/json');
					echo json_encode( $return );
					
				}
				// UPDATE
				else if($this->input->post('edit') && $id) {
					$set = '';
					$columns = explode(',',$column);
					if($columns) foreach($columns as $field) 
						// if( $this->input->post(trim($field)) ) 
                        $set .= ($set?',':''). " $field = '".$this->input->post(trim($field))."'";
					$result = $this->mysqlite->db_query("UPDATE $table SET $set WHERE id = ".$id);
					var_dump( $result );
				}
				// DELETE 
				else if($this->input->post('delete') && $id) {
					$result = $this->mysqlite->db_query("DELETE FROM $table  WHERE id = ".$id);
					var_dump( $result );
                    // addresses
				    if($table=='addresses') {
                        $result = $this->mysqlite->db_query("DELETE FROM dates WHERE address_id = ".$id);
					   var_dump( $result );          
                    }
				}
				break;
			case 'GET':
 				$this->view();
				break;
			case 'DELETE':
				// HTTP request methods, PUT and DELETE are not supported by all browsers.
				break;
			default:
				$this->view();
		    break;
		}
 
 	}
	
	function load_db() {
		// CI PDO SQLite doesn't work, made a library
		$this->load->library('mysqlite');
		$this->db = $this->mysqlite->db;
	}
	
	function view() {	
		$this->load->view('api_view');
	}
}
