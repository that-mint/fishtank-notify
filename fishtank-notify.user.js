// ==UserScript==
// @name         Fishtank Chat Sound with Tab Title Change
// @namespace    none
// @version      1
// @description  Plays a sound when a new message is received in Fishtank chat and changes the title of the tab when the tab is not focused
// @match        https://www.fishtank.live/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const soundUrl = "https://github.com/that-mint/fishtank-notify/raw/main/audio.mp3";
    const audio = new Audio(soundUrl);

    const targetNode = document.querySelector('html body div#__next main[class^="AppShell_app-shell"] div[class^="Chat_chat"]');

    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver(function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const lastItem = targetNode.querySelector('div[class^="ChatLastItem_chat-last-item"][class$="__*"]');
                if (lastItem) {
                    const ttsDiv = lastItem.querySelector('div[class^="ChatLastItem_tts"][class$="__*"]');
                    const textDiv = lastItem.querySelector('div[class^="ChatLastItem_text"][class$="__*"]');
                    if (ttsDiv && ttsDiv.textContent.trim() !== "") {
                        audio.play();
                        if (!document.hasFocus()) {
                            document.title = "!!Fishtank!!";
                        }
                    } else if (textDiv && textDiv.textContent.trim() !== "") {
                        audio.play();
                        if (!document.hasFocus()) {
                            document.title = "!!Fishtank!!";
                        }
                    }
                }
            }
        }
    });

    observer.observe(targetNode, config);

    document.addEventListener('visibilitychange', function() {
        if (document.hasFocus()) {
            document.title = "Fishtank";
        } else {
            document.title = "!!Fishtank!!";
        }
    });
})();
