let checkbox = document.querySelector('#show') !== null;

if (checkbox) {
	
    let showButton = document.getElementById('show');

    // define a function to handle the click event
    function handleClick() {
      
      // do something when the button is clicked
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

    }
    
    // Create a new button element
    let customButton = document.createElement("button");
    
    // Set properties for the new button
    customButton.type = "button"; // Set the type to 'button'
    customButton.className = "btn btn-default"; // Set the class for styling
    customButton.id = "custom_btn"; // Set an ID
    customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula'; // Set button text
    
    // Add an event listener to the button that triggers handleClick function when it is clicked
    customButton.addEventListener('click', handleClick);
    
    // Select the parent div
    let parentDiv = document.getElementsByClassName('col-md-12')[2];
    
    // Append the new button to the parent div
    parentDiv.appendChild(customButton);

    // Set the sessionStorage only if it's not set
    if (!sessionStorage.getItem('buttonClicked')) {
        // simulate a click on the button if it hasn't been clicked yet
        handleClick();
        showButton.click();
        // set a flag in sessionStorage to indicate that the button has been clicked
        sessionStorage.setItem('buttonClicked', 'true');
    }

	// New on 6 Mac 2025 - Add Jumlah Nilai Above
	const boldElements = document.getElementsByClassName('bold');
	for (let el of boldElements) {
	
    	if (el.textContent.includes('JUMLAH NILAI KESELURUHAN')) {
        const customBtn = document.getElementById('custom_btn');
        
	if (customBtn) {
            // Create a new paragraph element
            const totalParagraph = document.createElement('p');
            totalParagraph.textContent = el.textContent;
            
            // Styling
            totalParagraph.style.fontWeight = 'bold';
            totalParagraph.style.color = 'blue';
            totalParagraph.style.fontSize = '18px';  // Increased font size
            totalParagraph.style.marginTop = '20px'; // Added margin above the text
            
            // Insert the new paragraph right after the custom_btn
            customBtn.insertAdjacentElement('afterend', totalParagraph);
            break; } 
		} 
	}

}


var dropdownSalesGraph = document.getElementById('sales_graph_status');
if (dropdownSalesGraph) {
  // Set the selected value to "confirmed"
  dropdownSalesGraph.value = 'confirmed';

  // Create and dispatch an "input" event
  var event = new Event('input', { bubbles: true });
  dropdownSalesGraph.dispatchEvent(event);

  sessionStorage.removeItem('buttonClicked');
}


var checkStatsTypeLinks = document.getElementById('stats-type-links');
if (checkStatsTypeLinks) {

  var dropdownSalesStats = document.querySelector('#status.form-control');

  // Set the selected value to "confirmed"
  dropdownSalesStats.value = 'confirmed';

  // Create and dispatch an "input" event
  var event = new Event('input', { bubbles: true });
  dropdownSalesStats.dispatchEvent(event);
  
  sessionStorage.removeItem('buttonClicked');
}


// Created 6 Mac 2023
// Updated 26 August 2023
// Updated for dropdownSalesGraph on 13 October 2023
// Updated for dropdownSalesStats on 4 August 2024
// Updated for Jumlah Nilai Keseluruhan on 6 Mac 2025
