var biomes = null;
var regions = null;

function loadRegions() {
    $.ajax({
        type: 'GET',
        url: 'https://nations-online.herokuapp.com/nations/regions/',
        success: function(data) {
            regions = data;
            console.log(regions);
        },
        error: function(data) {
            console.log(data);
        }
    })
}

function loadBiomes() {
    $.ajax({
        type: 'GET',
        url: 'https://nations-online.herokuapp.com/nations/biomes/',
        success: function(data) {
            biomes = data;
            console.log(biomes);
        },
        error: function(data) {
            console.log(data);
        }
    })
}

function getRegion(name) {
    $('#nation-create').show();
    for (var i = 0; i < regions.length; i++) {
        if (regions[i]['name'] == name) {
            var name = regions[i]['name'];
            var biome = regions[i]['biome'];
            for (var j = 0; j < biomes.length; j++) {
                if (biome == biomes[j]['name']) {
                    biome = biomes[j];
                }
            }

            $('#nation-create #region-name').html(regions[i]['name']);
            $('#nation-create #nation-biome').html(biome['name']);
            $('#nation-create #nation-boosts').empty();
            for (var j = 0; j < biome['boosts'].length; j++) {
                var boost = biome['boosts'][j]
                var resource = boost['resource'].charAt(0).toUpperCase() + boost['resource'].slice(1);
                var percentage = boost['percentage'] * 100
                if (percentage > 0) {
                    $('#nation-create #nation-boosts').append(`<span class='subtitle buff'>${resource} +${percentage}%</span>`)
                }
                else {
                    $('#nation-create #nation-boosts').append(`<span class='subtitle debuff'>${resource} ${percentage}%</span>`)
                }
            }
        }
    }
}

function createNation() {
    var name = $('.nation-name').val();
    var region = 0;
    for (var i = 0; i < regions.length; i++) {
        if (regions[i]['name'] == $('#region-name').html()) {
            region = i;
        }
    }

    var username = window.localStorage.getItem('username');
    var password = window.localStorage.getItem('password');

    $.ajax({
        type: 'POST',
        url: 'https://nations-online.herokuapp.com/nations/nations/',
        data: {
            'name': name,
            'region': region
        },
        headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
        },
        success: function(data) {
            console.log(data);
            alert('Nation Created!');
        },
        error: function(data) {
            console.log(data);
            alert('error');
        }
    })
}

$(document).ready(loadRegions());
$(document).ready(loadBiomes());
$(document).ready($('#nation-create').hide());

// $(document).bind('mousemove', function(e) {
//     $('#region-info').css({
//         left: e.pageX + 5,
//         top: e.pageY - 20,
//     });
// });