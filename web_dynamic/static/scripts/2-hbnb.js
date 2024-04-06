$(document).ready(function () {
  let checkedAmenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  // AJAX request to check API status
  $.get('http://0.0.0.0:5001/api/v1/status/')
    .done(function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').addClass('available1');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus, errorThrown);
    });
});
