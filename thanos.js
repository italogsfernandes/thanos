// generic error handler
function onError(error) {
    console.log(error);
}

function getCurrentWindowTabs() {
    return browser.tabs.query({
        currentWindow: true
    });
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function thanos_snap() {
    var snapVictims = "";
    getCurrentWindowTabs().then((tabs) => {
        for (var tab of tabs) {
            should_die = getRandomBoolean();
            should_die = tab.active ? false : should_die;
            if (should_die) {
                // TODO: Future use: Tab.favIconUrl in memorial list
                var killed_msg = `* Killed by thanos: ${tab.title} <${tab.url}><br>`;
                console.log(killed_msg);
                snapVictims = snapVictims.concat(killed_msg);
                browser.tabs.remove(tab.id);
            }
        }
        addVictimsMemorial(snapVictims);
    });
}

browser.browserAction.onClicked.addListener(thanos_snap);

function generateSnapTitle() {
    var snapTitle = "Snap ";
    var d = new Date();
    snapTitle = snapTitle.concat(d.toDateString());
    snapTitle = snapTitle.concat(" ");
    snapTitle = snapTitle.concat(d.getHours());
    snapTitle = snapTitle.concat(":");
    snapTitle = snapTitle.concat(d.getMinutes());
    return snapTitle;
}

// Add a list to the display, and storage
function addVictimsMemorial(snapVictims) {
    snapTitle = generateSnapTitle();
    var gettingItem = browser.storage.local.get(snapTitle);
    gettingItem.then((result) => {
        var objTest = Object.keys(result);
        if (objTest.length > 0){
            snapTitle = snapTitle.concat(" ");
            snapTitle = snapTitle.concat(objTest.length.toString())
        }
        if (snapTitle !== '' && snapVictims !== '') {
            storeVictimsName(snapTitle, snapVictims);
        }
    }, onError);
}

// function to store the victims name in storage
function storeVictimsName(snapTitle, snapVictims) {
    var remembered_victims = browser.storage.local.set({
        [snapTitle]: snapVictims
    });
}

//onRemoved listener. fired when tab is removed
browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(`The tab with id: ${tabId}, has died with thanos snap.`);

    if (removeInfo.isWindowClosing) {
        console.log(`Its window is also closing.`);
    } else {
        console.log(`Its window is not closing`);
    }
});
