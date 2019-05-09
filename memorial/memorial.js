var memorialContainer = document.querySelector('.memorial-container');

// Display previously-saved stored victims list on startup
initialize();

function initialize() {
    var gettingAllStorageItems = browser.storage.local.get(null);
    gettingAllStorageItems.then((results) => {
        var snapTitles = Object.keys(results);
        for (let snapTitle of snapTitles) {
            var snapVictims = results[snapTitle];
            displayVictimsList(snapTitle, snapVictims);
        }
    }, onError);
    displayVictimsList("snapTitle0", "snapVictims0");
    displayVictimsList("snapTitle1", "snapVictims1");
    displayVictimsList("snapTitle2", "snapVictims2");
    displayVictimsList("snapTitle3", "snapVictims3");
}

// function to display the victims names as a memorial
function displayVictimsList(snapTitle, snapVictims) {
    // create memorial display box
    var memorialArea = document.createElement('div');
    var memorialDisplay = document.createElement('div');
    var memorialH = document.createElement('h2');
    var memorialP = document.createElement('p');

    memorialArea.setAttribute('class', 'snap_memorial');

    memorialH.textContent = snapTitle;
    memorialP.textContent = snapVictims;

    memorialDisplay.appendChild(memorialH);
    memorialDisplay.appendChild(memorialP);
    memorialArea.appendChild(memorialDisplay);

    memorialContainer.appendChild(memorialArea);

    // TODO: set up listener for the delete functionality
}

// Forget everyone
function clearAll() {
    while (memorialContainer.firstChild) {
        memorialContainer.removeChild(memorialContainer.firstChild);
    }
    browser.storage.local.clear();
}
