<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["firstname"];
	$lastname = $inData["lastname"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$address = $inData["address"];
	$userid = $inData["userid"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT INTO Contacts (FirstName,LastName,PhoneNumber,Email,Address,UserID) VALUES (?,?,?,?,?,?)"); // UserID needs to be actual user ID
		$stmt->bind_param("ssssss", $firstname, $lastname, $phone, $email, $address, $userid);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("Contact Successfully Created");
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
	
?>
