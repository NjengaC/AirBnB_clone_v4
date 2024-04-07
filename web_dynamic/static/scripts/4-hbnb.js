$(document).ready(function () {
  let checkedAmenities = {};

  // Handle checkbox change event
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    updateAmenitiesText();
  });

  // Handle button click event
  $('#filter-btn').click(function () {
    // Make a POST request to places_search with checked amenities
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/search_places/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
      dataType: 'json',
      success: function (data) {
        // Update the places section with filtered places
        updatePlaces(data);
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
      }
    });
  });

  // Function to update the displayed amenities text
  function updateAmenitiesText() {
    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(lst.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  }

  // Function to update the places section with filtered places
  function updatePlaces(places) {
    $('.places').empty();
    places.forEach(function (place) {
      $('.places').append('<article><h2>' + place.name + '</h2><p>' + place.description + '</p></article>');
    });
  }
});
