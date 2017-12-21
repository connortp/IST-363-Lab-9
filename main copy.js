$(function(){
    var key = 'AIzaSyBPkv-NI1X8sTGFi0f5pRECmeJKAvc1y1o';

    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            "key": key,
            "maxResults": "8",
            "part": "snippet",
            "q": "Corgi",
            "type": "video"
        },
        method: 'GET'
    })
    .done(function(response){
        console.log(response.items);
        $.each(response.items, function(index, video){
           $('.corgi-videos .video-list').append('<li data-video-id="' + video.id.videoId + '"> <a href="https://youtube.com/watch?v= '+ video.id.videoId +'"><img src="'+ video.snippet.thumbnails.medium.url + '" /><div>Video: ' + video.snippet.title + ' </div></a></li>')
        });
    })

     $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            "key": key,
            "maxResults": "8",
            "part": "snippet",
            "q": "Husky",
            "type": "playlist"
        },
        method: 'GET'
    })
    .done(function(response){
        console.log(response.items);
        $.each(response.items, function(index, video){
           $('.husky-playlists .playlist-list').append('<li data-playlist-id="' + video.id.videoId + '"> <a href="https://youtube.com/playlist?list='+ video.id.videoId +'"><img src="'+ video.snippet.thumbnails.medium.url + '" /><div>Video: ' + video.snippet.title + ' </div></a></li>')
        });
    })

     $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            "key": key,
            "maxResults": "8",
            "part": "snippet",
            "q": "Dachshund",
            "type": "channel"
        },
        method: 'GET'
    })
                  .done(function(response){
                  console.log(response.items);
                  $.each(response.items, function(index, video){
                     $('.dachshund-channels .channel-list').append('<li data-video-id="' + video.id.videoId + '"> <a href="https://youtube.com/channel/'+ video.id.videoId +'"><img src="'+ video.snippet.thumbnails.medium.url + '" /><div>Video: ' + video.snippet.title + ' </div></a></li>')
                  });
              })

   
    $('#search').keypress(function(event){
        if(event.keyCode == 13){
            event.preventDefault();
            var query = $('#search').val() + " dog";
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search',
                data: {
                    "key": key,
                    "maxResults": "4",
                    "part": "snippet",
                    "q": query,
                    "type": "video"
                },
                method: 'GET'
            })
                .done(function(response){
                console.log(response.items);
                $.each(response.items, function(index, video){
                   $('.search-results .video-list').append('<li data-video-id="' + video.id.videoId + '"> <a href="https://youtube.com/watch?v= '+ video.id.videoId +'"><img src="'+ video.snippet.thumbnails.medium.url + '" /><div>Video: ' + video.snippet.title + ' </div></a></li>')
                });

                $('.search-results').show();
                $('#search').val("");
            })
        }
    });

    $('#search').keypress(function(event){

    });
    $(document).on('click', '.video-list li', function(event){
        event.preventDefault();
        var src = $(this).data('video-id');
        var iframeSrc = 'https://youtube.com/embed/' + src;

        $('#modal').addClass('visible');

        $('.modal-player').html("<iframe height=315 width=506 allowfullscreen frameborder='0' src=" + iframeSrc + "></iframe>")
    });
    $('.modal-close').click(function(event){
        event.preventDefault();
        $('.modal-player').html("");
        $('#modal').removeClass('visible');
    })
});
