// Scope the entire script in a check to ensure it only runs if the '#show' button exists.
let checkbox = document.querySelector('#show') !== null;

if (checkbox) {
    let showButton = document.getElementById('show');

    // define a function to handle the click event for resetting the form
    function handleClick() {
        // Check relevant form fields
        document.getElementsByName('c[form_code]')[0].checked = true;
        document.getElementsByName('c[invoice_number]')[0].checked = true;
        document.getElementsByName('c[extra_field_2]')[0].checked = true;
        document.getElementsByName('c[extra_field_3]')[0].checked = true;
        document.getElementById("fv").value = "";

        // Set default dropdown values
        Array.from(document.getElementById("status").options).find(option => option.value === "confirmed").selected = true;
        Array.from(document.getElementById("record_limit").options).find(option => option.value === "all").selected = true;
        Array.from(document.getElementById("fc").options).find(option => option.value === "form").selected = true;

        // Get today's date and format it as DD-MM-YYYY
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1; // add 1 because months start at 0
        let year = today.getFullYear();

        // Add leading zeros to day and month if they are less than 10
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        var currentDate = day + "-" + month + "-" + year;

        var startDateInput = document.getElementsByName('start_date')[0];
        var endDateInput = document.getElementsByName('end_date')[0];

        // set the value of the date input elements to the current date
        startDateInput.value = currentDate;
        endDateInput.value = currentDate;
    }

    // WhatsApp button click handler
    function handleWhatsAppClick() {
        handleClick(); // First, apply the default settings
        // Then, set WhatsApp-specific fields
        Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
        document.getElementById("fv").value = "WhatsApp";
        showButton.click(); // Trigger the form submission/filter
    }

    // Facebook button click handler
    function handleFacebookClick() {
        handleClick(); // First, apply the default settings
        // Then, set Facebook-specific fields
        Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
        document.getElementById("fv").value = "facebook";
        showButton.click(); // Trigger the form submission/filter
    }

    // "F" button click handler
    function handleFClick() {
        handleClick(); // First, apply the default settings
        // Then, set "f"-specific fields
        Array.from(document.getElementById("fc").options).find(option => option.value === "extra_field_2").selected = true;
        document.getElementById("fv").value = "f";
        showButton.click(); // Trigger the form submission/filter
    }

    // --- Button Creation ---

    // Create a new button element for Reset
    let customButton = document.createElement("button");
    customButton.type = "button";
    customButton.className = "btn btn-default";
    customButton.id = "custom_btn";
    customButton.innerHTML = '<span class="glyphicon glyphicon-refresh"></span>&nbsp; Set Semula';
    customButton.addEventListener('click', handleClick);

    // Create WhatsApp button
    let whatsAppButton = document.createElement("button");
    whatsAppButton.type = "button";
    whatsAppButton.className = "btn btn-success";
    whatsAppButton.id = "whatsapp_btn";
    whatsAppButton.style.marginLeft = "5px";
    whatsAppButton.innerHTML = '<span class="glyphicon glyphicon-phone"></span>&nbsp; WhatsApp';
    whatsAppButton.addEventListener('click', handleWhatsAppClick);

    // Create Facebook button
    let facebookButton = document.createElement("button");
    facebookButton.type = "button";
    facebookButton.className = "btn btn-primary";
    facebookButton.id = "facebook_btn";
    facebookButton.style.marginLeft = "5px";
    facebookButton.innerHTML = '<span class="glyphicon glyphicon-thumbs-up"></span>&nbsp; Facebook';
    facebookButton.addEventListener('click', handleFacebookClick);

    // Create F button
    let fButton = document.createElement("button");
    fButton.type = "button";
    fButton.className = "btn btn-primary";
    fButton.id = "f_btn";
    fButton.style.marginLeft = "5px";
    fButton.innerHTML = '<span class="glyphicon glyphicon-star-empty"></span>&nbsp; All';
    fButton.addEventListener('click', handleFClick);

    // --- Button Injection ---

    // Select the parent div to inject the buttons into
    let parentDiv = document.getElementsByClassName('col-md-12')[2];
    let buttonContainer = document.createElement("div");
    buttonContainer.style.display = "inline-block";

    // Append all the new buttons to the container div
    buttonContainer.appendChild(customButton);
    buttonContainer.appendChild(whatsAppButton);
    buttonContainer.appendChild(facebookButton);
    buttonContainer.appendChild(fButton);

    // Append the container to the parent div
    parentDiv.appendChild(buttonContainer);

    // --- Initial Load Logic ---

    // On first load within a session, apply default filters and click the show button.
    if (!sessionStorage.getItem('buttonClicked')) {
        handleClick();
        showButton.click();
        sessionStorage.setItem('buttonClicked', 'true');
    }

    /**
     * UPDATED: Fetches cost and ROAS data from the correct endpoint and updates the UI.
     * This function checks form values to decide which API endpoint to use,
     * fetches the data, and displays it in the new required format.
     * @param {HTMLElement} totalParagraph - The paragraph element where the total is displayed.
     * @param {string} totalAmountText - The text content containing the total amount.
     */
    async function fetchAndDisplayCost(totalParagraph, totalAmountText) {
        try {
            // 1. Determine endpoint, keyword, and labels based on form state
            let endpointUrl = '';
            let keyword = '';
            let costLabel = '';

            const fvValue = document.getElementById("fv").value;
            const fcValue = document.getElementById("fc").value;

            // Case 1: WhatsApp. Check if "Tambahan #2" is selected and input value is "WhatsApp".
            if (fcValue === "extra_field_2" && fvValue === "WhatsApp") {
                endpointUrl = 'https://webhook.site/check-cost-wa';
                keyword = fvValue; // Keyword is "WhatsApp"
                costLabel = 'JUMLAH KOS WA (+16.7%)';
            } else {
                // Case 2: Meta (Default).
                endpointUrl = 'https://webhook.site/check-cost-meta';
                costLabel = 'JUMLAH KOS META (+16.7%)';

                // Determine the keyword for the Meta case
                if ((fcValue === "invoice_number" || fcValue === "extra_field_3") && fvValue) {
                    keyword = fvValue; // Keyword is the value from the input, e.g., "TMKM"
                } else {
                    keyword = ""; // Keyword is none if other conditions aren't met
                }
            }

            // 2. Extract common data for the POST request
            const hostname = window.location.hostname;
            const startDate = document.getElementsByName('start_date')[0].value;
            const endDate = document.getElementsByName('end_date')[0].value;
            const totalAmount = totalAmountText.replace(/[^0-9.,]/g, '').replace(',', '');

            // 3. Prepare the complete data payload
            const postData = {
                hostname: hostname,
                keyword: keyword,
                startdate: startDate,
                enddate: endDate,
                totalamount: totalAmount
            };

            // 4. Send the POST request to the determined endpoint
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // 5. Process the response and update the UI with the new format
            const costValue = result.cost_with_tax || result.spend_with_tax;
            const roasValue = result.roas_spend_with_tax;
            const percentageValue = result.percentage;
            const fontColour = result.colour; // 'red' or 'green'

            if (result.status === 'success' && costValue && roasValue && percentageValue && fontColour) {
                // Create element for JUMLAH KOS
                const costParagraph = document.createElement('p');
                costParagraph.textContent = `${costLabel} = ${costValue}`;
                costParagraph.style.fontWeight = 'bold';
                costParagraph.style.color = 'blue';
                costParagraph.style.fontSize = '18px';

                // Create element for ROAS with colored value
                const roasParagraph = document.createElement('p');
                roasParagraph.innerHTML = `ROAS = <span style="color: ${fontColour};">${roasValue}</span>`;
                roasParagraph.style.fontWeight = 'bold';
                roasParagraph.style.color = 'blue';
                roasParagraph.style.fontSize = '18px';

                // Create element for PERCENTAGE ADS SPEND with colored value
                const percentageParagraph = document.createElement('p');
                percentageParagraph.innerHTML = `PERCENTAGE ADS SPEND = <span style="color: ${fontColour};">${percentageValue}</span>`;
                percentageParagraph.style.fontWeight = 'bold';
                percentageParagraph.style.color = 'blue';
                percentageParagraph.style.fontSize = '18px';

                // Insert the new paragraphs right after the total paragraph.
                // They are inserted in reverse order to appear correctly on the page.
                totalParagraph.insertAdjacentElement('afterend', percentageParagraph);
                totalParagraph.insertAdjacentElement('afterend', roasParagraph);
                totalParagraph.insertAdjacentElement('afterend', costParagraph);
            } else {
                console.error("Incomplete data received from API:", result);
            }

        } catch (error) {
            console.error("Error fetching or processing cost data:", error);
        }
    }


    // --- UI Update Logic ---

    // Find the total amount element, display it prominently, and trigger the cost fetch.
    const boldElements = document.getElementsByClassName('bold');
    for (let el of boldElements) {
        if (el.textContent.includes('JUMLAH NILAI KESELURUHAN')) {
            const buttonContainer = document.querySelector('.col-md-12 > div');

            if (buttonContainer) {
                // Create a new paragraph element to display the total amount
                const totalParagraph = document.createElement('p');
                totalParagraph.textContent = el.textContent;

                // Style the new total paragraph
                totalParagraph.style.fontWeight = 'bold';
                totalParagraph.style.color = 'blue';
                totalParagraph.style.fontSize = '18px';
                totalParagraph.style.marginTop = '20px';

                // Insert the new paragraph after the button container
                buttonContainer.insertAdjacentElement('afterend', totalParagraph);

                // Call the function to fetch cost and update the UI
                fetchAndDisplayCost(totalParagraph, el.textContent);

                break; // Stop searching once the element is found and processed
            }
        }
    }
}

// --- Other Page Adjustments ---

// On the sales graph page, default the status to "confirmed".
var dropdownSalesGraph = document.getElementById('sales_graph_status');
if (dropdownSalesGraph) {
    dropdownSalesGraph.value = 'confirmed';
    var event = new Event('input', {
        bubbles: true
    });
    dropdownSalesGraph.dispatchEvent(event);
    sessionStorage.removeItem('buttonClicked');
}

// On the stats type links page, default the status to "confirmed".
var checkStatsTypeLinks = document.getElementById('stats-type-links');
if (checkStatsTypeLinks) {
    var dropdownSalesStats = document.querySelector('#status.form-control');
    dropdownSalesStats.value = 'confirmed';
    var event = new Event('input', {
        bubbles: true
    });
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
// Updated for Check Cost WA and Meta on 23 July 2025
// Updated for New Cost Format on 25 August 2025
