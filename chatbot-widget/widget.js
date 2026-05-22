(function() {
    // 1. Create the floating button bubble in the bottom right corner
    const chatButton = document.createElement('div');
    chatButton.id = 'ai-chat-widget-button';
    chatButton.innerHTML = '💬';
    chatButton.style = `
        position: fixed; bottom: 20px; right: 20px;
        width: 60px; height: 60px; background-color: #dc2626;
        color: white; rounded-radius: 50%; border-radius: 50%;
        display: flex; items-center: center; justify-content: center;
        font-size: 28px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999999; transition: transform 0.2s ease;
    `;
    
    // 2. Create the hidden iframe container that holds our Python app
    const iframeContainer = document.createElement('div');
    iframeContainer.style = `
        position: fixed; bottom: 90px; right: 20px;
        width: 400px; height: 550px; display: none;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15); border-radius: 16px;
        overflow: hidden; z-index: 999999; bg: white;
    `;
    
    // Point this directly to your running Python server address!
    iframeContainer.innerHTML = `<iframe src="http://127.0.0.1:5000" style="width:100%; height:100%; border:none;"></iframe>`;
    
    // Append elements directly to the host website's body
    document.body.appendChild(chatButton);
    document.body.appendChild(iframeContainer);
    
    // 3. Add toggle click logic to open and close the window
    let isOpen = false;
    chatButton.addEventListener('click', () => {
        isOpen = !isOpen;
        iframeContainer.style.display = isOpen ? 'block' : 'none';
        chatButton.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    });
})();