$(document).ready(function() {
  var maxDisplayedAmenities = 3;
  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
    var selectedAmenities = [];

    // Loop through each checked checkbox and store Amenity ID in the array
    $('input[type="checkbox"]:checked').each(function() {
      selectedAmenities.push($(this).data('name'));
    });
    var displayAmenities = selectedAmenities.slice(0, maxDisplayedAmenities);
    var overflowCount = selectedAmenities.length - maxDisplayedAmenities;

    if (overflowCount > 0) {
      $('.amenities h4').text(displayAmenities.join(', ') + ' ... (+' + overflowCount + ' more)');
    } else {
      $('.amenities h4').text(displayAmenities.join(', '));
    }

  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(data) {
      data.forEach(function(place) {
        var article = $('<article>');
        article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
        article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div>');
        article.append('<div class="user"><b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name + '</div>');
        article.append('<div class="description">' + place.description + '</div>');

        $('section.places').append(article);
      });
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});
