$(document).ready(function() {
	
	var currentIndex = 0;
	 
	$('.tabular.menu .item').tab();
	$.tab('change tab', 'tab-name');
	
	
	
	$('#uploadMusic').on('click',function() {
	
		console.log("uploadMusic thumbnail "+$('#thumbnail').val().replace(/.*(\/|\\)/, ''));
		console.log("uploadMusic music "+$('#music').val().replace(/.*(\/|\\)/, ''));
		
		var thumbnailFile = $('#thumbnail')[0].files[0];
		var musicFile = $('#music')[0].files[0];
		var thumbnailName = $('#thumbnail').val().replace(/.*(\/|\\)/, '');
		var musicName = $('#music').val().replace(/.*(\/|\\)/, '');
		 
		console.dir(thumbnailFile);
		
		var link = "https://soundcast.back4app.io/classes/songs_library/";
		 
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://soundcast.back4app.io/classes/songs_library/",
		  "method": "POST",
		  "headers": {
			"X-Parse-Application-Id": "VSPdpDKRMND382hqIRFIaiVLgbkhM0E1rL32l1SQ",
			"X-Parse-REST-API-Key": "E4ZeObhQv3XoHaQ3Q6baHGgbDPOkuO9jPlY9gzgA",
			"Content-Type": "application/json",
			"Cache-Control": "no-cache",			
		  },
		  "processData": false,
		  "data": "{\"title\": \""+$('#title').val()+"\",\"link\": \""+link+musicName+"\",\t\"thumbnail\": \""+link+thumbnailName+"\",\"music_file\": {\t\"__type\": \"File\",\"name\": \""+musicFile+"\"},\"thumbnail_file\": {\"__type\": \"File\",\t\"name\": \""+thumbnailName+"\"}}"
		}

		console.dir(settings);
		
		$.ajax(settings).done(function (response) {
		
			console.log(response);
			alert("Song uploaded sucessfully");
		
		}).fail(function(response){
		
		  console.log(response);
		  alert("Song upload failed");
		  
		});;
		
		
		
	});
	
	$('#addMusic').on('click', 
	function() {    
		$.tab('change tab', 'tab-name3');
	  });

	 $('.backBtn').on('click', 
	function() {    
		$.tab('change tab', 'tab-name');
	  });
	 
	  $("#songList").on("click", ".songName" ,function() {
	  
	  currentIndex = $(this).attr('id');
	  
		$.tab('change tab', 'tab-name2');
		
		var audioLink = $(this).find("td a").attr('href');
		
		console.log(audioLink);
		
		audioElement.setAttribute('src', audioLink);
		audioElement.play();
		 
		var imgLink = $(this).find("td img").attr('src');
		
		$("#playerThumbnail").attr('src',imgLink);
		
		console.log("currentIndex"+currentIndex);
		
	  });
	  
	  
	  $.ajax({
		  type: "GET",
		  dataType: "text",
		  beforeSend: function(request) {
			request.setRequestHeader("X-Parse-Application-Id","VSPdpDKRMND382hqIRFIaiVLgbkhM0E1rL32l1SQ");
			request.setRequestHeader("X-Parse-REST-API-Key","E4ZeObhQv3XoHaQ3Q6baHGgbDPOkuO9jPlY9gzgA");
		  },
		  url: "https://soundcast.back4app.io/classes/songs_library",		  
		  processData: true,
		  success: function(response) {
		   
			var response = JSON.parse(response);	  
			
			//console.dir(serverResponse); 
			
			var results = response['results'];
			
			console.dir(results);
			
			$.each(results, function(i, item) {
			
				console.log(results[i].link);
				
				var row="";
				row=row +'<tr id="'+i+'" class="songName" >';				
				row=row +'<td>';
				row=row +'<a href="'+results[i].link+'"></a>';
				row=row +'<h4 class="ui image header">';
				row=row +'<img src="'+results[i].thumbnail+'" class="ui mini rounded image">';
				row=row +'<div class="content">'+results[i].title+'</div>';
				row=row +'</h4>';
				row=row +'</td>';     
			  row=row +'</tr>';
			  
			  
			  $("#songList").append(row);
				
				
			});
			
		  
			 
		 
		  
		  }
		});
	   
	 
	  
	  
	 var audioElement = document.createElement('audio');  
	  
	  
	  
	  
    $('#play').click(function() {
        audioElement.play();
        console.log("Status: Playing");
    });
    
    $('#pause').click(function() {
        audioElement.pause();
        console.log("Status: Paused");
    });
    
    $('#stop').click(function() {
	  audioElement.pause();
      audioElement.currentTime = 0;
    });
	   
	   
	$('#prev').click(function() {
	
	   currentIndex--;		
		playSong();
    });
	
    $('#next').click(function() {
	
	    currentIndex++;
		
		playSong();
    });   
	 
	 
	 function playSong()
	 {
		var row = $('#songList').find('tr:eq('+currentIndex+')');
	  
		$.tab('change tab', 'tab-name2');
		
		var audioLink = row.find("td a").attr('href');
		
		console.log(audioLink);
		
		audioElement.setAttribute('src', audioLink);
		audioElement.play();
		 
		var imgLink = row.find("td img").attr('src');
		
		$("#playerThumbnail").attr('src',imgLink);
		
		console.log("currentIndex"+currentIndex); 
		 
	 }
	  
	  
  var
    $headers     = $('body > h3'),
    $header      = $headers.first(),
    ignoreScroll = false,
    timer
  ;

  // Preserve example in viewport when resizing browser
  $(window)
    .on('resize', function() {
      // ignore callbacks from scroll change
      clearTimeout(timer);
      $headers.visibility('disable callbacks');

      // preserve position
      $(document).scrollTop( $header.offset().top );

      // allow callbacks in 500ms
      timer = setTimeout(function() {
        $headers.visibility('enable callbacks');
      }, 500);
    })
  ;
  $headers
    .visibility({
      // fire once each time passed
      once: false,

      // don't refresh position on resize
      checkOnRefresh: true,

      // lock to this element on resize
      onTopPassed: function() {
        $header = $(this);
      },
      onTopPassedReverse: function() {
        $header = $(this);
      }
    })
  ;
});
