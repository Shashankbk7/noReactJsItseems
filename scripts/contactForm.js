//Contact Form Validation
const contactButton = document.getElementsByClassName("contactButton")[0];
contactButton.addEventListener("click", (e) => {
  e.preventDefault();
  contactName = document.getElementById("contactName").value;
  console.log(contactName);
  contactPhone = document.getElementById("contactPhone").value;
  console.log(contactPhone);
  contactEmail = document.getElementById("contactEmail").value;
  console.log(contactEmail);
  contactMessage = document.getElementById("contactMessage").value;
  console.log(contactEmail);

  if (
    contactName ||
    contactEmail ||
    contactPhone ||
    contactMessage == "" ||
    null ||
    undefined
  ) {
    alert("Error");
    return false;
  }
  if (contactPhone.length > 10) {
    alert("Invalid Phone Number");
    document.getElementById("contactPhone").value = " ";
    return false;
  }
  if (contactEmail.includes("@") == false) {
    alert("Invalid Email");
    document.getElementById("contactEmail").value = " ";
    return false;
  }
  alert("form validated");

  //Here post request need to be implemented
});
