(function() {
    // Check if the script has already run
    if (window.myScriptHasRun) return;
    window.myScriptHasRun = true;

    // Function to run our main logic
    function runMainLogic() {
        let checkbox = document.querySelector('#show');
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
                let day = today.getDate().toString().padStart(2, '0');
                let month = (today.getMonth() + 1).toString().padStart(2, '0');
                let year = today.getFullYear();
                
                var currentDate = day + "-" + month + "-" + year;
                var startDateInput = document.getElementsByName('start_date')[0];
                var endDateInput = document.getElementsByName('end_date')[0];
                
                startDateInput.value = currentDate;
                endDateInput.value = currentDate;
            }

            // Create a new button element
            let customButton = document.createElement("button");
            customButton.type = "button";
            customButton.className = "btn btn-default";
            customButton.id = "custom_btn";
            customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula';
            
            customButton.addEventListener('click', handleClick);
            
            let parentDiv = document.getElementsByClassName('col-md-12')[2];
            if (parentDiv) parentDiv.appendChild(customButton);

            // Run handleClick once if it hasn't been run before
            if (!localStorage.getItem('buttonClicked')) {
                handleClick();
                showButton.click();
                localStorage.setItem('buttonClicked', 'true');
            }
        }

        var dropdownSalesGraph = document.getElementById('sales_graph_status');
        if (dropdownSalesGraph) {
            dropdownSalesGraph.value = 'confirmed';
            dropdownSalesGraph.dispatchEvent(new Event('input', { bubbles: true }));
        }

        var dropdownSalesStats = document.querySelector('#status.form-control');
        if (dropdownSalesStats) {
            dropdownSalesStats.value = 'confirmed';
            dropdownSalesStats.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    // Run the main logic when the DOM is fully loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runMainLogic);
    } else {
        runMainLogic();
    }
})();

// Created 6 Mac 2023
// Updated 26 August 2023
// Updated for dropdownSalesGraph on 13 October 2023
// Updated for dropdownSalesStats on 4 August 2024
// Modified to prevent refresh loop on 6 August 2024
