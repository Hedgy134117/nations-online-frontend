var nation = null;
var buildings = null;

function loadNation() {
    $.ajax({
        type: 'GET',
        url: 'https://nations-online.herokuapp.com/authentication/users/' + window.localStorage.getItem('userId') + '/',
        success: function(data) {
            $.ajax({
                type: 'GET',
                url: data['nation'][0],
                success: function(data) {
                    nation = data;
                    displayNation();
                }
            })
        }
    })
}

function loadBuildings() {
    $.ajax({
        type: 'GET',
        url: 'https://nations-online.herokuapp.com/nations/buildings/',
        success: function(data) {
            buildings = data;
            displayBuildings();
        }
    })
}


function createBuilding(id, buildingType) {
    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');
    console.log()

    $.ajax({
        type: 'POST',
        url: `https://nations-online.herokuapp.com/nations/nations/${nation['id']}/buildings/`,
        data: {
            info: id,
            nation: nation['id'],
            type: buildingType,
        },
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function(data) {
            alert('successfuly created building');
            loadNation();
        },
        error: function(data) {
            console.log(data);
            alert('insufficient resources');
        }
    })
}


function displayNation() {
    // Basic Info
    $('#name').html(nation['name']);
    $('#logo').html(nation['name']);
    $('#owner').html('Governed by ' + window.localStorage.getItem('username'));
    // Resources
    $('#food').html('F: ' + nation['food'])
    $('#iron').html('I: ' + nation['iron']);
    $('#aluminum').html('A: ' + nation['aluminum']);
    $('#steel').html('S: ' + nation['steel']);
    $('#wood').html('W: ' + nation['wood']);
    $('#raw-uranium').html('RU: ' + nation['rawUranium']);
    $('#enriched-uranium').html('EU: ' + nation['enrichedUranium']);
    $('#oil').html('O: ' + nation['oil']);
}

function displayBuildings() {
    for (buildingType in buildings) {
        for (buildingIndex in buildings[buildingType]) {
            name = buildings[buildingType][buildingIndex]['name'];
            desc = buildings[buildingType][buildingIndex]['desc'];
            template = `
                <div class='building'>
                    <span>${name}</span>
                    <span>${desc}</span>
                    <div class='building-cost'>
            `;
            for (buildingProperty in buildings[buildingType][buildingIndex]) {
                if (buildingProperty.includes('Cost') &&  buildings[buildingType][buildingIndex][buildingProperty] > 0) {
                    //  + buildingProperty.substr(1, buildingProperty.indexOf('Cost') - 1)
                    template += `
                        <span>
                        ${buildingProperty.charAt(0).toUpperCase()}: 
                        ${buildings[buildingType][buildingIndex][buildingProperty]}
                        </span>
                    `
                }
            }
            var tempType = '';
            switch(buildingType) {
                case 'militaryBuildings':
                    tempType = 'military';
                    break;
                case 'resourceBuildings':
                    tempType = 'resource';
                    break;
            }
            template += `
                    </div>
                <input type='button' class='button purchase-button' value='Create' onclick='createBuilding(${buildings[buildingType][buildingIndex]['id']}, "${tempType}")'>
                </div>
                `
            switch (buildingType) {
                case 'militaryBuildings':
                    $('#military-buildings').append(template);
                    break;

                case 'resourceBuildings':
                    $('#resource-buildings').append(template)
                    break;
            }
            // console.log(name);
            // console.log(desc);
            // console.log(cost);
        }
    }
}


function setupNavigation() {
    $('nav span').each(function(i) {
        $(this).attr('onclick', `navigate('${this.innerHTML}')`);
    })
}

function navigate(page) {
    $('.tab').hide();
    $('#tab-' + page.charAt(0).toLowerCase() + page.slice(1)).show();
}

$(document).ready(loadNation());
$(document).ready(loadBuildings());
$(document).ready(setupNavigation());
$(document).ready(navigate('Startup'));