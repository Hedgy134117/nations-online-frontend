// Register function
function register() {
	$('.error').hide();
	var email = $('.signup-email').val();
	var username = $('.signup-username').val();
	var password = $('.signup-password').val();

	$.ajax({
		type: 'POST',
		url: 'https://nations-online.herokuapp.com/authentication/users/',
		data: {
			'email': email,
			'username': username,
			'password': password
		},
		success: function(jqXHR, textStatus, errorThrown) {
			console.log('Successfully registered');
		},
		error: function(jqXHR, textStatus, errorThrown) {
			var errors = JSON.parse(jqXHR.responseText);
			// error property: html selector
			var fields = {
				'email': '.email-error',
				'username': '.username-error',
				'password': '.password-error'
			};
			for (var property in errors) {
				$('.signup ' + fields[property]).html(errors[property]).show();
			};
		}
	});
};

// Log in function
function login() {
	$('.error').hide();
	var username = $('.login-username').val();
	var password = $('.login-password').val();

	$.ajax({
		type: 'GET',
		url: 'https://nations-online.herokuapp.com/authentication/login/',
		headers: {
			'Authorization': 'Basic ' + btoa(username + ':' + password)
		},
		success: function(jqXHR, textStatus, errorThrown) {
			window.localStorage.setItem('username', username);
			window.localStorage.setItem('password', password);
			window.location = 'list.html';
		},
		error: function(jqXHR, textStatus, errorThrown) {
			var errors = JSON.parse(jqXHR.responseText);
			console.log(errors);
			$('.login .error').html(errors['detail']).show();
		}
	});
};

/* $.ajax({
	type: 'GET',
	url: 'create-military',
	headers: {
		'Authorization': 'Basic ' + btoa(window.localStorage.getItem('username') + ':' + window.localStorage.getItem('password'))
	},
	error: function() {
		window.location = '404.html';
	}
}); */