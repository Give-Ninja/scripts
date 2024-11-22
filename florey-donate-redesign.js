(()=>{"use strict";var n={};(()=>{var t=n;function e(n){return"https://payments.blackbaud.com/Checkout/bbCheckout.2.0.js"===n||"https://api-pte-bsp.sharedservices-dev.com/Checkout/bbCheckout.2.0.js"===n}function o(n,t,o,r,a){let i=function(){const e=function(){let e=`https://host.nxt.blackbaud.com/donor-form?svcid=${n}&formId=${o}&envid=${t}&zone=${r}&loaderVersion=2.5.0`;return a?.desid&&(e=e.concat(`&desid=${a.desid}`)),a?.desname&&(e=e.concat(`&desname=${a.desname}`)),a?.appealid&&(e=e.concat(`&appealid=${a.appealid}`)),a?.campaignid&&(e=e.concat(`&campaignid=${a.campaignid}`)),e}();let i=document.createElement("iframe");i.setAttribute("id","form_"+o),i.setAttribute("class","blackbaud-donation-form"),i.setAttribute("title","Donation Form"),i.setAttribute("style","background-color: white; max-width: 600px; min-width: 320px; width: 100%; height: 100%; border: none;"),i.setAttribute("scrolling","no");const s=document.createElement("script");s.textContent="window.addEventListener(\"load\", (event) => {\n                  \n// select elements\nconst form = document.querySelector('.donor-form form.ng-untouched');\nconst elements = Array.from(form.querySelectorAll('div.fs-unmask'));\n\nconst firstStepStopIndex = elements.findIndex(\n    child => child.querySelector('.amount-buttons') !== null\n);\n\nconst secondStepStopIndex = elements.findIndex(\n    child => child.querySelector('.email-label') !== null\n);\n\n// group elements into steps\n\nfunction addStepClassNames() {\n    const firstStepElements = elements.slice(0, firstStepStopIndex + 1);\n    const secondStepElements = elements.slice(firstStepStopIndex + 1, secondStepStopIndex + 1);\n    const thirdStepElements = elements.slice(secondStepStopIndex + 1, elements.length);\n\n    firstStepElements.forEach(el => el.classList.add('step-1'));\n    secondStepElements.forEach(el => el.classList.add('step-2'));\n    thirdStepElements.forEach(el => el.classList.add('step-3'));\n\n    form.dataset.currentStep = 1;\n}\n\n// add a function to handle the step change\n\nfunction handleStepChange(event) {\n    console.log(event.target);\n    const currentStep = parseInt(form.dataset.currentStep);\n    if (currentStep == 1) {\n        document.getElementById('back-button-amount').innerText = document.querySelector('.other-amount-input') ? document.querySelector('.other-amount-input').value : document.querySelector('.amount-btn:not(.unselected)').innerText.replace(/\\D/g, '');\n        if (document.querySelector('#toggle-tablist button[value=\"Recurring donation\"].selected')) {\n            document.getElementById('recurring-text').innerText = document.querySelector('select.recurring-frequency-select').options[document.querySelector('select.recurring-frequency-select').selectedIndex].text;\n        }\n    }\n    if(event.currentTarget.classList.contains('continue-button')) {\n        console.log('continue');\n        if (currentStep < 3) {\n            form.dataset.currentStep = currentStep + 1;\n        }\n    } else if(event.currentTarget.classList.contains('back-button')) {\n        if (currentStep > 1) {\n            form.dataset.currentStep = currentStep - 1;\n        }\n    }\n}\n\n\n// add extra elements like continue and back buttons, progress bar, etc.\n\nfunction addExtraElements() {\n\n    // add continue button\n    const continueButton = document.createElement('button');\n    continueButton.innerHTML = `<span>Continue</span><svg width=\"25\" height=\"24\" viewBox=\"0 0 25 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.5 12H19.5M19.5 12L12.5 19M19.5 12L12.5 5\" stroke=\"#ECFF00\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>`;\n    continueButton.classList.add('continue-button');\n    continueButton.type = 'button';\n    continueButton.addEventListener('click', handleStepChange);\n    form.appendChild(continueButton);\n\n    // add progress bar\n    const progressBar = document.createElement('div');\n    progressBar.classList.add('progress-bar');\n    form.prepend(progressBar);\n\n    // add back button\n    const backButton = document.createElement('button');\n    backButton.innerHTML = `<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M15.8334 9.99996H4.16675M4.16675 9.99996L10.0001 15.8333M4.16675 9.99996L10.0001 4.16663\" stroke=\"#212529\" stroke-width=\"1.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\nDonating <strong>$<span id=\"back-button-amount\">0</span></strong><span id='recurring-text'></span>`;\n    backButton.type = 'button';\n    backButton.ariaLabel = 'Go back';\n    backButton.classList.add('back-button');\n    backButton.addEventListener('click', handleStepChange);\n    form.prepend(backButton);\n\n    // add third step heading\n    const thirdStepHeading = document.createElement('h2');\n    thirdStepHeading.innerText = 'Billing address';\n    thirdStepHeading.classList.add('third-step-heading', 'step-3');\n    form.insertBefore(thirdStepHeading, form.children[secondStepStopIndex + 1]);\n\n}\n\nfunction throwError(fieldWrapper) {\n    const fields = fieldWrapper.querySelectorAll('input, select');\n    fields.forEach(field => {\n        field.classList.add('sky-error');\n        field.setAttribute('aria-invalid', 'true');\n    });\n    let errorLabel = fieldWrapper.querySelector('.sky-error-label');\n    if (!errorLabel) {\n        errorLabel = document.createElement('div');\n        errorLabel.classList.add('sky-error-label', 'dn-custom-error');\n        const input = fieldWrapper.querySelector('input, select');\n        if (input) {\n            input.after(errorLabel);\n            input.addEventListener('focus', () => {\n                errorLabel.remove();\n            }, { once: true });\n        }\n    }\n    errorLabel.innerText = 'This field is required';\n}\n\nfunction isStepValid(step) {\n    if (step == 1) {\n        if (!form.getElementById('invalid-amount-error') && (form.querySelector('.amount-btn:not(.unselected)') || (form.querySelector('.other-amount-input') && form.querySelector('.other-amount-input').value.length > 0))) {\n            return true;\n        }\n        return false;\n    }\n    const fieldWrappers = form.querySelectorAll(`div.step-${step}`);\n\n    let valid = true;\n\n    fieldWrappers.forEach(fieldWrapper => {\n        // Check for error label\n        if (fieldWrapper.querySelector('.sky-error-label')) {\n            valid = false;\n        }\n\n        // Check for invalid div with empty inputs/selects\n        const invalidDiv = fieldWrapper.querySelector('div:not(.ng-valid)');\n        const inputs = fieldWrapper.querySelectorAll('input');\n        const selects = fieldWrapper.querySelectorAll('select');\n\n        // Check all inputs\n        inputs.forEach(input => {\n            if (invalidDiv && input.value.length === 0) {\n                throwError(fieldWrapper);\n                valid = false;\n            }\n        });\n\n        // Check all selects \n        selects.forEach(select => {\n            if (invalidDiv && select.value.length === 0) {\n                throwError(fieldWrapper);\n                valid = false;\n            }\n        });\n    });\n\n    return valid;\n}\n\n\n\nfunction initMultistepForm() {\n    addStepClassNames();\n    addExtraElements();\n}\n\ninitMultistepForm();\n\n// Add styles\nconst styles = document.createElement('style');\nstyles.textContent = `\nhtml,\nbody,\n.sky-theme-modern,\nform {\n  --primary: #212529;\n  --violet: #c4c0ff;\n  font-family: \"Gilroy\", sans-serif;\n  -webkit-font-smoothing: auto;\n  --sky-background-color-page-default: #fcfcfc;\n  --sky-background-color-neutral-light: #fcfcfc;\n  --sky-background-color-primary-dark: #212529 !important;\n  --sky-background-color-disabled: #ededee !important;\n  --sky-border-color-neutral-medium: #d2d2d2 !important;\n  --sky-border-color-neutral-medium-dark: #8c929c !important;\n  --sky-highlight-color-info: #212529 !important;\n  --sky-highlight-color-success: #72bf44;\n  --sky-highlight-color-warning: #fbb034;\n  --sky-highlight-color-danger: #ef4044;\n  --sky-text-color-deemphasized: #686c73;\n  --sky-text-color-action-primary: #212529 !important;\n  --sky-text-color-action-primary-hover: #212529 !important;\n  --sky-margin-inline-xs: 4px !important;\n  --sky-margin-inline-sm: 8px !important;\n  --sky-margin-inline-lg: 20px !important;\n  --sky-margin-inline-xl: 32px !important;\n  --sky-margin-inline-xxl: 64px !important;\n  --sky-margin-stacked-xs: 4px!important !important;\n  --sky-margin-stacked-sm: 8px !important;\n  --sky-margin-stacked-lg: 20px !important;\n  --sky-margin-stacked-xl: 32px !important;\n  --sky-margin-stacked-xxl: 64px !important;\n  --sky-padding-even-md: 16px !important;\n  --sky-padding-even-xl: 32px !important;\n  --sky-padding-half: 8px !important;\n  --sky-background-color-input-selected: #ebfbff;\n  --sky-background-color-item-selected: #ebfbff;\n  --sky-switch-size: 24px !important;\n  --modern-color-blue-74: #212529 !important;\n  --sky-font-family-primary: \"Gilroy\", sans-serif !important;\n}\n#toggle-tablist {\n  display: flex;\n  flex-direction: column;\n}\n.sky-section-heading,\ninput,\nlabel,\nselect,\ntextarea,\n.sky-form-field-label,\nh2 {\n  font-family: \"Gilroy\", sans-serif !important;\n}\n#toggle-tablist button {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 8px;\n  border: none !important;\n  background: none;\n  text-align: left;\n  cursor: pointer;\n  position: relative;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n}\n\n#toggle-tablist button::before {\n  content: \"\";\n  width: 20px;\n  height: 20px;\n  border: 2px solid var(--primary);\n  border-radius: 50%;\n  margin-right: 8px;\n  flex-shrink: 0;\n}\n\n#toggle-tablist button.selected::before {\n  background: var(--primary);\n  box-shadow: inset 0 0 0 4px var(--violet);\n}\n\n#toggle-tablist button:not(.selected)::before {\n  background: white;\n}\n\n#toggle-tablist .button-label {\n  font-size: 16px !important;\n  color: var(--primary);\n  font-weight: 600;\n}\n\n/* Reset the inline styles that might interfere */\n#toggle-tablist button.selected,\n#toggle-tablist button.unselected {\n  background-color: transparent !important;\n  color: var(--primary) !important;\n  border: none !important;\n  border-color: transparent !important;\n  box-shadow: none !important;\n  padding-left: 0 !important;\n  font-size: 16px !important;\n}\n\n.amount-buttons {\n  display: flex !important;\n  flex-wrap: wrap !important;\n  gap: 8px !important;\n}\n.amount-buttons .sky-btn.amount-btn,\n.amount-buttons .sky-btn,\n.amount-buttons .sky-btn#other-amount-expand,\n.amount-buttons .sky-btn.amount-btn#other-amount-expand {\n  border-radius: 10px !important;\n  font-weight: 600 !important;\n  font-size: 20px !important;\n  padding: 12px 16px !important;\n  transition: all 0.2s ease-out !important;\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: auto !important;\n  height: auto !important;\n  white-space: nowrap !important;\n  background: var(--primary) !important;\n  color: #fff !important;\n  border: var(--primary) !important;\n  margin: 0 !important;\n}\n.amount-buttons .sky-btn.amount-btn:not(.unselected),\n.amount-buttons .sky-btn:not(.unselected)#other-amount-expand,\n.amount-buttons .sky-btn.amount-btn:not(.unselected)#other-amount-expand {\n  box-shadow: inset 0 0 0 1px var(--primary) !important;\n}\n.amount-buttons .sky-btn.amount-btn.unselected,\n.amount-buttons .sky-btn.unselected#other-amount-expand,\n.amount-buttons .sky-btn.amount-btn.unselected#other-amount-expand {\n  background: #fff !important;\n  color: var(--primary) !important;\n}\n.amount-buttons .sky-btn.amount-btn.unselected:hover,\n.amount-buttons .sky-btn.unselected#other-amount-expand:hover {\n  background: #cdcfd2 !important;\n  box-shadow: inset 0 0 0 2px var(--primary) !important;\n}\n\ndiv.horizontal-ladder:has(.other-amount.other-amount-wrapper) {\n  width: 100% !important;\n}\n\n.other-amount.other-amount-wrapper {\n  background: #fff !important;\n  border: 1px solid #cdcfd2 !important;\n  border-radius: 10px !important;\n  background: #fff !important;\n  font-size: 20px !important;\n  height: auto !important;\n  overflow: hidden !important;\n}\n.other-amount.other-amount-wrapper > i {\n  font-family: \"Gilroy\", sans-serif !important;\n  display: grid !important;\n  place-items: center !important;\n  place-content: center !important;\n  border-radius: 0px !important;\n  padding: 12px !important;\n  padding-right: 16px !important;\n  font-weight: 500;\n  font-size: 20px !important;\n  background: #e8e9e9 !important;\n}\n.other-amount.other-amount-wrapper button i {\n  color: var(--primary) !important;\n}\n.other-amount.other-amount-wrapper input {\n  font-size: 20px !important;\n  background: transparent !important;\n  padding-left: 16px !important;\n  padding-right: 16px !important;\n  border-radius: 0px !important;\n}\n.other-amount.other-amount-wrapper button {\n  background: transparent !important;\n  transition: all 0.2s ease-out !important;\n}\n.other-amount.other-amount-wrapper button:hover {\n  background: #cdcfd2 !important;\n}\n.other-amount.other-amount-wrapper button i {\n  background-color: transparent !important;\n  border-radius: 24px !important;\n}\n.other-amount.other-amount-wrapper:has(input:focus) {\n  border-color: var(--primary) !important;\n}\n\n/* Multistep form logic */\n.donor-form form .step-1,\n.donor-form form .step-2,\n.donor-form form .step-3 {\n  display: none;\n  font-family: \"Gilroy\", sans-serif !important;\n}\n.donor-form form[data-current-step=\"1\"] .step-1 {\n  display: block;\n}\n.donor-form form[data-current-step=\"2\"] .step-2 {\n  display: block;\n}\n.donor-form form[data-current-step=\"3\"] .step-3 {\n  display: block;\n}\n\n.donor-form form[data-current-step=\"1\"] .back-button,\n.donor-form form[data-current-step=\"1\"] .progress-bar {\n  display: none;\n}\n.donor-form form[data-current-step=\"3\"] .continue-button {\n  display: none;\n}\n\n/* Multistep form styling */\n.donor-form form .back-button,\n.donor-form form .continue-button {\n  display: inline-flex;\n  gap: 4px;\n  flex: none;\n  align-items: center;\n  background: transparent;\n  color: var(--primary);\n  transition: all 0.2s ease-out;\n}\n.donor-form form .back-button {\n  padding: 4px 8px;\n  margin-left: -8px;\n  border: none !important;\n  border-radius: 10px;\n}\n.donor-form form .back-button #back-button-amount {\n  font-weight: 600;\n}\n.donor-form form .back-button:hover {\n  background-color: #cdcfd2;\n}\n.donor-form form .continue-button,\nbutton.submitButton.paymentButton,\nbutton.submitButton {\n  display: flex;\n  width: 100%;\n  border-radius: 100px;\n  background: var(--primary) !important;\n  color: #fff;\n  padding: 16px 20px;\n  font-weight: bold !important;\n  font-size: 24px;\n  gap: 12px;\n  text-align: center;\n  justify-content: center;\n  border: none !important;\n}\n.donor-form form .continue-button:hover,\nbutton.submitButton.paymentButton:hover,\nbutton.submitButton:hover {\n  background-color: var(--violet) !important;\n  box-shadow: inset 0 0 0 2px var(--primary) !important;\n  color: var(--primary);\n}\nbutton {\n  cursor: pointer;\n}\n#recurring-text {\n  text-transform: lowercase;\n}\nform[data-current-step=\"3\"] div.step-3:has(.sky-section-heading) {\n  display: none !important;\n}\nbutton.submitButton.paymentButton i {\n  order: 2;\n}\n\n.sky-theme-modern .sky-checkbox-outer-wrapper .sky-checkbox-icon-modern-checked,\n.sky-theme-modern .sky-checkbox-outer-wrapper .sky-checkbox-icon-modern-checked,\n.sky-theme-modern\n  .sky-checkbox-outer-wrapper\n  .sky-checkbox-icon-modern-indeterminate,\n.sky-theme-modern\n  .sky-checkbox-outer-wrapper\n  .sky-checkbox-icon-modern-indeterminate {\n  color: var(--primary) !important;\n}\n.progress-bar {\n  display: block;\n  height: 4px;\n  background: #d3d3d4;\n  border-radius: 8px;\n  margin-top: 1rem;\n  position: relative;\n}\n.progress-bar:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 80%;\n  background: #27ae60;\n  transition: all 0.2s ease-out;\n}\nform[data-current-step=\"3\"] .progress-bar:before {\n  width: 95%;\n}\n.dn-custom-error {\n  color: var(--sky-highlight-color-danger);\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.dn-custom-error:before {\n  content: \"\f071\";\n  font-family: FontAwesome;\n  margin-right: var(--sky-space-gap-icon-s);\n  color: var(--sky-color-icon-danger);\n}\n\n`;\ndocument.body.appendChild(styles);\n                });",i.appendChild(s);const d="blackbaud-donation-form_"+o,c=document.getElementById(d);if(!c)throw Error("Could not find element with ID: "+d);c.insertBefore(i,null);const l=new RegExp("[?&]bbeml=([^&#/]*)").exec(document.location.search),p=l?decodeURI(l[1])||"0":"";return i.setAttribute("src",e+"&referral="+document.referrer+"&bbeml="+p),i}();window.addEventListener("message",(n=>function(n){switch(n.data.messageType){case"checkout-loaded":i.scrollIntoView();break;case"upsell-opened":i.scrollIntoView(),window.scrollBy(0,-100);break;case"height-change":s=n.data.message.height,i.style.minHeight=s;break;case"checkout-url":!function(n){if(void 0!==n&&e(n)&&!1===function(n){return Array.from(document.getElementsByTagName("script")).some((t=>t.src===n))}(n)){let t=document.createElement("script");t.type="text/javascript",t.src=n,document.getElementsByTagName("head")[0].appendChild(t)}}(n.data.message.checkoutUrl);break;case"open-checkout":if(!n.data.message.formId||n.data.message.formId===o){i.scrollIntoView(),t=n.data.message.chargeType,r=n.data.message.checkoutConfig,a=n.data.message.processImmediately,"CREDIT_CARD_OR_WALLET"===t&&a?Blackbaud_OpenPaymentForm(r):"DIRECT_DEBIT"===t&&a?Blackbaud_OpenDirectDebitForm(r):"CREDIT_CARD_OR_WALLET"===t&&!1===a?Blackbaud_OpenStoreCardForm(r):"DIRECT_DEBIT"===t&&!1===a?Blackbaud_OpenStoreDirectDebitForm(r):console.error(`Unknown payment type: ${t}`);break}}var t,r,a,s}(n))),document.addEventListener("checkoutLoaded",(function(){i?.contentWindow?.postMessage({messageType:"checkout-loaded"},"https://host.nxt.blackbaud.com")})),document.addEventListener("checkoutComplete",(function(n){let t={messageType:"checkout-complete",message:{detail:n.detail}};i?.contentWindow?.postMessage(t,"https://host.nxt.blackbaud.com")})),document.addEventListener("checkoutCancel",(function(){i?.contentWindow?.postMessage({messageType:"checkout-canceled"},"https://host.nxt.blackbaud.com")})),document.addEventListener("checkoutError",(function(){i?.contentWindow?.postMessage({messageType:"checkout-error"},"https://host.nxt.blackbaud.com")}))}Object.defineProperty(t,"__esModule",{value:!0}),t.newBlackbaudDonationFormZoned=t.validCheckoutUrl=t.newBlackbaudDonationForm=void 0,t.newBlackbaudDonationForm=function(n,t,e,r){o(n,t,e,"usa",r)},t.validCheckoutUrl=e,t.newBlackbaudDonationFormZoned=o})(),window.BBDonorFormLoader=n})();