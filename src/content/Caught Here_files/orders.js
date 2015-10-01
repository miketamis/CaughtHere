$(document).on('ready', function(){
  var google_api_key = 'AIzaSyBcTKitKGob2cGo2DTHWp5PbIj4BFFBVrM'

  var date_choice_template = '<div class="date-choice">' +
                                 '<div class="date-num"></div>' +
                                 '<div class="date-month"></div>' +
                             '</div>';

  var species_choice_template = '<div class="species-choice">' +
                                '<div class="species-name"></div>' +
                            '</div>';

  var boat_choice_template = '<div class="boat-choice">' +
                                 '<div class="boat-name"></div>' +
                             '</div>';

  var number_choice_template = '<div class="date-choice">' +
                                 '<div class="number-choice"></div>' +
                               '</div>';

  var confirm_order_template = '<div class="confirm-order nohover">' +
                                   '<h3 >' +
                                      'Your Ordering 2 Blue Cod from the Mandaly Bay for the 20th of September - that will be $45 Devlivered</h3>' +
                                   '<h3>' +
                                   '<div>' +
                                     '<input class="phone_number form-control" type="text" placeholder="phone number" />' +
                                   '</div>' +
                                   '<div>' +
                                     '<textarea name="message" cols="50" rows="4" class="form-control" placeholder="Video message from skipper enter text here - messages are $5"/>' +
                                   '</div>' +
                                     '<button class="btn btn-default order_completed" aria-label="Left Align">' +
                                        '<span class="glyphicon glyphicon-phone glyphicon-align-left">' +
                                         'Done'
                                         '</span>' +
                                      '</button>' +
                                '</div>';

  var order = {};

  var icon_image = '/images/fishingboat.png';

  var date_title = "Which date would you like your fish?";
  var species_title = "Which Species Would You Like?";
  var boats_title = "Which boat would you like to order from";
  var confirm_order_title = "Confirm Order"
  var number_title = "How many fish would you like?"

  var species_choice;
  var show_dates;
  var date_choice;
  var show_species;
  var show_boats;
  var map;


  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -45.964, lng: 171.77},
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    });
    map.setTilt(45);

    function displayCoordinates(pnt) {
              var lat = pnt.lat();
              lat = lat.toFixed(4);
              var lng = pnt.lng();
              lng = lng.toFixed(4);
              console.log("Latitude: " + lat + "  Longitude: " + lng);
    }

    /*google.maps.event.addListener(map, 'mousemove', function (event) {
              displayCoordinates(event.latLng);
    });*/

  }

  function addMarker(position, title) {
    var mapLabel = new MapLabel({
           text: title,
           position: new google.maps.LatLng(position.lat, position.lng),
           map: map,
           fontSize: 16,
           align: 'right'
         });

    var marker = new google.maps.Marker({
      position: position,
      icon: icon_image,
      map: map,
      title: title,
      animation: google.maps.Animation.DROP
    });
  }



 date_choice = function(date, callback){
    var self = this;
    self.options = date;
    self.callback = callback;

    return {
      render: function(){
        var div = $(date_choice_template);
        div.find('.date-num').text(self.options.num);
        div.find('.date-month').text(self.options.month);
        $(div).on('click', self.callback);
        $('.order-title').text(date_title);
        return div;
      }
    }
  }

  species_choice = function(species, callback){
    var self = this;
    self.species = species;
    self.callback = callback;

    return {
      render: function(){
        var div = $(species_choice_template);
        div.find('.species-name').text(species);
        $(div).on('click', self.callback);
        $('.order-title').text(species_title);
        return div;
      }
    }
  }

  number_choice = function(num, callback){
    var self = this;
    self.num = num;
    self.callback = callback;

    return {
      render: function(){
        var div = $(number_choice_template);
        div.find('.number-choice').text(self.num);
        $(div).on('click', self.callback);
        $('.order-title').text(number_title);
        return div;
      }
    }
  }

  boat_choice = function(boat, callback){
    var self = this;
    self.boat = boat;
    self.callback = callback;

    return {
      render: function(){
        var div = $(boat_choice_template);
        div.find('.boat-name').text(self.boat.name);
        $(div).on('click', self.callback);
        addMarker(self.boat.position, self.boat.name);
        $('.order-title').text(boats_title);
        return div;
      }
    }
  }

  var confirm_order = function(order){
    $('.order-form-container').html(confirm_order_template);
    $('.order-title').text(boats_title);
    $('.order_completed').on('click', function(){
      $('.order-form-container').html("<h3>Wonderful James Wilson we will call you this evening on 027779860</h3>");
    });
  }

  var render_order_form = function(url, item_function, callback){
    $.post(url, function(data){
      $('.order-form-container').empty();
      _.each(data, function(item){
        var thing = item_function(item, callback);
        $('.order-form-container').append(thing.render());
      });
    });
  }

  show_dates = function(){
    render_order_form('/orders/available_dates', date_choice, show_species);
  };

  show_boats = function(){
    render_order_form('/orders/available_boats', boat_choice, confirm_order);
  };

  show_numbers = function(){
    render_order_form('/orders/number_of_fish', number_choice, show_boats);
  }

  show_species = function(){
    render_order_form('/orders/available_species', species_choice, show_numbers);
  };

  show_dates();
  if( $('#map').length ){
    initMap();
  }

  $('.date-choice').on('click', function(){

  });

});
