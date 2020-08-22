function getUsers() {
    $.ajax({
        type: 'GET',
        url: 'https://nations-online.herokuapp.com/authentication/users/',
        headers: {
            'Authorization': 'Basic ' + btoa('admin:admin')
        },
        success: function(data, status, xhr) {
            for (let i = 0; i < data.length; i++) {
                $('body').append('<p>' + data[i]['username'] + '</p>');
            }
        },
        error: function(data, status, xhr) {
            console.log('Access error');
        }
    });
};

$(document).on('load', getUsers());