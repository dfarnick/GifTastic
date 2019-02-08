var states = ["Florida", "Missouri", "Texas", "California", "Oregon", "Minnesota"];

$(document).ready(function() {
    for (var i = 0; i < states.length; i++) {
        $("#stateHere").append("<button type='button' onclick='searchGif(\"" + states[i] + "\")' class='btn btn-primary' value=' " + states[i] + "'> " + states[i] + " </button>");
    }
});

function statesButtonClicked() {
    var userInput = $('#state-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#state-input').val();

    if (userInput) {
        $('#stateHere').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC&limit=10',
            method: 'GET',
        })
        .done(function(response) {
        displayGif(response);
        })
}

function displayGif(response) {
    $('#stateGif').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src=  "' + response.data[i].images.fixed_height_still.url +
            '"data-still="' + response.data[i].images.fixed_height_still.url +
            '"data-animate="' + response.data[i].images.fixed_height.url + '" data-state="still" class="moveImage" style= "width: 250px; height: 200px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#stateGif').prepend(image);
    }

    $('.moveImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    });
}