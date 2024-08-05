let checkbox = document.querySelector('#show') !== null;

if (checkbox) {
    let showButton = document.getElementById('show');

    function handleClick() {
        // Perform actions on button click
        document.getElementsByName('c[form_code]')[0].checked = true;
        document.getElementsByName('c[invoice_number]')[0].checked = true;
        document.getElementsByName('c[extra_field_2]')[0].checked = true;
        document.getElementsByName('c[extra_field_3]')[0].checked = true;

        Array.from(document.getElementById("status").options).find(option => option.value === "confirmed").selected = true;
        Array.from(document.getElementById("record_limit").options).find(option => option.value === "all").selected = true;
        Array.from(document.getElementById("fc").options).find(option => option.value === "form").selected = true;

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // Add 1 because months start at 0
        let year = today.getFullYear();

        // Add leading zeros to day and month if they are less than 10
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        var currentDate = day + "-" + month + "-" + year;

        var startDateInput = document.getElementsByName('start_date')[0];
        var endDateInput = document.getElementsByName('end_date')[0];

        // Set the value of the input elements to currentDate
        startDateInput.value = currentDate;
        endDateInput.value = currentDate;
    }

    // Check if the custom button already exists to avoid duplication
    if (!document.getElementById('custom_btn')) {
        let customButton = document.createElement("button");
        customButton.type = "button";
        customButton.className = "btn btn-default";
        customButton.id = "custom_btn";
        customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula';
        customButton.addEventListener('click', handleClick);

        let parentDiv = document.getElementsByClassName('col-md-12')[2];
        parentDiv.appendChild(customButton);
    }

    // Only simulate button click if session storage is not set
    if (!sessionStorage.getItem('buttonClicked')) {
        handleClick();
        // Prevent default action if the button causes a form submission
        showButton.addEventListener('click', (e) => e.preventDefault());
        showButton.click();
        sessionStorage.setItem('buttonClicked', 'true');
    }
}

var dropdownSalesGraph = document.getElementById('sales_graph_status');
if (dropdownSalesGraph) {
    dropdownSalesGraph.value = 'confirmed';
    var event = new Event('input', { bubbles: true });
    dropdownSalesGraph.dispatchEvent(event);
    sessionStorage.removeItem('buttonClicked');
}

var dropdownSalesStats = document.querySelector('#status.form-control');
if (dropdownSalesStats) {
    dropdownSalesStats.value = 'confirmed';
    var event = new Event('input', { bubbles: true });
    dropdownSalesStats.dispatchEvent(event);
    sessionStorage.removeItem('buttonClicked');
}



// Created 6 Mac 2023
// Updated 26 August 2023
// Updated for dropdownSalesGraph on 13 October 2023
// Updated for dropdownSalesStats on 4 August 2024
// Fix bugs on 6 August 2024
