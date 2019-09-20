var browser = browser || chrome;

function onCreated(tab) {
  // console.log(`Snap results - tab: ${tab.id}`)
  ;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}

function thanos_snap() {
    var snapVictims = [];
    chrome.tabs.query(
        {
            currentWindow: true,
            pinned: false,
            active: false
        },
        function(result) {
            result.forEach(function(tab) {
                should_die = getRandomBoolean();
                if (should_die) {
                    snapVictims.push(tab);
                    browser.tabs.remove(tab.id);
                }
            });
        }
    );
    addVictimsMemorial(snapVictims);
    var fullURL = browser.extension.getURL("memorial/index.html");
    var creating = browser.tabs.create({
        url: fullURL
    });
    // creating.then(onCreated, onError);
}

browser.browserAction.onClicked.addListener(thanos_snap);

function generateSnapTitle() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleString();
}

// Add a list to the display, and storage
function addVictimsMemorial(snapVictims) {
    console.log('addVictimsMemorial');
    snapTitle = generateSnapTitle();
    if (snapVictims.length > 0) {
        storeVictimsName(snapTitle, snapVictims);
    }
}

// function to store the victims name in storage
function storeVictimsName(snapTitle, snapVictims) {
    browser.storage.local.set({[snapTitle]: snapVictims}, function() {
          console.log('Value is set to ' + snapTitle);
        }
    );
}
