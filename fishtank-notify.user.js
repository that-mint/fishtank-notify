// ==UserScript==
// @name         Fishtank Chat Sound
// @namespace    https://www.fishtank.live/
// @version      1
// @description  Play sound and change window title when Fishtank chat changes
// @match        https://www.fishtank.live/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const soundUrl = "https://freesound.org/data/previews/316/316903_5473258-lq.mp3"; // replace with your sound URL

    const observeTarget = document.querySelector("html body div#__next main.AppShell_app-shell__:regex(class, AppShell_app-shell__[A-Za-z0-9]{5}) div.Chat_chat__:regex(class, Chat_chat__[A-Za-z0-9]{5}) div.ChatLastItem_chat-last-item__:regex(class, ChatLastItem_chat-last-item__[A-Za-z0-9]{5}) div.ChatLastItem_text__:regex(class, ChatLastItem_text__[A-Za-z0-9]{5}) div.ChatLastItem_tts__:regex(class, ChatLastItem_tts__[A-Za-z0-9]{5})");

    const observer = new MutationObserver((mutationsList) => {
        let titleChanged = false;
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                playSound();
                if (!titleChanged) {
                    changeTitle();
                    titleChanged = true;
                }
            }
        }
    });

    observer.observe(observeTarget, { childList: true });

    function playSound() {
        const audio = new Audio(soundUrl);
        audio.play();
    }

    let originalTitle = document.title;
    let isTabFocused = true;

    window.addEventListener('focus', () => {
        isTabFocused = true;
        document.title = originalTitle;
    });

    window.addEventListener('blur', () => {
        isTabFocused = false;
    });

    function changeTitle() {
        if (isTabFocused) return;
        document.title = "!!Fishtank!!";
    }
})();
