$('#searchF').submit(function(e){
  e.preventDefault();
});

function search(){
  //Clear current results
  $('#output').html('');
  $('#BackNext').html('');

  //Form Input
  q = $('#search_term').val();

  //GET request + API KEY Reference:https://developers.google.com/youtube/v3/docs/search/list
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q ,
      type:'video',
      key: 'AIzaSyDlDaowEIPHVIeVmtLSlCBK2rrLX93MfQs'},
      function(data){
        var nextPage = data.nextPageToken;
        var prevPage = data.prevPageToken;

        console.log(data);
        //for loop in jquery (access individual item from data)
        $.each(data.items, function(i, item){
          var output = getOutput(item); //titles + video ids...

          //Now Display them
          $('#output').append(output);
        });

        var BackNext = getButtons(prevPage,nextPage);
        //Display buttons
        $('#BackNext').append(BackNext); //grab ($) document.getElementById BackNext div
      }
    );
  }


  //Next page, summary if the button <div> is clicked then it goes to getButtons function,
  //then we get the nextPage variable which will have the next

  function nextPage(){

    var token = $('#next-btn').data('token');
    var q = $('#next-btn').data('query');

    //Clear current results
    $('#output').html('');
    $('#BackNext').html('');

    //Form Input
    q = $('#search_term').val();

    //GET request + API KEY Reference:https://developers.google.com/youtube/v3/docs/search/list
    $.get(
      "https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        q: q ,
        pageToken: token,//pageToken: token, //additional parameter passing token as a parameter
        type:'video',
        key: 'AIzaSyDlDaowEIPHVIeVmtLSlCBK2rrLX93MfQs'},
        function(data){
          var nextPage = data.nextPageToken;
          var prevPage = data.prevPageToken;

          //console.log(data);
          //for loop in jquery (access individual item from data)
          $.each(data.items, function(i, item){
            var output = getOutput(item); //titles + video ids...

            //Now Display them
            $('#output').append(output);
          });

          var BackNext = getButtons(prevPage,nextPage);
          //Display buttons
          $('#BackNext').append(BackNext); //grab $ BackNext div
        }
      );
    }

    //Previous Page function
    function prevPage(){

      var token = $('#prev-btn').data('token');
      var q = $('#prev-btn').data('query');

      //Clear current results
      $('#output').html('');
      $('#BackNext').html('');

      //Form Input
      q = $('#search_term').val();

      //GET request + API KEY Reference:https://developers.google.com/youtube/v3/docs/search/list
      $.get(
        "https://www.googleapis.com/youtube/v3/search",{
          part: 'snippet, id',
          q: q ,
          pageToken: token,//pageToken: token, //additional parameter passing token as a parameter
          type:'video',
          key: 'AIzaSyDlDaowEIPHVIeVmtLSlCBK2rrLX93MfQs'},
          function(data){
            var nextPage = data.nextPageToken;
            var prevPage = data.prevPageToken;

            console.log(data);
            //for loop in jquery (access individual item from data)
            $.each(data.items, function(i, item){
              var output = getOutput(item); //titles + video ids...

              //Now Display them
              $('#output').append(output);
            });

            var BackNext = getButtons(prevPage,nextPage);
            //Display buttons
            $('#BackNext').append(BackNext); //grab $ BackNext div
          }
        );
      }

      //getOutput function (Create the outputs: videoId, title, imgOfVideo)
      function getOutput(item){
        var videoId = item.id.videoId;
        var title = item.snippet.title;
        var thumb = item.snippet.thumbnails.high.url;
        var vidDate = item.snippet.publishedAt;
        var describ = item.snippet.description;

        //Make em strings
        var output =  '<li>' +
        '<div class="vidTitle">' +
        '<h3><a class="fancybox" data-fancybox data-type="iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
        '</div>' +
        '<div class="list-left">' +
        '<img src="'+thumb+'">' +
        '</div>' +
        '<div class="list-right">'+
        '<small> Published on '+vidDate+'</small>' +
        '<p>'+describ+'</p>' +
        '</div>' +
        '</li>' +
        // clearfix is used to fix issues related to floating child elements
        '<div class="clearFix"></div>' +
        '';
        return output;
      }

      function getButtons(prevPage, nextPage){
        if(!prevPage){ //if there is no previous page
          var BtnOutput = '<div class="btn_cont">' + //create a div for a button
          '<button id="next-btn" class="pg-btn" data-token="'+nextPage+'"data-query="'+q+'"' +
          'onclick="nextPage();">Next Page</button></div>';//button onclick event
        } else { //if there is a previous page
          var BtnOutput = '<div class="btn_box">' + //create a div for a button
          '<button id="prev-btn" class="pg-btn" data-token="'+prevPage+'" data-query="'+q+'"' +
          'onclick="prevPage();">Previous Page</button>' +
          '<button id="next-btn" class="pg-btn" data-token="'+nextPage+'"data-query="'+q+'"' +
          'onclick="nextPage();">Next Page</button></div>';//button onclick event
        }
        return BtnOutput;
      }
