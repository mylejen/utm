
/**
 * This script is designed to be embedded on a specific login page.
 * It performs the following actions:
 * 1. Checks if the user is on the correct URL.
 * 2. Waits for the entire window to load, then polls the DOM to find the login form.
 * 3. Injects an initial "self demo" button onto the page.
 * 4. When the "self demo" button is clicked, it replaces itself with the UI block
 * for checking a verification code.
 * 5. Adds click handlers to fetch and display the code, with a 10-second cooldown.
 * 6. Includes console logs for easy debugging.
 */

function myVerificationCodeInjector() {
  console.log("Verification script v2 starting...");

  // --- CONFIGURATION ---
  const apiUrl = 'https://script.google.com/macros/s/AKfycbx7C1kdmKA0MO0_MjkC5tsHA0QWavp4PLfXDf9WGchd11Qjx0SE3usR_6z6ITydKo9jyw/exec';
  const targetSelector = '.bg-white.rounded-xl.shadow-sm'; // The main login form container
  const requiredUrlPart = 'app.bualpro.com/en/login';

  // --- SCRIPT LOGIC ---

  // 1. Check if we are on the correct page URL.
  if (!window.location.href.includes(requiredUrlPart)) {
    console.log(`Verification script: Current URL does not contain '${requiredUrlPart}'. Script will not run.`);
    return;
  }
  console.log("Verification script: URL check passed. Polling for login form...");

  /**
   * Creates and injects the code checker UI, replacing the initial button.
   * @param {HTMLElement} container - The element to inject the UI into.
   */
  function setupCodeChecker(container) {
    console.log("Setting up code checker UI...");

    const codeCheckerHtml = `
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Date:</strong> <span id="displayDate" style="color: #007BFF;">---</span></p>
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Time:</strong> <span id="displayTime" style="color: #007BFF;">---</span></p>
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Verification Code:</strong> <span id="displayCode" style="font-weight: bold; color: #007BFF;">---</span></p>
      <button id="checkCodeBtn" style="width: 100%; padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; margin-top: 10px; font-size: 1em; font-weight: bold;">Check Code</button>
      <p style="font-size: 12px; color: #666; margin-top: 15px; line-height: 1.4;">Check your current time, you can click button again to get the latest code, give us 10 seconds to check for you</p>
    `;

    // Replace the container's content with the code checker
    container.innerHTML = codeCheckerHtml;

    const checkBtn = document.getElementById('checkCodeBtn');
    const dateSpan = document.getElementById('displayDate');
    const timeSpan = document.getElementById('displayTime');
    const codeSpan = document.getElementById('displayCode');

    checkBtn.addEventListener('click', function() {
      this.disabled = true;
      this.innerText = 'Checking...';
      dateSpan.innerText = '...';
      timeSpan.innerText = '...';
      codeSpan.innerText = '...';

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          dateSpan.innerText = data.date || 'N/A';
          timeSpan.innerText = data.time || 'NA';
          codeSpan.innerText = data.verification_code || 'N/A';
        })
        .catch(error => {
          console.error('Error fetching verification code:', error);
          dateSpan.innerText = 'Error';
          timeSpan.innerText = 'Error';
          codeSpan.innerText = 'Error';
        })
        .finally(() => {
          setTimeout(() => {
            this.disabled = false;
            this.innerText = 'Check Code';
          }, 10000); // 10-second cooldown
        });
    });
    console.log("Code checker setup complete.");
  }

  /**
   * Injects the initial "self demo" button after the target element.
   * @param {HTMLElement} targetDiv - The element to insert the UI after.
   */
  function injectInitialButton(targetDiv) {
    if (document.getElementById('demoButtonContainer')) {
      console.log("Initial demo button already exists. Aborting setup.");
      return;
    }
    console.log("Target login form found. Injecting initial demo button...");

    const initialButtonHtml = `
      <div id="demoButtonContainer" style="border: 2px solid #E5E7EB; padding: 16px; margin-top: 24px; text-align: center; border-radius: 12px; font-family: sans-serif;">
        <button id="selfDemoBtn" style="width: 100%; padding: 12px; background-color: white; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; font-size: 0.875rem; color: #59A9FF; font-weight: bold;">
          Check Demo Code Here
        </button>
        <p style="font-size: 12px; color: #9CA3AF; margin-top: 10px; line-height: 1.4; margin-bottom: 0;">Only click here if you have demo email</p>
      </div>
    `;

    targetDiv.insertAdjacentHTML('afterend', initialButtonHtml);

    const selfDemoBtn = document.getElementById('selfDemoBtn');
    const demoContainer = document.getElementById('demoButtonContainer');

    // Add click listener to the new demo button
    selfDemoBtn.addEventListener('click', function() {
      console.log("Self demo button clicked.");
      // When clicked, replace the button with the code checker UI
      setupCodeChecker(demoContainer);
    });

    console.log("Initial demo button injected and listener attached.");
  }

  // Poll the DOM to find the target login form.
  const maxAttempts = 150; // Try for 15 seconds (150 * 100ms)
  let attempts = 0;
  const intervalId = setInterval(function() {
    attempts++;
    const targetDiv = document.querySelector(targetSelector);

    // Check if the main login container has appeared.
    if (targetDiv) {
      // If it's found, stop polling and inject our initial button.
      clearInterval(intervalId);
      injectInitialButton(targetDiv);
      return; // Stop the function here
    }

    if (attempts >= maxAttempts) {
      // If we can't find it after 15 seconds, stop trying.
      clearInterval(intervalId);
      console.warn(`Could not find the target element ('${targetSelector}') after ${maxAttempts} attempts. The script timed out.`);
    }
  }, 100);
}

// Wait for the entire page to load before running our script.
window.addEventListener('load', myVerificationCodeInjector);

// Created 27 Oct 2025


(function() {
    'useSTRICT';

    // --- Configuration ---
    const URL_TRIGGER = 'whatsapp-template'; // Only run on URLs containing this
    
    // 1. Define the DEFAULTS we expect to find
    const DEFAULT_LANGUAGE = 'English';
    const DEFAULT_CATEGORY = 'Marketing';

    // 2. Define the VALUES we want to set
    const DESIRED_LANGUAGE = 'Malay';
    const DESIRED_CATEGORY = 'Utility';

    // Polling settings
    const POLLING_INTERVAL = 250; // Check every 250ms
    const MAX_WAIT_TIME = 15000;  // Stop trying after 15 seconds
    // ---------------------
    
    let pollTimer = null;
    let timeWaited = 0;

    /**
     * Helper function to find and click an option in a dynamic dropdown.
     */
    function selectDropdownOption(inputElement, optionText) {
        return new Promise((resolve, reject) => {
            if (!inputElement) {
                return reject(new Error('Input element not provided for: ' + optionText));
            }
            inputElement.click(); // Open dropdown

            requestAnimationFrame(() => {
                setTimeout(() => {
                    const dropdowns = document.querySelectorAll('body > .el-select-dropdown[x-placement]');
                    const visibleDropdown = dropdowns[dropdowns.length - 1]; 

                    if (!visibleDropdown) {
                        inputElement.click(); // Close it
                        return reject(new Error('Dropdown menu panel not found for: ' + optionText));
                    }

                    const options = Array.from(visibleDropdown.querySelectorAll('.el-select-dropdown__item'));
                    const targetOption = options.find(opt => opt.textContent.trim() === optionText);

                    if (targetOption) {
                        targetOption.click(); // Click the desired option
                        resolve();
                    } else {
                        inputElement.click(); // Close it
                        reject(new Error(`Option "${optionText}" not found in dropdown.`));
                    }
                }, 100); 
            });
        });
    }

    /**
     * Main function to select the specified dropdown values.
     */
    async function autoSelectValues(langInput, catInput) {
        try {
            // --- Select Language ---
            console.log(`Changing Language to: ${DESIRED_LANGUAGE}...`);
            await selectDropdownOption(langInput, DESIRED_LANGUAGE);
            
            await new Promise(r => setTimeout(r, 200)); // Wait for close

            // --- Select Category ---
            console.log(`Changing Category to: ${DESIRED_CATEGORY}...`);
            await selectDropdownOption(catInput, DESIRED_CATEGORY);
            console.log('Auto-select successful.');

        } catch (error) {
            console.error('Error auto-selecting dropdowns:', error);
        }
    }

    /**
     * This function runs every 250ms to check if the inputs are ready.
     */
    function pollingCheck() {
        const allInputs = document.querySelectorAll('.el-input__inner[placeholder="Select"]');
        
        if (allInputs.length >= 2) {
            const langInput = allInputs[0];
            const catInput = allInputs[1];
            
            const langValue = langInput.value;
            const catValue = catInput.value;

            // Check if the inputs have loaded their values
            if (langValue && catValue) { 
                // Values are loaded. Stop polling.
                clearInterval(pollTimer);
                
                // **** THIS IS THE NEW LOGIC ****
                // Check if they match the defaults we want to replace.
                if (langValue === DEFAULT_LANGUAGE && catValue === DEFAULT_CATEGORY) {
                    
                    console.log('Default values found. Proceeding to auto-select.');
                    autoSelectValues(langInput, catInput);
                    
                } else {
                    // The values are NOT the defaults. The user may have
                    // already changed them. Do nothing.
                    console.log('Dropdowns do not have default values. Auto-select aborted.');
                }
            } else {
                // One or both inputs are still empty. Keep polling.
                timeWaited += POLLING_INTERVAL;
                if (timeWaited > MAX_WAIT_TIME) {
                    clearInterval(pollTimer);
                    console.error('Auto-select: Timed out waiting for dropdown values.');
                }
            }
        } else {
            // Inputs not found yet. Keep polling.
            timeWaited += POLLING_INTERVAL;
            if (timeWaited > MAX_WAIT_TIME) {
                clearInterval(pollTimer);
                console.error('Auto-select: Timed out waiting for dropdown elements.');
            }
        }
    }

    // --- Main Execution ---
    if (window.location.href.includes(URL_TRIGGER)) {
        pollTimer = setInterval(pollingCheck, POLLING_INTERVAL);
    }

})();


// Add on 13 Nov 2025
