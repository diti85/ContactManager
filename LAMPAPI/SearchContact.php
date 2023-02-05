<?php

	$inData = getRequestInfo();
	$fullname = explode(" ", $inData["fullname"], 2);
	$firstname = $fullname[0];
	$lastname = $fullname[1];
	$userid = $inData["userid"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName,PhoneNumber,Email,Address FROM Contacts WHERE FirstName=? AND LastName=? AND UserID=?");
		$stmt->bind_param("ssi", $firstname, $lastname, $userid);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['FirstName'], $row['LastName'], $row['PhoneNumber'], $row['Email'], $row['Address']);
		}
		else
		{
			returnWithError("No Records Found");
		}

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
		$retValue = '{"id":0,"FirstName":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $phoneNumber, $email, $address)
	{
		$retValue = '{"FirstName":"' . $firstName . '","LastName":"' . $lastName . '","Phone Number":"' . $phoneNumber . '","Email":"' . $email . '","Address":"' . $address . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
