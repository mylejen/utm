/**
 * This script is designed to be embedded on a specific login page.
 * It performs the following actions:
 * 1. Checks if the user is on the correct URL AND has the '?ref=demo' parameter.
 * 2. Hides Facebook, Google, and Sign Up options.
 * 3. Fixes the styling of the "Sign In With Email" button to ensure it looks correct.
 * 4. Directly injects the Verification Code UI.
 */

function myVerificationCodeInjector() {
  console.log("Verification script v4 (UI Fixes) starting...");

  // --- CONFIGURATION ---
  const apiUrl = 'https://script.google.com/macros/s/AKfycbx7C1kdmKA0MO0_MjkC5tsHA0QWavp4PLfXDf9WGchd11Qjx0SE3usR_6z6ITydKo9jyw/exec';
  const targetSelector = '.bg-white.rounded-xl.shadow-sm'; // The main login form container
  const requiredUrlPart = 'app.bualpro.com/en/login';
  const requiredParam = 'ref=demo';

  // --- SCRIPT LOGIC ---

  // 1. Check URL and Query Parameter
  const currentUrl = window.location.href;
  if (!currentUrl.includes(requiredUrlPart) || !currentUrl.includes(requiredParam)) {
    console.log(`Verification script: URL requirement not met. Script will not run.`);
    return;
  }
  console.log("Verification script: URL check passed.");

  /**
   * Hides unwanted buttons and fixes the layout of the remaining Email button.
   */
  function cleanUpUI() {
    // 1. Handle Buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      const text = btn.textContent || "";
      
      // Hide Social Login Buttons
      if (text.includes("Sign In With Facebook") || text.includes("Sign In With Google")) {
        btn.style.display = 'none';
      }

      // Fix "Sign In With Email" Button Styling
      if (text.includes("Sign In With Email")) {
        console.log("Fixing Email button styling...");
        btn.style.width = '100%';          // Force full width
        btn.style.display = 'flex';        // Use flexbox for internal alignment
        btn.style.justifyContent = 'center';
        btn.style.alignItems = 'center';
        btn.style.height = '64px';         // Enforce standard height (h-16)
        
        // Also ensure the parent container spans full width if it collapsed
        if (btn.parentElement) {
            btn.parentElement.style.width = '100%';
        }
      }
    });

    // 2. Hide Sign Up / Links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const text = link.textContent || "";
      if (text.includes("Sign Up") || text.includes("Don't have an account")) {
        link.style.display = 'none';
        // Hide parent wrapper to remove whitespace
        if (link.parentElement && link.parentElement.classList.contains('pt-2')) {
            link.parentElement.style.display = 'none';
        }
      }
    });
  }

  /**
   * Creates and injects the code checker UI immediately.
   */
  function injectVerificationUI(container) {
    // Check if already injected to avoid duplicates
    if (document.getElementById('demoCodeContainer')) return;

    const boxWrapper = document.createElement('div');
    boxWrapper.id = "demoCodeContainer";
    boxWrapper.style.border = "2px solid #E5E7EB";
    boxWrapper.style.padding = "16px";
    boxWrapper.style.marginTop = "24px";
    boxWrapper.style.borderRadius = "12px";
    boxWrapper.style.fontFamily = "sans-serif";
    boxWrapper.style.textAlign = "center";

    const uiHtml = `
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Date:</strong> <span id="displayDate" style="color: #007BFF;">---</span></p>
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Time:</strong> <span id="displayTime" style="color: #007BFF;">---</span></p>
      <p style="margin: 8px 0; font-size: 1.1em;"><strong>Verification Code:</strong> <span id="displayCode" style="font-weight: bold; color: #007BFF;">---</span></p>
      <button id="checkCodeBtn" style="width: 100%; padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; margin-top: 10px; font-size: 1em; font-weight: bold;">Check Code</button>
      <p style="font-size: 12px; color: #666; margin-top: 15px; line-height: 1.4;">Check your current time, you can click button again to get the latest code, give us 10 seconds to check for you</p>
    `;

    boxWrapper.innerHTML = uiHtml;
    container.insertAdjacentElement('afterend', boxWrapper);

    // Setup logic for the "Check Code" button
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
          }, 10000); 
        });
    });
  }

  // Poll the DOM to find the target login form.
  const maxAttempts = 150; 
  let attempts = 0;
  const intervalId = setInterval(function() {
    attempts++;
    const targetDiv = document.querySelector(targetSelector);

    if (targetDiv) {
      clearInterval(intervalId);
      cleanUpUI(); // Hides distractions AND Fixes button width
      injectVerificationUI(targetDiv);
      return; 
    }

    if (attempts >= maxAttempts) {
      clearInterval(intervalId);
      console.warn(`Target element not found after timeout.`);
    }
  }, 100);
}

window.addEventListener('load', myVerificationCodeInjector);

// Created 20 Nov 2025


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
