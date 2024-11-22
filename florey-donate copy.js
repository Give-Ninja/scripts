// Separate iframe code for better maintainability
function getIframeCode() {
  return `
  console.log('hello');`;
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

