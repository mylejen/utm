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
      document.getElementById("fv").value = "";
      
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
    
    // WhatsApp button click handler
    function handleWhatsAppClick() {
      // First do the same as handleClick
      handleClick();
      
      // Then select "Tambahan #2" instead of "Borang"
      Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
      
      // Set the input text value to "WhatsApp"
      document.getElementById("fv").value = "WhatsApp";
      
      // Also click the show button
      showButton.click();
    }
    
    // Facebook button click handler
    function handleFacebookClick() {
      // First do the same as handleClick
      handleClick();
      
            // Then select "Tambahan #2" instead of "Borang"
      Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
      
      // Set the input text value to "facebook"
      document.getElementById("fv").value = "facebook";
      
      // Also click the show button
      showButton.click();
    }

    // F button click handler
    function handleFClick() {
      // First do the same as handleClick
      handleClick();
      
            // Then select "Tambahan #2" instead of "Borang"
      Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
      
      // Set the input text value to "facebook"
      document.getElementById("fv").value = "f";
      
      // Also click the show button
      showButton.click();
    }
    
    // Create a new button element for Reset
    let customButton = document.createElement("button");
    
    // Set properties for the new button
    customButton.type = "button"; // Set the type to 'button'
    customButton.className = "btn btn-default"; // Set the class for styling
    customButton.id = "custom_btn"; // Set an ID
    customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula'; // Set button text
    
    // Add an event listener to the button that triggers handleClick function when it is clicked
    customButton.addEventListener('click', handleClick);
    
    // Create WhatsApp button
    let whatsAppButton = document.createElement("button");
    whatsAppButton.type = "button";
    whatsAppButton.className = "btn btn-success"; // Green color for WhatsApp
    whatsAppButton.id = "whatsapp_btn";
    whatsAppButton.style.marginLeft = "5px"; // Add some spacing
    whatsAppButton.innerHTML = '<span class="glyphicon glyphicon-phone"></span>&nbsp; WhatsApp'; // WhatsApp icon and text
    whatsAppButton.addEventListener('click', handleWhatsAppClick);
    
    // Create Facebook button
    let facebookButton = document.createElement("button");
    facebookButton.type = "button";
    facebookButton.className = "btn btn-primary"; // Blue color for Facebook
    facebookButton.id = "facebook_btn";
    facebookButton.style.marginLeft = "5px"; // Add some spacing
    facebookButton.innerHTML = '<span class="glyphicon glyphicon-thumbs-up"></span>&nbsp; Facebook'; // Facebook icon and text
    facebookButton.addEventListener('click', handleFacebookClick);

    // Create F button
    let fButton = document.createElement("button");
    fButton.type = "button";
    fButton.className = "btn btn-primary"; // Blue color for Facebook
    fButton.id = "f_btn";
    fButton.style.marginLeft = "5px"; // Add some spacing
    fButton.innerHTML = '<span class="glyphicon glyphicon-thumbs-up"></span>&nbsp; Huruf F'; // Facebook icon and text
    fButton.addEventListener('click', handleFClick);
    
    // Select the parent div
    let parentDiv = document.getElementsByClassName('col-md-12')[2];
    
    // Create a container div for all buttons to ensure they're in line
    let buttonContainer = document.createElement("div");
    buttonContainer.style.display = "inline-block";
    
    // Append all the new buttons to the container div
    buttonContainer.appendChild(customButton);
    buttonContainer.appendChild(whatsAppButton);
    buttonContainer.appendChild(facebookButton);
    buttonContainer.appendChild(fButton);
    
    // Append the container to the parent div
    parentDiv.appendChild(buttonContainer);

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
        const buttonContainer = document.querySelector('.col-md-12 > div');
        
	if (buttonContainer) {
            // Create a new paragraph element
            const totalParagraph = document.createElement('p');
            totalParagraph.textContent = el.textContent;
            
            // Styling
            totalParagraph.style.fontWeight = 'bold';
            totalParagraph.style.color = 'blue';
            totalParagraph.style.fontSize = '18px';  // Increased font size
            totalParagraph.style.marginTop = '20px'; // Added margin above the text
            
            // Insert the new paragraph right after the button container
            buttonContainer.insertAdjacentElement('afterend', totalParagraph);
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
// Updated for WA & FB button on 15 Mac 2025
// Updated for F button on 27 Mac 2025
