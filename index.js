// Initialize the CSV (Comma_Seprated_Variables) data_type string
let csvData = "S. No.,Date,Time,Name,Password,DoB,Gender,Languages,eMail,Mob. No.,Education,Address,State,Pin Code,Comments,Resume,ProfileImage\n";

// Constant Variables
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const closeBtn = document.getElementById("closeBtn");
const otherCb = document.getElementById("othersCheckBox");
const otherIp = document.getElementById("others");
const sNo = document.querySelector(`#serialNo`)



// Date 
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, "0");
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;
dateInput.innerHTML = formattedDate;

// Time Function
function updateTime() {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;

  timeInput.innerHTML = formattedTime;
  return formattedTime
}

setInterval(updateTime, 1000);

// Serial number
let serialNo = 1;

setInterval(() => {
  sNo.innerHTML = serialNo;
}, submitForm);






// IP Box listener
otherCb.addEventListener("click", () => {
  if (otherCb.checked) {
    otherIp.style.display = "inline ";
  } else {
    otherIp.style.display = "none";
  }
});


// Function

// Number checking function

function validatePin(event, input) {
  event.preventDefault();
  let currVal = input.value ? input.value : "";
  // Checks if the key pressed is a number and the right length
  if (!isNaN(event.key) && currVal.length < 6) {
    input.value = currVal + event.key;
  }
  // Backspace functionality
  else if (event.keyCode == 8 && currVal > 0) {
    input.value = input.value.slice(0, -1);
  }
}

function validatePhone(event, input) {
  event.preventDefault();
  let currVal = input.value ? input.value : "";
  if (!isNaN(event.key) && currVal.length < 10) {
    input.value = currVal + event.key;
  }
  // Backspace functionality
  else if (event.keyCode == 8 && currVal > 0) {
    input.value = input.value.slice(0, -1);
  }

}

//upload check function

function isUploaded(input) {
  return (input.files && input.files.length > 0)  ? "true" : "false";
}

//Photo Display
let isImageUploaded = false;
function previewProfilePic(event) {
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let profileBackground = document.getElementById("profileImage");
    profileBackground.innerHTML = "<img id='imagePreview' src='" + reader.result + "' alt='Profile Background'>";
  };
  if (input && input.files && input.files.length > 0) {
    reader.readAsDataURL(input.files[0]);
    isImageUploaded = true
    return
  }
}
let isResumeUploaded = false;
function resumeUploaded(event) {
  let input = event.target;
  if (input && input.files && input.files.length > 0){
    isResumeUploaded = true;
  }
  
}


// Buttons Functions

// Submit Btn

function submitForm(event) {
  event.preventDefault();
  // Get the form element
  let form = document.getElementById("myForm");

  // Get the values of the Input fields
  let nameVal = form.elements["name"].value;
  let passwordVal = form.elements["password"].value;
  let dobVal = form.elements["dOB"].value;
  let gender = form.elements["gender"].value;
  let emailVal = form.elements["email"].value;
  let phoneVal = form.elements["phone"].value;
  let addressVal = form.elements["address"].value;
  let stateVal = form.elements["state"].value;
  let pinCode = form.elements["pinCode"].value;
  let comments = form.elements["comments"].value;
  let education = form.elements["education"].value;
  let formattedTime = updateTime();



  // languages array
  let languages = [];
  if (form.elements["english"].checked) {
    languages.push("english");
  }
  if (form.elements["hindi"].checked) {
    languages.push("hindi");
  }
  if (form.elements["punjabi"].checked) {
    languages.push("punjabi");
  }
  languages.push(form.elements["others"].value);

  if (nameVal.trim() === '' || passwordVal.trim() === '') {
    event.preventDefault();
    alert('Please fill in all mandatory fields.');
  }
  else {
    // Add the form data to the CSV data string
    csvData += serialNo + "," + formattedDate + "," + formattedTime + "," + nameVal + "," + passwordVal + "," + dobVal + "," + gender + "," + languages.join("|") + "," + emailVal + "," + phoneVal + "," + education + "," + addressVal + "," + stateVal + "," + pinCode + "," + comments + "," + isResumeUploaded  + " , " + isImageUploaded+ "\n";
    // Clear the form fields
    isImageUploaded=false;
    isResumeUploaded=false;
    // console.log(csvData);
    form.elements["name"].value = "";
    form.elements["dOB"].value = "";
    form.elements["password"].value = "";
    form.elements["male"].checked = false;
    form.elements["female"].checked = false;
    form.elements["english"].checked = false;
    form.elements["hindi"].checked = false;
    form.elements["punjabi"].checked = false;
    form.elements["othersCheckBox"].checked = false;
    form.elements["others"].value = "";
    form.elements["email"].value = "";
    form.elements["phone"].value = "";
    form.elements["education"].value = "None";
    form.elements["address"].value = "";
    form.elements["state"].value = "";
    form.elements["pinCode"].value = "";
    form.elements["comments"].value = "";
    let profileBackground = document.getElementById("profileImage");
    profileBackground.innerHTML = ` <img id="imagePreview" src="/images/photoProfile.png">`;
    serialNo += 1;
  }

}



// Clear Btn

function clearForm() {

  let result = confirm("Do you want to clear form?");
  if (result == true) {
    // Get the form element
    isImageUploaded=false;
    isResumeUploaded=false;
    let form = document.getElementById("myForm");
    // Clear the form fields

    form.elements["name"].value = "";
    form.elements["dOB"].value = "";
    form.elements["password"].value = "";
    form.elements["male"].checked = false;
    form.elements["female"].checked = false;
    form.elements["english"].checked = false;
    form.elements["hindi"].checked = false;
    form.elements["punjabi"].checked = false;
    form.elements["othersCheckBox"].checked = false;
    form.elements["others"].value = "";
    form.elements["email"].value = "";
    form.elements["phone"].value = "";
    form.elements["education"].value = "None";
    form.elements["address"].value = "";
    form.elements["state"].value = "";
    form.elements["pinCode"].value = "";
    form.elements["comments"].value = "";
    let profileBackground = document.getElementById("profileImage");
    profileBackground.innerHTML = ` <img id="imagePreview" src="/images/photoProfile.png">`;
  }

}

// Download Btn

function downloadCSV() {
  // Create a new anchor element to download the CSV file
  var downloadLink = document.createElement("a");
  downloadLink.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvData);
  downloadLink.download = "mydata.csv";

  // Add the anchor element to the page and click it to start the download
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Close Btn
function closeForm() {
  let result = confirm("Do you want to exit?");
  if (result == true) {
    window.location = "https://www.google.com";
  }
}

