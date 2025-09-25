/* 
    Creator: Nadun Bandara 2024-10-03 - Introps IT

    How to use this??
    call createToast() function to show notifications
    call removeAllToasts() function to remove notifications
*/

// Create a dynamic toast function using the provided HTML structure
function createToast(message, {
    positionClass = 'top-0 end-0', // Default position to top-right
    toastClass = 'bg-white text-dark', // Default to light background and dark text
    headerClass = 'bg-primary text-white border-0', // Default header class
    titleClass = 'text-white', // Default title class
    bodyClass = 'text-dark', // Default body class
    iconHTML = '', // Default icon HTML to empty
    title = 'Notification', // Default title
    time = '', // Default time to empty
    showCloseButton = true, // Default to show close button
    autohide = true, // Default to autohide
    delay = 5000, // Default delay to 5 seconds
    animation = true, // Default animation
    imageUrl = '' // Default image URL to empty
} = {}) {
    // Check if a toast container already exists
    let toastContainer = document.querySelector('.toast-container');

    // If the container doesn't exist, create one
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = `toast-container position-fixed ${positionClass} p-3`; // Set position class
        toastContainer.style.zIndex = 9999; // Make sure it’s on top
        document.body.appendChild(toastContainer);
    }

    // Create toast element using the provided structure
    const toastElement = document.createElement('div');
    toastElement.className = `toast fade show ${toastClass}`; // Set toast class
    toastElement.role = 'alert';
    toastElement.ariaLive = 'assertive';
    toastElement.ariaAtomic = 'true';
    toastElement.setAttribute('data-bs-autohide', autohide); // Set autohide based on options

    // Create toast header
    const toastHeader = document.createElement('div');
    toastHeader.className = `toast-header ${headerClass}`; // Set header class

    // Create image element if specified
    if (imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl; // Set the image source
        imageElement.className = 'rounded me-2'; // Add margin to the right
        imageElement.alt = 'LOGO'; // Set alt text for accessibility
        imageElement.height = 20; // Set image height
        toastHeader.appendChild(imageElement); // Append image to header
    }

    // Create icon element if specified and icon visibility is true
    if (iconHTML) {
        const iconElement = document.createElement('span');
        iconElement.innerHTML = iconHTML; // Set the icon HTML
        iconElement.className = 'me-2'; // Add margin to the right
        toastHeader.appendChild(iconElement);
    }

    // Create title element
    const strong = document.createElement('span');
    strong.className = `fw-semibold me-auto ${titleClass}`; // Set title class
    strong.innerText = title; // Set title text

    const small = document.createElement('small');
    small.innerText = time; // Set time text

    toastHeader.appendChild(strong);
    toastHeader.appendChild(small);
    
    // Create close button only if showCloseButton is true
    if (showCloseButton) {
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close'; // Move close button to the right
        closeButton.setAttribute('data-bs-dismiss', 'toast');
        closeButton.ariaLabel = 'Close';
        toastHeader.appendChild(closeButton);
    }

    // Create toast body
    const toastBody = document.createElement('div');
    toastBody.className = `toast-body ${bodyClass}`; // Set body class
    toastBody.innerHTML = message; // Set message as inner HTML

    // Append header and body to the toast element
    toastElement.appendChild(toastHeader);
    toastElement.appendChild(toastBody);

    // Append the toast to the toast container
    toastContainer.appendChild(toastElement);

    // Set the delay based on options
    const effectiveDelay = delay === -1 ? 10000000 : delay; // Show indefinitely if delay is -1

    // Initialize the toast
    const toast = new bootstrap.Toast(toastElement, {
        animation: animation,
        autohide: autohide,
        delay: effectiveDelay // Use the computed delay value
    });

    // Show the toast
    toast.show();

    // Optional: Clean up after it's hidden if autohide is true
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });

    return toast;
}

// Method to remove all toasts
function removeAllToasts() {
    const toastContainer = document.querySelector('.toast-container');
    if (toastContainer) {
        toastContainer.innerHTML = ''; // Clear all toasts
    }
}