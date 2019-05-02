function getCurrentWindowTabs() {
    return browser.tabs.query({
        currentWindow: true
    });
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function thanos_snap() {
    getCurrentWindowTabs().then((tabs) => {
        for (var tab of tabs) {
            should_die = getRandomBoolean();
            should_die = tab.active ? false : should_die;
            if (should_die) {
                console.log(`Killed by thanos: ${tab.title} <${tab.url}>`);
                browser.tabs.remove(tab.id);
            }
        }
    });
}

browser.browserAction.onClicked.addListener(thanos_snap);


//onRemoved listener. fired when tab is removed
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`The tab with id: ${tabId}, has died with thanos snap.`);

    if (removeInfo.isWindowClosing) {
        console.log(`Its window is also closing.`);
    } else {
        console.log(`Its window is not closing`);
    }
});
