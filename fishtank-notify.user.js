// ==UserScript==
// @name         FishTank Live Notification Sound
// @version      0.01
// @description  Plays a sound when the FishTank Live notification element changes and displays a volume icon to control the sound volume
// @match        https://www.fishtank.live/*
// ==/UserScript==

(function() {
    'use strict';

    // Import Font Awesome
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://use.fontawesome.com/releases/v5.15.3/css/all.css';
    document.head.appendChild(fontAwesomeLink);

    // Create the volume icon element
    const volumeIcon = document.createElement('i');
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.style.position = 'fixed';
    volumeIcon.style.bottom = '20px';
    volumeIcon.style.right = '20px';
    volumeIcon.style.fontSize = '30px';
    volumeIcon.style.cursor = 'pointer';
    document.body.appendChild(volumeIcon);

    // Create the volume bar element
    const volumeBar = document.createElement('input');
    volumeBar.type = 'range';
    volumeBar.min = '0';
    volumeBar.max = '1';
    volumeBar.step = '0.01';
    volumeBar.value = '0.5';
    volumeBar.style.position = 'fixed';
    volumeBar.style.bottom = '60px';
    volumeBar.style.right = '20px';
    volumeBar.style.width = '150px';
    volumeBar.style.display = 'none';
    document.body.appendChild(volumeBar);

    // Create the audio element
    const audio = new Audio('https://github.com/that-mint/that-mint.github.io/blob/29002a62d49be1b0097be9eb491b22c7845bdbde/audio.mp3?raw=true'); // Replace with the URL of your audio file
    audio.volume = volumeBar.value;

    // Listen for volume icon click events
    volumeIcon.addEventListener('click', () => {
        volumeBar.style.display = volumeBar.style.display === 'none' ? 'block' : 'none';
    });


    // Remove frank hassle goal

    const chatHassleDivSelector = "html body div#__next main.AppShell_app-shell__slfko div.Chat_chat__Bdojy div.Chat_hassle__rwI57";
    const chatUnsubbedMsgSelector = "html body div#__next main.AppShell_app-shell__slfko div.Chat_chat__Bdojy form#chat-input.ChatInput_chat-input__2fQUr input"

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const chatHassleDiv = document.querySelector(chatHassleDivSelector);
                if (chatHassleDiv) {
                    chatHassleDiv.remove();
                    observer.disconnect();
                }
                // Remove no season pass message
                const chatUnsubbedMsg = document.querySelector(chatUnsubbedMsgSelector);
                if (chatUnsubbedMsg) {
                    chatUnsubbedMsg.remove();
                    observer.disconnect();
                }
                // Remove rainbow merch button background
                const buttonSelector = ".Button_button__WqJhY.Button_small__1CiMC.AdditionalLinksPanel_merch__aAQ9W";
                const button = document.querySelector(buttonSelector);
                if (button) {
                    button.classList.remove("AdditionalLinksPanel_merch__aAQ9W");
                    button.classList.add("Button_button__WqJhY", "Button_small__1CiMC");
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
