(function() {
    'use strict';

    // 1. Get the 'acc' parameter from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('acc');

    // 2. Check if the parameter exists before proceeding
    if (!pageId) {
        console.warn("Script aborted: No 'acc' parameter found in the URL.");
        return;
    }

    // 3. Dynamically set the target URL based on the current domain
    // window.location.origin will be "https://chatrace.com" or "https://app.bualpro.com"
    const currentDomain = window.location.origin; 
    const targetUrl = currentDomain + "/php/user.php";

    console.log("Found page_id:", pageId);
    console.log("Sending POST request to:", targetUrl);

    // 4. Prepare the POST request using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open("POST", targetUrl, true);

    // Set the header to application/x-www-form-urlencoded
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // 5. Handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // 4 means the request is done
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("✅ Success! Response received from " + currentDomain + ":");
                console.log(xhr.responseText);
            } else {
                console.error("❌ Request failed with status:", xhr.status, xhr.statusText);
            }
        }
    };

    // 6. Construct the JSON object with the extracted page_id
    const jsonObject = {
        "op": "whatsapp",
        "op1": "templates",
        "op2": "sync",
        "pageName": "whatsapp",
        "page_id": pageId
    };

    // 7. Convert to string, URL encode it, and structure it as "param=..."
    const jsonString = JSON.stringify(jsonObject);
    const payload = "param=" + encodeURIComponent(jsonString);

    // 8. Send the encoded form data
    xhr.send(payload);

})();

// Created on 11 March 2026
