$( document ).ready(function() {
	let amenities = {};
	$('input[type="checkbox"]').change(function() {
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

	let postData = {
    		"states": "",
    		"cities": "",
    		"amenities": ""
  	}
  	$.ajax({
    		type: 'POST',
    		url: 'http://localhost:5001/api/v1/places_search',
    		data: JSON.stringify({ postData }),
    		contentType: 'application/json',
    		success: function (data) {
      			$.each(data, function (index, place) {
        			var places = '<article>' +
          			  	'<div class="title_box">' +
          				'<h2>' + place.name + '</h2>' +
          				'<div class="price_by_night">$' + place.price_by_night + '</div>' +
          				'</div>' +
          				'<div class="information">' +
          				'<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? 's' : '') + '</div>' +
          				'<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? 's' : '') + '</div>' +
          				'<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms != 1 ? 's' : '') + '</div>' +
          				'</div>' +
          				'<div class="description">' + place.description + '</div>' +
          				'</article>';

        			$('section.places').append(places);
      			});

      			console.log("article total:" + $("section.places article").length)
    		},
    		error: function (error) {
      			console.error('Error:', error);
    		}
  });
});
