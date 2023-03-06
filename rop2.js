let checkbox = document.querySelector('#show') !== null;

if (checkbox) {

document.getElementsByName('c[form_code]')[0].checked = true;
document.getElementsByName('c[invoice_number]')[0].checked = true;

document.getElementsByName('c[extra_field_2]')[0].checked = true;
document.getElementsByName('c[extra_field_3]')[0].checked = true;

Array.from(document.getElementById("status").options).find(option => option.value === "confirmed").selected = true;
Array.from(document.getElementById("record_limit").options).find(option => option.value === "all").selected = true;
Array.from(document.getElementById("fc").options).find(option => option.value === "form").selected = true;

let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1; // add 1 because months start at 0
let year = today.getFullYear();

// add leading zeros to day and month if they are less than 10
day = day < 10 ? "0" + day : day;
month = month < 10 ? "0" + month : month;

var currentDate = day + "-" + month + "-" + year;

var startDateInput = document.getElementsByName('start_date')[0];
var endDateInput = document.getElementsByName('end_date')[0];

// set the value of the input element to currentDate
startDateInput.value = currentDate;
endDateInput.value = currentDate;

// get the button element with the id "show"
var showButton = document.getElementById('show');

// simulate a click on the button
showButton.click();

void 0

}

// Created 6 Mac 2023
