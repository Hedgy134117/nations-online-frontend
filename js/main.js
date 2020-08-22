$('input[type="radio"').click(function() {
	if ($('#signup-select').is(':checked')) {
		$('.login').hide();
		$('.signup').show();
	} else {
		$('.signup').hide();
		$('.login').show();
	};
});

$(".show-hide").click(function() {
	$(this).toggleClass("fa-eye fa-eye-slash");
	var input = $($(this).attr("toggle"));
	if (input.attr("type") == "password") {
		input.attr("type", "text");
	} else {
		input.attr("type", "password");
	};
});