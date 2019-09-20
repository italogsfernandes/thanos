// initialise variables

var browser = browser || chrome;

var memorialContainer = document.querySelector('.memorial-container');

var clearBtn = document.querySelector('.clear');

// add event listeners to buttons
clearBtn.addEventListener('click', clearAll);

// Display previously-saved stored victims list on startup
initialize();

function initialize() {
    /*browser.storage.local.set({['snapTitle']: 'snapVictims'}, function() {
          console.log('Value is set to ');
          console.log('snapTitle');
        }
    );*/
    browser.storage.local.get(null, 
        function (results) {
            var snapTitles = Object.keys(results);
            console.log(snapTitles);
            for (let snapTitle of snapTitles) {
                var snapVictims = results[snapTitle];
                displayVictimsList(snapTitle, snapVictims);
            }
        }
    );
}

// function to display the victims names as a memorial
function displayVictimsList(snapTitle, snapVictims) {
    // create memorial display box
    var memorialArea = document.createElement('div');
    var memorialDisplay = document.createElement('div');
    var memorialSnap_h = document.createElement('h2');
    var memorialSnap_ul = document.createElement('ul');

    memorialArea.setAttribute('class', 'snap_memorial');

    memorialSnap_h.textContent = `Killed by thanos - ${snapTitle}`;
    for(var victim of snapVictims){
        var victim_li = document.createElement('li');
        var tab_img = document.createElement('img');
        var tab_a = document.createElement('a');

        tab_img.src = victim.favIconUrl;
        tab_a.href = victim.url;
        tab_a.textContent = victim.title;

        tab_img.width = "16";
        tab_img.height = "16";
        tab_a.style = "padding-right:12px;text-decoration:none;";

        victim_li.appendChild(tab_img);
        victim_li.appendChild(tab_a);
        memorialSnap_ul.appendChild(victim_li);
    }

    memorialSnap_ul.style = "list-style-type:none;"

    memorialDisplay.appendChild(memorialSnap_h);
    memorialDisplay.appendChild(memorialSnap_ul);
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
    console.log('browser.storage.local.clear()');
}
