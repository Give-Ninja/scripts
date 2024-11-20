document.addEventListener('DOMContentLoaded', function() {
    initMultiStepForm();
});

function initMultiStepForm() {
    const form = document.querySelector('form');
    const formSections = [
        // Step 1: Donation Amount
        {
            title: 'Gift amount',
            elements: [
                '.widget:has(lib-form-amount-ladder)',
                '.widget:has(lib-form-organization-gift-widget)'
            ]
        },
        // Step 2: Personal Details
        {
            title: 'Your information',
            elements: [
                '.widget:has(lib-form-name-widget)',
                '.widget:has(lib-form-email-widget)',
                '.widget:has(lib-form-phone-widget)',
                '.widget:has(lib-form-anonymous-gift-widget)'
            ]
        },
        // Step 3: Billing Address
        {
            title: 'Billing address',
            elements: [
                '.widget:has(lib-form-address-widget)',
                '.widget:has(lib-form-comment-widget)',
                '.widget:has(lib-form-payment-button-widget)'
            ]
        }
    ];

    let currentStep = 0;

    // Function to find elements using more compatible selectors
    function findElements(selectors) {
        const elements = [];
        selectors.forEach(selector => {
            // Remove the :has() part and find parent .widget elements
            const baseSelector = selector.split(':has(')[1]?.replace(')', '') || selector;
            const matches = document.querySelectorAll(baseSelector);
            matches.forEach(match => {
                const widget = match.closest('.widget');
                if (widget && !elements.includes(widget)) {
                    elements.push(widget);
                }
            });
        });
        return elements;
    }

    // Function to show/hide elements
    function toggleElements(selectors, show) {
        const elements = findElements(selectors);
        elements.forEach(element => {
            element.style.display = show ? 'block' : 'none';
        });
    }

    // Create step indicator
    const stepIndicator = document.createElement('div');
    stepIndicator.className = 'step-indicator';
    stepIndicator.style.cssText = `
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        gap: 10px;
    `;
    form.insertBefore(stepIndicator, form.firstChild);

    // Create step dots with labels
    formSections.forEach((section, index) => {
        const dotContainer = document.createElement('div');
        dotContainer.className = 'step-dot-container';
        dotContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        `;

        const dot = document.createElement('div');
        dot.className = 'step-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ddd;
            transition: background-color 0.3s;
        `;

        const label = document.createElement('span');
        label.textContent = section.title;
        label.style.cssText = `
            font-size: 12px;
            color: #666;
        `;

        dotContainer.appendChild(dot);
        dotContainer.appendChild(label);
        stepIndicator.appendChild(dotContainer);
    });

    // Create separate containers for back and continue buttons
    const backButtonContainer = document.createElement('div');
    backButtonContainer.className = 'back-navigation';
    backButtonContainer.style.cssText = `
        display: flex;
        margin-bottom: 20px;
        padding: 10px;
    `;

    const continueButtonContainer = document.createElement('div');
    continueButtonContainer.className = 'continue-navigation';
    continueButtonContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        padding: 10px;
        position: relative;
        clear: both;
    `;

    const continueButton = document.createElement('button');
    continueButton.type = 'button';
    continueButton.textContent = 'Continue';
    continueButton.className = 'sky-btn sky-btn-primary';
    continueButton.style.cssText = `
        color: rgb(0, 0, 0);
        background-color: rgb(196, 192, 255);
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    `;

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.textContent = 'Back';
    backButton.className = 'sky-btn';
    backButton.style.cssText = `
        color: rgb(0, 0, 0);
        background-color: #ffffff;
        border: 1px solid #ddd;
        padding: 10px 20px;
        cursor: pointer;
        display: none;
    `;

    backButtonContainer.appendChild(backButton);
    continueButtonContainer.appendChild(continueButton);

    // Function to update button positions
    function updateNavigationPosition() {
        const currentSectionElements = findElements(formSections[currentStep].elements);
        
        // Position back button before the first element
        if (currentSectionElements[0]) {
            currentSectionElements[0].before(backButtonContainer);
        }
        
        // Position continue button after the last element
        const lastElement = currentSectionElements[currentSectionElements.length - 1];
        if (lastElement) {
            lastElement.after(continueButtonContainer);
        }
    }

    // Modify the navigation handlers
    continueButton.addEventListener('click', () => {
        if (currentStep < formSections.length - 1) {
            toggleElements(formSections[currentStep].elements, false);
            currentStep++;
            toggleElements(formSections[currentStep].elements, true);
            updateNavigationPosition();
            
            backButton.style.display = 'block';
            if (currentStep === formSections.length - 1) {
                continueButtonContainer.style.display = 'none';
            }
            
            updateStepIndicator();
        }
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 0) {
            toggleElements(formSections[currentStep].elements, false);
            currentStep--;
            toggleElements(formSections[currentStep].elements, true);
            updateNavigationPosition();
            
            if (currentStep === 0) {
                backButton.style.display = 'none';
            }
            continueButtonContainer.style.display = 'flex';
            
            updateStepIndicator();
        }
    });

    // Initialize navigation position
    updateNavigationPosition();

    // Hide all sections except the first one
    formSections.forEach((section, index) => {
        if (index !== 0) {
            toggleElements(section.elements, false);
        }
    });

    // Update step indicator
    function updateStepIndicator() {
        const dots = stepIndicator.querySelectorAll('.step-dot');
        dots.forEach((dot, index) => {
            dot.style.backgroundColor = index === currentStep ? 'rgb(196, 192, 255)' : '#ddd';
        });
    }

    // Hide section headers
    document.querySelectorAll('lib-form-header-widget').forEach(header => {
        const widget = header.closest('.widget');
        if (widget) {
            widget.style.display = 'none';
        }
    });
}
