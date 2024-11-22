// Separate iframe code for better maintainability
function getIframeCode() {
  return `
// select elements
const form = document.querySelector('.donor-form form.ng-untouched');
const elements = Array.from(form.querySelectorAll('div.fs-unmask'));

const firstStepStopIndex = elements.findIndex(
    child => child.querySelector('.amount-buttons') !== null
);

const secondStepStopIndex = elements.findIndex(
    child => child.querySelector('.email-label') !== null
);

// group elements into steps

function addStepClassNames() {
    const firstStepElements = elements.slice(0, firstStepStopIndex + 1);
    const secondStepElements = elements.slice(firstStepStopIndex + 1, secondStepStopIndex + 1);
    const thirdStepElements = elements.slice(secondStepStopIndex + 1, elements.length);

    firstStepElements.forEach(el => el.classList.add('step-1'));
    secondStepElements.forEach(el => el.classList.add('step-2'));
    thirdStepElements.forEach(el => el.classList.add('step-3'));

    form.dataset.currentStep = 1;
}

// add a function to handle the step change

function handleStepChange(event) {
    console.log(event.target);
    const currentStep = parseInt(form.dataset.currentStep);
    if (currentStep == 1) {
        document.getElementById('back-button-amount').innerText = document.querySelector('.other-amount-input') ? document.querySelector('.other-amount-input').value : document.querySelector('.amount-btn:not(.unselected)').innerText.replace(/\\D/g, '');
        if (document.querySelector('#toggle-tablist button[value="Recurring donation"].selected')) {
            document.getElementById('recurring-text').innerText = document.querySelector('select.recurring-frequency-select').options[document.querySelector('select.recurring-frequency-select').selectedIndex].text;
        }
    }
    if(event.currentTarget.classList.contains('continue-button')) {
        console.log('continue');
        if (currentStep < 3) {
            form.dataset.currentStep = currentStep + 1;
        }
    } else if(event.currentTarget.classList.contains('back-button')) {
        if (currentStep > 1) {
            form.dataset.currentStep = currentStep - 1;
        }
    }
}


// add extra elements like continue and back buttons, progress bar, etc.

function addExtraElements() {

    // add continue button
    const continueButton = document.createElement('button');
    continueButton.innerHTML = \`<span>Continue</span><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 12H19.5M19.5 12L12.5 19M19.5 12L12.5 5" stroke="#ECFF00" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>\`;
    continueButton.classList.add('continue-button');
    continueButton.type = 'button';
    continueButton.addEventListener('click', handleStepChange);
    form.appendChild(continueButton);

    // add progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    form.prepend(progressBar);

    // add back button
    const backButton = document.createElement('button');
    backButton.innerHTML = \`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8334 9.99996H4.16675M4.16675 9.99996L10.0001 15.8333M4.16675 9.99996L10.0001 4.16663" stroke="#212529" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
Donating <strong>$<span id="back-button-amount">0</span></strong><span id='recurring-text'></span>\`;
    backButton.type = 'button';
    backButton.ariaLabel = 'Go back';
    backButton.classList.add('back-button');
    backButton.addEventListener('click', handleStepChange);
    form.prepend(backButton);

    // add third step heading
    const thirdStepHeading = document.createElement('h2');
    thirdStepHeading.innerText = 'Billing address';
    thirdStepHeading.classList.add('third-step-heading', 'step-3');
    form.insertBefore(thirdStepHeading, form.children[secondStepStopIndex + 1]);

}

function throwError(fieldWrapper) {
    const fields = fieldWrapper.querySelectorAll('input, select');
    fields.forEach(field => {
        field.classList.add('sky-error');
        field.setAttribute('aria-invalid', 'true');
    });
    let errorLabel = fieldWrapper.querySelector('.sky-error-label');
    if (!errorLabel) {
        errorLabel = document.createElement('div');
        errorLabel.classList.add('sky-error-label', 'dn-custom-error');
        const input = fieldWrapper.querySelector('input, select');
        if (input) {
            input.after(errorLabel);
            input.addEventListener('focus', () => {
                errorLabel.remove();
            }, { once: true });
        }
    }
    errorLabel.innerText = 'This field is required';
}

function isStepValid(step) {
    if (step == 1) {
        if (!form.getElementById('invalid-amount-error') && (form.querySelector('.amount-btn:not(.unselected)') || (form.querySelector('.other-amount-input') && form.querySelector('.other-amount-input').value.length > 0))) {
            return true;
        }
        return false;
    }
    const fieldWrappers = form.querySelectorAll(\`div.step-\${step}\`);

    let valid = true;

    fieldWrappers.forEach(fieldWrapper => {
        // Check for error label
        if (fieldWrapper.querySelector('.sky-error-label')) {
            valid = false;
        }

        // Check for invalid div with empty inputs/selects
        const invalidDiv = fieldWrapper.querySelector('div:not(.ng-valid)');
        const inputs = fieldWrapper.querySelectorAll('input');
        const selects = fieldWrapper.querySelectorAll('select');

        // Check all inputs
        inputs.forEach(input => {
            if (invalidDiv && input.value.length === 0) {
                throwError(fieldWrapper);
                valid = false;
            }
        });

        // Check all selects 
        selects.forEach(select => {
            if (invalidDiv && select.value.length === 0) {
                throwError(fieldWrapper);
                valid = false;
            }
        });
    });

    return valid;
}



function initMultistepForm() {
    addStepClassNames();
    addExtraElements();
}

initMultistepForm();

// Add styles
const styles = document.createElement('style');
styles.textContent = \`
html,
body,
.sky-theme-modern,
form {
  --primary: #212529;
  --violet: #c4c0ff;
  font-family: "Gilroy", sans-serif;
  -webkit-font-smoothing: auto;
  --sky-background-color-page-default: #fcfcfc;
  --sky-background-color-neutral-light: #fcfcfc;
  --sky-background-color-primary-dark: #212529 !important;
  --sky-background-color-disabled: #ededee !important;
  --sky-border-color-neutral-medium: #d2d2d2 !important;
  --sky-border-color-neutral-medium-dark: #8c929c !important;
  --sky-highlight-color-info: #212529 !important;
  --sky-highlight-color-success: #72bf44;
  --sky-highlight-color-warning: #fbb034;
  --sky-highlight-color-danger: #ef4044;
  --sky-text-color-deemphasized: #686c73;
  --sky-text-color-action-primary: #212529 !important;
  --sky-text-color-action-primary-hover: #212529 !important;
  --sky-margin-inline-xs: 4px !important;
  --sky-margin-inline-sm: 8px !important;
  --sky-margin-inline-lg: 20px !important;
  --sky-margin-inline-xl: 32px !important;
  --sky-margin-inline-xxl: 64px !important;
  --sky-margin-stacked-xs: 4px!important !important;
  --sky-margin-stacked-sm: 8px !important;
  --sky-margin-stacked-lg: 20px !important;
  --sky-margin-stacked-xl: 32px !important;
  --sky-margin-stacked-xxl: 64px !important;
  --sky-padding-even-md: 16px !important;
  --sky-padding-even-xl: 32px !important;
  --sky-padding-half: 8px !important;
  --sky-background-color-input-selected: #ebfbff;
  --sky-background-color-item-selected: #ebfbff;
  --sky-switch-size: 24px !important;
  --modern-color-blue-74: #212529 !important;
  --sky-font-family-primary: "Gilroy", sans-serif !important;
}
#toggle-tablist {
  display: flex;
  flex-direction: column;
}
.sky-section-heading,
input,
label,
select,
textarea,
.sky-form-field-label,
h2 {
  font-family: "Gilroy", sans-serif !important;
}
#toggle-tablist button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: none !important;
  background: none;
  text-align: left;
  cursor: pointer;
  position: relative;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
}

#toggle-tablist button::before {
  content: "";
  width: 20px;
  height: 20px;
  border: 2px solid var(--primary);
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

#toggle-tablist button.selected::before {
  background: var(--primary);
  box-shadow: inset 0 0 0 4px var(--violet);
}

#toggle-tablist button:not(.selected)::before {
  background: white;
}

#toggle-tablist .button-label {
  font-size: 16px !important;
  color: var(--primary);
  font-weight: 600;
}

/* Reset the inline styles that might interfere */
#toggle-tablist button.selected,
#toggle-tablist button.unselected {
  background-color: transparent !important;
  color: var(--primary) !important;
  border: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
  padding-left: 0 !important;
  font-size: 16px !important;
}

.amount-buttons {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}
.amount-buttons .sky-btn.amount-btn,
.amount-buttons .sky-btn,
.amount-buttons .sky-btn#other-amount-expand,
.amount-buttons .sky-btn.amount-btn#other-amount-expand {
  border-radius: 10px !important;
  font-weight: 600 !important;
  font-size: 20px !important;
  padding: 12px 16px !important;
  transition: all 0.2s ease-out !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: auto !important;
  height: auto !important;
  white-space: nowrap !important;
  background: var(--primary) !important;
  color: #fff !important;
  border: var(--primary) !important;
  margin: 0 !important;
}
.amount-buttons .sky-btn.amount-btn:not(.unselected),
.amount-buttons .sky-btn:not(.unselected)#other-amount-expand,
.amount-buttons .sky-btn.amount-btn:not(.unselected)#other-amount-expand {
  box-shadow: inset 0 0 0 1px var(--primary) !important;
}
.amount-buttons .sky-btn.amount-btn.unselected,
.amount-buttons .sky-btn.unselected#other-amount-expand,
.amount-buttons .sky-btn.amount-btn.unselected#other-amount-expand {
  background: #fff !important;
  color: var(--primary) !important;
}
.amount-buttons .sky-btn.amount-btn.unselected:hover,
.amount-buttons .sky-btn.unselected#other-amount-expand:hover {
  background: #cdcfd2 !important;
  box-shadow: inset 0 0 0 2px var(--primary) !important;
}

div.horizontal-ladder:has(.other-amount.other-amount-wrapper) {
  width: 100% !important;
}

.other-amount.other-amount-wrapper {
  background: #fff !important;
  border: 1px solid #cdcfd2 !important;
  border-radius: 10px !important;
  background: #fff !important;
  font-size: 20px !important;
  height: auto !important;
  overflow: hidden !important;
}
.other-amount.other-amount-wrapper > i {
  font-family: "Gilroy", sans-serif !important;
  display: grid !important;
  place-items: center !important;
  place-content: center !important;
  border-radius: 0px !important;
  padding: 12px !important;
  padding-right: 16px !important;
  font-weight: 500;
  font-size: 20px !important;
  background: #e8e9e9 !important;
}
.other-amount.other-amount-wrapper button i {
  color: var(--primary) !important;
}
.other-amount.other-amount-wrapper input {
  font-size: 20px !important;
  background: transparent !important;
  padding-left: 16px !important;
  padding-right: 16px !important;
  border-radius: 0px !important;
}
.other-amount.other-amount-wrapper button {
  background: transparent !important;
  transition: all 0.2s ease-out !important;
}
.other-amount.other-amount-wrapper button:hover {
  background: #cdcfd2 !important;
}
.other-amount.other-amount-wrapper button i {
  background-color: transparent !important;
  border-radius: 24px !important;
}
.other-amount.other-amount-wrapper:has(input:focus) {
  border-color: var(--primary) !important;
}

/* Multistep form logic */
.donor-form form .step-1,
.donor-form form .step-2,
.donor-form form .step-3 {
  display: none;
  font-family: "Gilroy", sans-serif !important;
}
.donor-form form[data-current-step="1"] .step-1 {
  display: block;
}
.donor-form form[data-current-step="2"] .step-2 {
  display: block;
}
.donor-form form[data-current-step="3"] .step-3 {
  display: block;
}

.donor-form form[data-current-step="1"] .back-button,
.donor-form form[data-current-step="1"] .progress-bar {
  display: none;
}
.donor-form form[data-current-step="3"] .continue-button {
  display: none;
}

/* Multistep form styling */
.donor-form form .back-button,
.donor-form form .continue-button {
  display: inline-flex;
  gap: 4px;
  flex: none;
  align-items: center;
  background: transparent;
  color: var(--primary);
  transition: all 0.2s ease-out;
}
.donor-form form .back-button {
  padding: 4px 8px;
  margin-left: -8px;
  border: none !important;
  border-radius: 10px;
}
.donor-form form .back-button #back-button-amount {
  font-weight: 600;
}
.donor-form form .back-button:hover {
  background-color: #cdcfd2;
}
.donor-form form .continue-button,
button.submitButton.paymentButton,
button.submitButton {
  display: flex;
  width: 100%;
  border-radius: 100px;
  background: var(--primary) !important;
  color: #fff;
  padding: 16px 20px;
  font-weight: bold !important;
  font-size: 24px;
  gap: 12px;
  text-align: center;
  justify-content: center;
  border: none !important;
}
.donor-form form .continue-button:hover,
button.submitButton.paymentButton:hover,
button.submitButton:hover {
  background-color: var(--violet) !important;
  box-shadow: inset 0 0 0 2px var(--primary) !important;
  color: var(--primary);
}
button {
  cursor: pointer;
}
#recurring-text {
  text-transform: lowercase;
}
form[data-current-step="3"] div.step-3:has(.sky-section-heading) {
  display: none !important;
}
button.submitButton.paymentButton i {
  order: 2;
}

.sky-theme-modern .sky-checkbox-outer-wrapper .sky-checkbox-icon-modern-checked,
.sky-theme-modern .sky-checkbox-outer-wrapper .sky-checkbox-icon-modern-checked,
.sky-theme-modern
  .sky-checkbox-outer-wrapper
  .sky-checkbox-icon-modern-indeterminate,
.sky-theme-modern
  .sky-checkbox-outer-wrapper
  .sky-checkbox-icon-modern-indeterminate {
  color: var(--primary) !important;
}
.progress-bar {
  display: block;
  height: 4px;
  background: #d3d3d4;
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
}
.progress-bar:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 80%;
  background: #27ae60;
  transition: all 0.2s ease-out;
}
form[data-current-step="3"] .progress-bar:before {
  width: 95%;
}
.dn-custom-error {
  color: var(--sky-highlight-color-danger);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.dn-custom-error:before {
  content: "\f071";
  font-family: FontAwesome;
  margin-right: var(--sky-space-gap-icon-s);
  color: var(--sky-color-icon-danger);
}

\`;
document.body.appendChild(styles);
  `;
}



// Create a wrapper for the Blackbaud donation form
(function() {
  // Store the original script content
  const originalScript = document.createElement('script');
  originalScript.src = 'https://sky.blackbaudcdn.net/static/donor-form-loader/2/main.js';
  
  // Add our custom message handler
  window.addEventListener('message', function(event) {
    if (event.origin === 'https://host.nxt.blackbaud.com') {
      if (event.data.messageType === 'height-change') {
        const iframes = document.getElementsByClassName('blackbaud-donation-form');
        if (iframes.length > 0) {
          const donationFrame = iframes[0];
          // Inject our code using postMessage
          donationFrame.contentWindow.postMessage({
            messageType: 'custom-init',
            code: getIframeCode()
          }, 'https://host.nxt.blackbaud.com');
        }
      }
    }
  });
  // Load the original script
  document.head.appendChild(originalScript);
})();

