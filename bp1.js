/**
 * This script is designed to be embedded on a specific login page.
 * It performs the following actions:
 * 1. Checks if the user is on the correct URL.
 * 2. Waits for the entire window to load, then polls the DOM to find the login form.
 * 3. Checks if the specific email 'demo123@bualpro.com' is displayed on the page.
 * 4. If all conditions are met, it injects the UI block for checking a verification code.
 * 5. Adds click handlers to fetch and display the code, with a 10-second cooldown.
 * 6. Includes console logs for easy debugging.
 */

function myVerificationCodeInjector() {
  console.log("Verification script starting...");

  // --- CONFIGURATION ---
  const apiUrl = 'https://script.google.com/macros/s/AKfycbx7C1kdmKA0MO0_MjkC5tsHA0QWavp4PLfXDf9WGchd11Qjx0SE3usR_6z6ITydKo9jyw/exec';
  const targetSelector = '.bg-white.rounded-xl.shadow-sm';
  const requiredUrlPart = 'app.bualpro.com/en/login';
  const requiredEmail = 'demo123@bualpro.com';
  
  // --- SCRIPT LOGIC ---

  // 1. Check if we are on the correct page URL.
  if (!window.location.href.includes(requiredUrlPart)) {
    console.log(`Verification script: Current URL does not contain '${requiredUrlPart}'. Script will not run.`);
    return;
  }
  console.log("Verification script: URL check passed. Polling for login form...");

  /**
   * Creates and injects the code checker UI.
   * @param {HTMLElement} targetDiv - The element to insert the UI after.
   */
  function setupCodeChecker(targetDiv) {
    if (document.getElementById('codeCheckerContainer')) {
      console.log("Code checker UI already exists. Aborting setup.");
      return;
    }
    console.log("Target element and email confirmed. Setting up code checker UI...");

    const codeCheckerHtml = `
      <div id="codeCheckerContainer" style="border: 2px solid red; padding: 16px; margin-top: 24px; text-align: center; border-radius: 12px; font-family: sans-serif;">
          <p style="margin: 8px 0; font-size: 1.1em;"><strong>Date:</strong> <span id="displayDate" style="color: #d9534f;">---</span></p>
          <p style="margin: 8px 0; font-size: 1.1em;"><strong>Time:</strong> <span id="displayTime" style="color: #d9534f;">---</span></p>
          <p style="margin: 8px 0; font-size: 1.1em;"><strong>Verification Code:</strong> <span id="displayCode" style="font-weight: bold; color: #d9534f;">---</span></p>
          <button id="checkCodeBtn" style="width: 100%; padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 8px; cursor: pointer; margin-top: 10px; font-size: 1em; font-weight: bold;">Check Code</button>
          <p style="font-size: 12px; color: #666; margin-top: 15px; line-height: 1.4;">Check your current time, you can click button again to get the latest code, give us 10 seconds to check for you</p>
      </div>
    `;
    
    targetDiv.insertAdjacentHTML('afterend', codeCheckerHtml);

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
    console.log("Code checker setup complete.");
  }

  // Poll the DOM to find the target element and check for the email.
  const maxAttempts = 150; // Try for 15 seconds (150 * 100ms)
  let attempts = 0;
  const intervalId = setInterval(function() {
    attempts++;
    const targetDiv = document.querySelector(targetSelector);

    // Check if the main login container has appeared.
    if (targetDiv) {
      // If it has, check for the specific email address inside it.
      const emailElement = targetDiv.querySelector('b');
      if (emailElement && emailElement.innerText.trim() === requiredEmail) {
        // If both are found, stop polling and build the UI.
        clearInterval(intervalId);
        setupCodeChecker(targetDiv);
        return; // Stop the function here
      }
    }
    
    if (attempts >= maxAttempts) {
      // If we can't find it after 15 seconds, stop trying.
      clearInterval(intervalId);
      console.warn(`Could not find the target element or email after ${maxAttempts} attempts. The script timed out.`);
      console.log("If the login form is visible but the script failed, please copy the full console output and share it for further debugging.");
    }
  }, 100);
}

// Wait for the entire page to load before running our script.
window.addEventListener('load', myVerificationCodeInjector);


// Created 12 Oct 2025
