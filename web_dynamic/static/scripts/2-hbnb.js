$( document ).ready(function() {
	let amenities = {};
	$('input[type="checkbox"'].change(function() {
		if ($(this).is(':checked')) {
			amenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete amenities[$(this).attr('data-id')];
		}
		$('.amenities h4').text(Object.values(amenities).join(', '));
	});

	$.ajax({
    		type: 'GET',
    		url: 'http://localhost:5001/api/v1/status/',
    		dataType: 'json',
    		success: function (data) {
      			console.log(data)
      			if (data.status === 'OK') {
        			$('#api_status').addClass('available');
      			}else {
        			$('#api_status').removeClass('available');
      			}
    		}
  	});
});
