<?php
	$inData = getRequestInfo();

	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$id = $inData["id"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName=? AND LastName=? AND ID=?");
                $stmt->bind_param("ssi", $firstname, $lastname, $id);
                $stmt->execute();
                $result = $stmt->get_result();
		returnWithError("Successfully deleted {$firstname} {$lastname} from Contacts");
		$stmt->close();
		$conn->close();
	}

        function getRequestInfo() 
        { 
                return json_decode(file_get_contents('php://input'), true); 
        } 
 
        function sendResultInfoAsJson( $obj ) 
        { 
                header('Content-type: application/json'); 
                echo $obj; 
        } 
         
        function returnWithError( $err ) 
        { 
                $retValue = '{"error":"' . $err . '"}'; 
                sendResultInfoAsJson( $retValue ); 
        } 
         
        function returnWithInfo( $firstName, $lastName, $id ) 
        { 
                $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}'; 
                sendResultInfoAsJson( $retValue ); 
        }
?>
