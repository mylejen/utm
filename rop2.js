// Run the script only once per page load
if (!window.hasRun) {
    window.hasRun = true;

    let checkbox = document.querySelector('#show') !== null;
    if (checkbox) {
        let showButton = document.getElementById('show');

        // define a function to handle the click event
        function handleClick() {
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
        customButton.type = "button";
        customButton.className = "btn btn-default";
        customButton.id = "custom_btn";
        customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula';
        
        // Add an event listener to the button that triggers handleClick function when it is clicked
        customButton.addEventListener('click', handleClick);
        
        // Select the parent div
        let parentDiv = document.getElementsByClassName('col-md-12')[2];
        
        // Append the new button to the parent div
        parentDiv.appendChild(customButton);

        // Set the localStorage only if it's not set
        if (!localStorage.getItem('buttonClicked')) {
            handleClick();
            showButton.click();
            localStorage.setItem('buttonClicked', 'true');
        }
    }

    var dropdownSalesGraph = document.getElementById('sales_graph_status');
    if (dropdownSalesGraph) {
        // Set the selected value to "confirmed"
        dropdownSalesGraph.value = 'confirmed';
        // Create and dispatch an "input" event
        var event = new Event('input', { bubbles: true });
        dropdownSalesGraph.dispatchEvent(event);
    }

    var dropdownSalesStats = document.querySelector('#status.form-control');
    if (dropdownSalesStats) {
        // Set the selected value to "confirmed"
        dropdownSalesStats.value = 'confirmed';
        // Create and dispatch an "input" event
        var event = new Event('input', { bubbles: true });
        dropdownSalesStats.dispatchEvent(event);
    }
}

// Created 6 Mac 2023
// Updated 26 August 2023
// Updated for dropdownSalesGraph on 13 October 2023
// Updated for dropdownSalesStats on 4 August 2024
// Modified to prevent refresh loop on 6 August 2024
