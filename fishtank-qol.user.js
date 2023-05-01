// ==UserScript==
// @name         fishtank-qol
// @version      0.02
// @author       that-mint
// @description  Fishtank QoL script
// @match        https://www.fishtank.live/*
// ==/UserScript==

(function() {
    'use strict';

    const chatHassleDivSelector = "html body div#__next main.AppShell_app-shell__slfko div.Chat_chat__Bdojy div.Chat_hassle__rwI57";
   
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Remove frank hassle goal
                const chatHassleDiv = document.querySelector(chatHassleDivSelector);
                if (chatHassleDiv) {
                    chatHassleDiv.remove();
                    observer.disconnect();
                }
                // Remove rainbow merch button background
                const buttonSelector = ".Button_button__WqJhY.Button_small__1CiMC.AdditionalLinksPanel_merch__aAQ9W";
                const button = document.querySelector(buttonSelector);
                if (button) {
                    button.classList.remove("AdditionalLinksPanel_merch__aAQ9W");
                    button.classList.add("Button_button__WqJhY", "Button_small__1CiMC");
                }
                // Remove placeholder from input box *season pass nag*
                const nagSelector = "html body div#__next main.AppShell_app-shell__slfko div.Chat_chat__Bdojy form#chat-input.ChatInput_chat-input__2fQUr input"
                const nag = document.querySelector(nagSelector);
                if (nag) {
                    nag.setAttribute('placeholder', '');
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();