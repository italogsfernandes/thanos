function onCreated(tab) {
  // console.log(`Snap results - tab: ${tab.id}`)
  ;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function getCurrentWindowTabs() {
    return browser.tabs.query({
        currentWindow: true,
        pinned: false,
        active: false
    });
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function thanos_snap() {
    var snapVictims = [];
    getCurrentWindowTabs().then((tabs) => {
        for (var tab of tabs) {
            should_die = getRandomBoolean();
            if (should_die) {
                snapVictims.push(tab);
                browser.tabs.remove(tab.id);
            }
        }
        addVictimsMemorial(snapVictims);
    });
    var fullURL = browser.extension.getURL("memorial/index.html");
    var creating = browser.tabs.create({
        url: fullURL
    });
    creating.then(onCreated, onError);
}

browser.browserAction.onClicked.addListener(thanos_snap);

function generateSnapTitle() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleString();
}

// Add a list to the display, and storage
function addVictimsMemorial(snapVictims) {
    snapTitle = generateSnapTitle();
    var gettingItem = browser.storage.local.get(snapTitle);
    gettingItem.then((result) => {
        var objTest = Object.keys(result);
        if (objTest.length > 0) {
            snapTitle = snapTitle.concat(" ");
            snapTitle = snapTitle.concat(objTest.length.toString())
        }
        if (snapVictims.length > 0) {
            storeVictimsName(snapTitle, snapVictims);
        }
    });
}

// function to store the victims name in storage
function storeVictimsName(snapTitle, snapVictims) {
    var remembered_victims = browser.storage.local.set({
        [snapTitle]: snapVictims
    });
}
