const urlBase = 'http://my-contacts.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
           console.log("Incorrect Login");
					return;
				}
		    document.getElementById("loginResult").innerHTML = "Success";
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignUp() {
	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
  
	let username = document.getElementById("userName").value;
	let password = document.getElementById("password").value;
	console.log(firstName)
	console.log(lastName)
	console.log(username)
	console.log(password)
	//var hash = md5(password);
	let tmp = {
	  firstname: firstName,
	  lastname: lastName,
	  login: username,
	  password: password,
	};
  
	let jsonPayload = JSON.stringify(tmp);
  
	let url = urlBase + "/Register." + extension;
  
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  
	try {
	  xhr.onreadystatechange = function () {
		if (this.readyState != 4) {
		  return;
		}
  
		if (this.status == 409) {
		  document.getElementById("signupResult").innerHTML =
			"User already exists";
		  return;
		}
  
		if (this.status == 200) {
		  let jsonObject = JSON.parse(xhr.responseText);
		  userId = jsonObject.id;
		  document.getElementById("signupResult").innerHTML = "User added";
		  firstName = jsonObject.firstName;
		  lastName = jsonObject.lastName;
		  saveCookie();
		}
	  };
  
	  xhr.send(jsonPayload);
	} catch (err) {
	  document.getElementById("signupResult").innerHTML = err.message;
	}
}
  
function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		// window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function delCon(con) {
	var fName = document.sample.fName.value;
	var lName = document.sample.lName.value;

	var s = con.parentNode.parentNode;
	s.parentNode.removeChild(s);
}
  
function UpCon(con) {
	var fName = document.sample.fName.value;
	var lName = document.sample.lName.value;
	var phNumber = document.sample.phNumber.value;
	var email = document.sample.email.value;
	var address = document.sample.address.value;
  
	var s = con.parentNode.parentNode;
	var tr = document.createElement("tr");
  
	var td1 = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	var td3 = tr.appendChild(document.createElement("td"));
	var td4 = tr.appendChild(document.createElement("td"));
	var td5 = tr.appendChild(document.createElement("td"));
	var td6 = tr.appendChild(document.createElement("td"));
	var td7 = tr.appendChild(document.createElement("td"));
  
	td1.innerHTML = '<input type="text" name="fName1">';
	td2.innerHTML = '<input type="text" name="lame1">';
	td3.innerHTML = '<input type="text" name="phNumber1">';
	td4.innerHTML = '<input type="text" name="email1">';
	td5.innerHTML = '<input type="text" name="address1">';
  
	td6.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";
  
	td7.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";
  
	document.getElementById("tbl").replaceChild(tr, s);
}

function changeCon(con) {
	var fName = document.sample.fName1.value;
	var lName = document.sample.lName1.value;
	var phNumber = document.sample.phNumber1.value;
	var email = document.sample.email1.value;
	var address = document.sample.address1.value;
  
	var s = con.parentNode.parentNode;
	var tr = document.createElement("tr");
  
	var td1 = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	var td3 = tr.appendChild(document.createElement("td"));
	var td4 = tr.appendChild(document.createElement("td"));
	var td5 = tr.appendChild(document.createElement("td"));
	var td6 = tr.appendChild(document.createElement("td"));
	var td7 = tr.appendChild(document.createElement("td"));
  
	td1.innerHTML = fName;
	td2.innerHTML = lName;
	td3.innerHTML = phNumber;
	td4.innerHTML = email;
	td5.innerHTML = address;
  
	td6.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";
  
	td7.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";
  
	document.getElementById("tbl").replaceChild(tr, s);
}

function addContact()
{
	readCookie()
	let addFirstname = document.getElementById("firstName").value;
	let addLastname = document.getElementById("lastName").value;
	let addPhone = document.getElementById("phNumber").value;
	let addEmail = document.getElementById("email").value;
	let addAddress = document.getElementById("address").value;
	//document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstname:addFirstname,userid:userId,lastname:addLastname, phone:addPhone, email:addEmail, address:addAddress};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/CreateContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				//document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		//document.getElementById("contactAddResult").innerHTML = err.message;
	}
	var tr = document.createElement("tr");

	var td1 = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	var td3 = tr.appendChild(document.createElement("td"));
	var td4 = tr.appendChild(document.createElement("td"));
	var td5 = tr.appendChild(document.createElement("td"));
	var td6 = tr.appendChild(document.createElement("td"));
	var td7 = tr.appendChild(document.createElement("td"));
  
	td1.innerHTML = addFirstname;
	td2.innerHTML = addLastname;
	td3.innerHTML = addPhone;
	td4.innerHTML = addEmail;
	td5.innerHTML = addAddress;
  
	td6.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";
  
	// td7.innerHTML =
	//   '<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">';
	td7.innerHTML =
	  "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";
	document.getElementById("tbl").appendChild(tr);
	document.getElementById("addMe").reset();
  
	showTable();
}

function searchContactv1()
{
	let srchName = document.getElementById("searchContact").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srchName,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function searchContacts() {
	const content = document.getElementById("searchText").value;
	const selections = content.toUpperCase();
  
	const table = document.getElementById("tbl");
	const tr = table.getElementsByTagName("tr");
	for (let i = 0; i < tr.length; i++) {
	  const fN = tr[i].getElementsByTagName("td")[0];
	  const lN = tr[i].getElementsByTagName("td")[1];
	  const pN = tr[i].getElementsByTagName("td")[2];
	  const email = tr[i].getElementsByTagName("td")[3];
	  const address = tr[i].getElementsByTagName("td")[4];
  
	  if (fN && lN && pN && email && address) {
		const txtValue_fn = fN.textContent || fN.innerText;
		const txtValue_ln = lN.textContent || lN.innerText;
		const txtValue_pn = pN.textContent || pN.innerText;
		const txtValue_email = email.textContent || email.innerHTML;
		const txtValue_address = address.textContent || address.innerHTML;
		tr[i].style.display = "none";
  
		for (let j = 0; j < selections.length; j++) {
		  if (txtValue_fn.toUpperCase().indexOf(selections[j]) > -1) {
			tr[i].style.display = "";
		  }
		  if (txtValue_ln.toUpperCase().indexOf(selections[j]) > -1) {
			tr[i].style.display = "";
		  }
		  if (txtValue_pn.toUpperCase().indexOf(selections[j]) > -1) {
			tr[i].style.display = "";
		  }
  
		  if (txtValue_email.toUpperCase().indexOf(selections[j]) > -1) {
			tr[i].style.display = "";
		  }
		  if (txtValue_address.toUpperCase().indexOf(selections[j]) > -1) {
			tr[i].style.display = "";
		  }
		}
	  }
	}
}

function showTable() {
	var x = document.getElementById("addMe");
	var contacts = document.getElementById("tab");
  
	if (x.style.display === "none") {
	  x.style.display = "block";
	  contacts.style.display = "none";
	} else {
	  x.style.display = "none";
	  contacts.style.display = "flex";
	}
}