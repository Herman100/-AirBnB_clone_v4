$(document).ready(function () {
  let amenityDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('.places').append('<article><div class="title_box"><h2>' + data[i].name + '</h2><div class="price_by_night">$' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest">' + data[i].max_guest + ' Guest' + (data[i].max_guest != 1 ? 's' : '') + '</div><div class="number_rooms">' + data[i].number_rooms + ' Bedroom' + (data[i].number_rooms != 1 ? 's' : '') + '</div><div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathroom' + (data[i].number_bathrooms != 1 ? 's' : '') + '</div></div><div class="description">' + data[i].description + '</div></article>');
      }
    }
  });
});
