const urlBase = "http://my-contacts.xyz/LAMPAPI";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

// ------------------------ Login Page --------------------------- //
function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
  //	var hash = md5( password );
  if (!login && !password)
  {
    console.log("Empty form fields");
    document.getElementById("loginResult").innerHTML = "Please enter a valid username/password";
    return;
  }
  

  let tmp = { login: login, password: password };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          console.log("Incorrect Login");
          return;
        }
        document.getElementById("loginResult").style.color = "#009345"
        document.getElementById("loginResult").innerHTML = "Success";
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        console.log("Login successful")
        saveCookie();
        window.location.href = "contacts.html"
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doSignUp() {
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  let username = document.getElementById("userName").value;
  let password = document.getElementById("password").value;
  console.log(firstName);
  console.log(lastName);
  console.log(username);
  console.log(password);
  //var hash = md5(password);
  
  // Temporary method of checking if any input fields are empty
  if (!firstName || !lastName || !username || !password)
  {
    document.getElementById("signupResult").innerHTML ="Please enter all required information";
    return;
  }

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
      console.log(this.status);
      if (this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        document.getElementById("signupResult").style.color = "green"
        document.getElementById("signupResult").innerHTML =
          "Successful Sign Up";
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

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    // window.location.href = "index.html";
  } else {
    //document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
  }
}

function checkUsername() {
  let fNameField = document.getElementById("firstName");
  let lNameField = document.getElementById("lastName");
  let userform = document.getElementById("userName");
  let totalform = document.getElementById("wholeForm");
  let numInput = document.getElementById("userNum");
  let lettInput = document.getElementById("userLett");
  let lenInput = document.getElementById("userLen");
  let hypInput = document.getElementById("userHyp");
  let undInput = document.getElementById("userUnd");

  var temp = document.getElementById("checkUser");
  temp.style.display = "block";
  totalform.style.minHeight = "675px";
  //   fNameField.onclick = function () {
  //     totalform.style.minHeight = "360.001px";
  //   };

  //   lNameField.onclick = function () {
  //     totalform.style.minHeight = "360.001px";
  //   };
  //password message displays
  //   var temp = document.getElementById("explanationUser");
  //   if (temp.style.display == "none") {
  //     temp.style.display = "block";
  //     totalform.style.minHeight = "675px";
  //   } else {
  //     temp.style.display = "none";
  //     totalform.style.minHeight = "360px";
  //   }

  userform.onfocus = function () {
    document.getElementById("checkUser").style.display = "block";
    totalform.style.minHeight = "675px";
  };

  //   //password message goes away
  userform.onblur = function () {
    document.getElementById("checkUser").style.display = "none";
    totalform.style.minHeight = "360px";
  };

  userform.onkeyup = function () {
    var nums = /[0-9]/g;
    var lett = /[a-zA-Z0-9]/g;
    var hyp = /[-]/g;
    var und = /[_]/g;

    if (userform.value.length >= 3 && userform.value.length <= 18) {
      lenInput.classList.remove("invalid");
      lenInput.classList.add("valid");
    } else {
      lenInput.classList.remove("valid");
      lenInput.classList.add("invalid");
    }

    // check letters
    if (userform.value.match(lett)) {
      lettInput.classList.remove("invalid");
      lettInput.classList.add("valid");
    } else {
      lettInput.classList.remove("valid");
      lettInput.classList.add("invalid");
    }

    // check numbers
    if (userform.value.match(nums)) {
      numInput.classList.remove("opt");
      numInput.classList.add("valid");
    } else {
      numInput.classList.remove("valid");
      numInput.classList.add("opt");
    }

    // check hyphens
    if (userform.value.match(hyp)) {
      hypInput.classList.remove("opt");
      hypInput.classList.add("valid");
    } else {
      hypInput.classList.remove("valid");
      hypInput.classList.add("opt");
    }

    // check underscores
    if (userform.value.match(und)) {
      undInput.classList.remove("opt");
      undInput.classList.add("valid");
    } else {
      undInput.classList.remove("valid");
      undInput.classList.add("opt");
    }
  };
}

function checkPassword() {
  let passform = document.getElementById("password");
  let pNumInput = document.getElementById("passNum");
  let pLettInput = document.getElementById("passLett");
  let pSpecInput = document.getElementById("passSpec");
  let pLenInput = document.getElementById("passLen");
  let totalform = document.getElementById("wholeForm");
  var temp = document.getElementById("checkPassword");
  temp.style.display = "block";
  totalform.style.minHeight = "570px";

  //password message displays
  passform.onfocus = function () {
    document.getElementById("checkPassword").style.display = "block";
    totalform.style.minHeight = "570px";
  };
  //password message goes away
  passform.onblur = function () {
    document.getElementById("checkPassword").style.display = "none";
    totalform.style.minHeight = "360px";
  };
  //password validation
  passform.onkeyup = function () {
    var nums = /[0-9]/g;
    var lett = /[a-zA-Z]/g;
    var spec = /[!@#$%^&*]/g;
    //check length
    if (passform.value.length >= 8 && passform.value.length <= 32) {
      pLenInput.classList.remove("invalid");
      pLenInput.classList.add("valid");
    } else {
      pLenInput.classList.remove("valid");
      pLenInput.classList.add("invalid");
    }
    //check numbers
    if (passform.value.match(nums)) {
      pNumInput.classList.remove("invalid");
      pNumInput.classList.add("valid");
    } else {
      pNumInput.classList.remove("valid");
      pNumInput.classList.add("invalid");
    }
    //check letters
    if (passform.value.match(lett)) {
      pLettInput.classList.remove("invalid");
      pLettInput.classList.add("valid");
    } else {
      pLettInput.classList.remove("valid");
      pLettInput.classList.add("invalid");
    }
    //check special characters
    if (passform.value.match(spec)) {
      pSpecInput.classList.remove("invalid");
      pSpecInput.classList.add("valid");
    } else {
      pSpecInput.classList.remove("valid");
      pSpecInput.classList.add("invalid");
    }
  };
}

// ------------------- Contact Page --------------------- //

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}



function delCon(con) {
  if(confirm("Are you sure you want to delete this contact?")){
    var s = con.parentNode.parentNode;
    let contactIdString = $(con).closest("tr").attr('id') 
    console.log("contact id string is:")
    console.log(contactIdString) 
    // console.log(Number(contactId))
    // console.log(+contactId)
    // let c_id = +contactId
    // console.log(c_id)
    let tmp = {id:contactIdString}
    console.log(tmp)
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/DeleteContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
      xhr.onreadystatechange = function() 
      {
        if (this.readyState == 4 && this.status == 200) 
        {
          console.log(xhr.responseText)
          console.log("contact has been deleted")
        }
      };
      xhr.send(jsonPayload);
    }
    catch(err)
    {
      console.log("contact has failed to delete")
    }
    s.parentNode.removeChild(s);
  }
}
  
function UpCon(con) {
  let contactIdString = $(con).closest("tr").attr('id');
  let contactRow = document.getElementById(contactIdString)
  let fName = contactRow.childNodes[0].textContent
  let lName = contactRow.childNodes[1].textContent
  let phNumber = contactRow.childNodes[2].textContent
  let email = contactRow.childNodes[3].textContent
  let address = contactRow.childNodes[4].textContent
	var s = con.parentNode.parentNode;
	var tr = document.createElement("tr");
  tr.setAttribute("id",contactIdString)
  console.log(lName)
  
	var td1 = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	var td3 = tr.appendChild(document.createElement("td"));
	var td4 = tr.appendChild(document.createElement("td"));
	var td5 = tr.appendChild(document.createElement("td"));
	var td6 = tr.appendChild(document.createElement("td"));
	var td7 = tr.appendChild(document.createElement("td"));
  
	td1.innerHTML = `<input type="text" class="form__field" id="fName1" value= "${fName}" >`
	td2.innerHTML = `<input type="text" class="form__field" id="lName1" value= "${lName}">`;
	td3.innerHTML = `<input type="text" class="form__field" id="phNumber1"  value= "${phNumber}">`;
	td4.innerHTML = `<input type="text" class="form__field"  id="email1"  value= "${email}">`;
	td5.innerHTML = `<input type="text" class="form__field" id="address1"  value= "${address}">`;
    
	td6.innerHTML =
	"<button type='button' class= 'btn warning' id='edit_button' onclick='changeCon(this)'>Edit</button>";
  
	td7.innerHTML =
  "<button type='button' class= 'btn danger' id='delete_button'  onclick='delCon(this)'>Delete</button>";

	document.getElementById("tbl").replaceChild(tr, s);
}

function changeCon(con) {
  console.log("CHANGE CON IS EXECUTING")
	var fName =document.getElementById("fName1").value;  
	var lName = document.getElementById("lName1").value; 
	var phNumber = document.getElementById("phNumber1").value;
	var email = document.getElementById("email1").value;
	var address = document.getElementById("address1").value;
  let contactIdString = $(con).closest("tr").attr('id');
	let tmp = {firstname:fName,lastname:lName, phone:phNumber, email:email, address:address,id:contactIdString}
  console.log(tmp)
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/UpdateContact.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("contact has been updated")
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log("contact has failed to updated")
	}
  
	var s = con.parentNode.parentNode;
	var tr = document.createElement("tr");
  tr.setAttribute("id",`${contactIdString}`)
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
  "<button type='button' class= 'btn warning' id='edit_button' onclick='UpCon(this)'>Edit</button>";
	td7.innerHTML =
  "<button type='button' class= 'btn danger' id='delete_button'  onclick='delCon(this)'>Delete</button>";
  

	document.getElementById("tbl").replaceChild(tr, s);
}

function populateTable() {

  let tmp = { search: "", userid: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchContact." + extension;
  
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText)
        for (let i = 0; i < jsonObject.results.length; i++) {
          let tempFirst = (jsonObject.results[i])["FirstName"];
          let tempLast = (jsonObject.results[i])["LastName"];
          let tempPhone = (jsonObject.results[i])["PhoneNumber"];
          let tempEmail = (jsonObject.results[i])["Email"];
          let tempAddress = (jsonObject.results[i])["Address"];
          let tempId = (jsonObject.results[i])["ID"];
          var tr = document.createElement("tr");
          tr.setAttribute("id",`${tempId}`)

          var td1 = tr.appendChild(document.createElement("td"));
          var td2 = tr.appendChild(document.createElement("td"));
          var td3 = tr.appendChild(document.createElement("td"));
          var td4 = tr.appendChild(document.createElement("td"));
          var td5 = tr.appendChild(document.createElement("td"));
          var td6 = tr.appendChild(document.createElement("td"));
          var td7 = tr.appendChild(document.createElement("td"));
          td1.innerHTML = tempFirst;
          td2.innerHTML = tempLast;
          td3.innerHTML = tempPhone;
          td4.innerHTML = tempEmail;
          td5.innerHTML = tempAddress;
          // td7.innerHTML =
          //   '<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">';
          td6.innerHTML =
            "<button type='button' class= 'btn warning' id ='edit_button' onclick='UpCon(this)'>Edit</button>";
          td7.innerHTML =
            "<button type='button' class= 'btn danger' id='delete_button'  onclick='delCon(this)'>Delete</button>";
        
          document.getElementById("tbl").appendChild(tr);
          document.getElementById("addMe").reset();
        

        }

      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("error")
  }
}

function addContact() {
  readCookie();
  let addFirstname = document.getElementById("firstName").value;
  let addLastname = document.getElementById("lastName").value;
  let addPhone = document.getElementById("phNumber").value;
  let addEmail = document.getElementById("email").value;
  let addAddress = document.getElementById("address").value;
  //document.getElementById("contactAddResult").innerHTML = "";
  if(!validAddContact(addFirstname,addLastname,addPhone,addEmail)){
    return;
  }
  let tmp = {
    firstname: addFirstname,
    userid: userId,
    lastname: addLastname,
    phone: addPhone,
    email: addEmail,
    address: addAddress,
  };
  let jsonPayload = JSON.stringify(tmp);
  let tr_id = 0
  let url = urlBase + "/CreateContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  var tr = document.createElement("tr"); // Create table row for new contact
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText)
        tr_id = jsonObject["ID"];
        console.log(tr_id); // Print new contact id to console
	tr.setAttribute("id",tr_id)
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    //document.getElementById("contactAddResult").innerHTML = err.message;
  }

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
  // td7.innerHTML =
  //   '<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">';
  td6.innerHTML =
    "<button type='button' class= 'btn warning' id='edit_button' onclick='UpCon(this)'>Edit</button>";
  td7.innerHTML =
    "<button type='button' class= 'btn danger' id='delete_button'  onclick='delCon(this)'>Delete</button>";
  
  document.getElementById("tbl").appendChild(tr);
  document.getElementById("addMe").reset();
  showTable();
}

function searchContactv1() {
  let srchName = document.getElementById("searchText").value;
  // document.getElementById("contactSearchResult").innerHTML = "";


  let tmp = { search: srchName, userid: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  
  let existing_tr = document.getElementsByTagName("tr")

  for (let i = 0; i < existing_tr.length; i++){
    existing_tr[i].style.display = "";
  }
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText)
        for (let i = 0; i < jsonObject.length; i++) {
          let tempFirst = (jsonObject[i])["FirstName"];
          let tempLast = (jsonObject[i])["LastName"];
          let tempPhone = (jsonObject[i])["PhoneNumber"];
          let tempEmail = (jsonObject[i])["Email"];
          let tempAddress = (jsonObject[i])["Address"];
          let tempId = (jsonObject[i])["ID"];
          var tr = document.createElement("tr");
          tr.setAttribute("id",`"${tempId}"`)

          var td1 = tr.appendChild(document.createElement("td"));
          var td2 = tr.appendChild(document.createElement("td"));
          var td3 = tr.appendChild(document.createElement("td"));
          var td4 = tr.appendChild(document.createElement("td"));
          var td5 = tr.appendChild(document.createElement("td"));
          var td6 = tr.appendChild(document.createElement("td"));
          var td7 = tr.appendChild(document.createElement("td"));
          td1.innerHTML = tempFirst;
          td2.innerHTML = tempLast;
          td3.innerHTML = tempPhone;
          td4.innerHTML = tempEmail;
          td5.innerHTML = tempAddress;
          // td7.innerHTML =
          //   '<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">';
          td6.innerHTML =
            "<button type='button' class= 'btn warning' id = 'edit_button' onclick='UpCon(this)'>Edit</button>";
            td7.innerHTML =
            "<button type='button' class= 'btn danger' id='delete_button'  onclick='delCon(this)'>Delete</button>";
          document.getElementById("tbl").appendChild(tr);
          document.getElementById("addMe").reset();
        

        }

      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("error")
  }
}


function validAddContact(firstName, lastName, phone, email,address) { 
  var fNameErr = lNameErr = phoneErr = emailErr = addressErr = true;

  if (firstName == "") {
      document.getElementById("fNameMsg").textContent= "Please enter a valid first name."
      document.getElementById("firstName").style.marginBottom = "10px";
      document.getElementById("firstName").style.marginTop = "10px";
  }
  else {
    console.log("FIRST name IS VALID");
    fNameErr = false;
  }

  if (lastName == "") {     
    document.getElementById("lNameMsg").textContent= "Please enter a valid last name."
    document.getElementById("lastName").style.marginBottom = "10px";
    document.getElementById("lastName").style.marginTop = "10px";
  }
  else {
      console.log("LAST name IS VALID");
      lNameErr = false;
  }

  if (phone == "") { 
    document.getElementById("phoneMsg").textContent= "Please enter a valid phone number."
    document.getElementById("phNumber").style.marginBottom = "10px";
    document.getElementById("phNumber").style.marginTop = "10px";
  }
  else {
      var regex = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;

      if (regex.test(phone) == false) {
          document.getElementById("phoneMsg").textContent= "Please enter a valid phone number."
          document.getElementById("phNumber").style.marginTop = "10px";
          document.getElementById("phNumber").style.marginBottom = "10px";
          console.log("PHONE IS NOT VALID");
      }

      else {

          console.log("PHONE IS VALID");
          phoneErr = false;
      }
  }

  if (email == "") {
      document.getElementById("emailMsg").textContent= "Please enter a valid email."
      document.getElementById("email").style.marginBottom = "10px";
      document.getElementById("email").style.marginTop = "10px";
      console.log("EMAIL IS BLANK");
  }
  else {
      var regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

      if (regex.test(email) == false) {
          document.getElementById("emailMsg").textContent= "Please enter a valid email."
          document.getElementById("emailMsg").style.marginBottom = "10px";
          document.getElementById("emailMsg").style.marginTop = "10px";
          console.log("EMAIL IS NOT VALID");
      }

      else {
          console.log("EMAIL IS VALID");
          emailErr = false;
      }
  }
  if(address == ""){
    document.getElementById("addressMsg").textContent= "Please enter a valid address."
    document.getElementById("address").style.marginBottom = "10px";
    document.getElementById("address").style.marginTop = "10px";
  }
  else{
    addressErr=false;
  }

  if ((phoneErr || emailErr || fNameErr || lNameErr ||addressErr) == true) {
      document.getElementById("inputInfo").style.height = "650px"
      return false;

  }

  return true;

}

function searchContacts() {
  const content = document.getElementById("searchText");
  const selections = content.value.toUpperCase().split(' ');
  const table = document.getElementById("tbl");
  const tr = table.getElementsByTagName("tr");// Table Row

  for (let i = 0; i < tr.length; i++) {
      const td_fn = tr[i].getElementsByTagName("td")[0];// Table Data: First Name
      const td_ln = tr[i].getElementsByTagName("td")[1];// Table Data: Last Name

      if (td_fn && td_ln) {
          const txtValue_fn = td_fn.textContent || td_fn.innerText;
          const txtValue_ln = td_ln.textContent || td_ln.innerText;
          tr[i].style.display = "none";

          for (selection of selections) {
              if (txtValue_fn.toUpperCase().indexOf(selection) > -1) {
                  tr[i].style.display = "";
              }
              if (txtValue_ln.toUpperCase().indexOf(selection) > -1) {
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
