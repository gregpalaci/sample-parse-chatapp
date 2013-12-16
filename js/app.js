$(document).ready(function() {
    var parseId = "RVHgiLUdXHV1KLGbzSgxQFZ6GV8mBZwXD0ZQzEtz";
    var parseRestKey = 'g3P8WK9BvJbBY5TRYRo8K0dfFWIVfrIT2ToSwlqD';


    function updateView(messages) {
      var table = $('table tbody');
      table.html('');
      var newMessages = "";
      $.each(messages.results, function(index, value) {
        var trEl = $('<tr><td>' + value.username + '</td><td>' + value.message + '</td></tr>');
        table.append(trEl);
      });
      
    }

    function getMessages() {
      $.ajax({
        url: 'https://api.parse.com/1/classes/MessageBoard',
        headers: {
          'X-Parse-Application-Id': parseId,
          'X-Parse-REST-API-Key': parseRestKey
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
          console.log('get');
          updateView(data);
        },
        error: function() {
          console.log('error');
        }
      });
    }

    getMessages();

    $('#send').click(function() {
        var username = $('.username').val(),
            message = $('.message').val();
        console.log(username);


        $.ajax({
            url: 'https://api.parse.com/1/classes/MessageBoard',
            headers: {
                'X-Parse-Application-Id': parseId,
                'X-Parse-REST-API-Key': parseRestKey
            },

            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'username': username,
                'message': message
            }),
            type: 'POST',
            success: function() {
                console.log('sent');
                getMessages();
            },
            error: function() {
                console.log('error');
            }

        });

    });

});
