(() => {
  console.log("working");

	var  videoVolume=1.0;
	var  videoTime=0;
	var subTitle=true;

    const videoTag = document.querySelector('video'),
	playVideoTag= document.querySelector('#playVideo'),  
    muteVideoTag= document.querySelector('#muteVideo'),  
	videoVolumeTag = document.querySelector('#vediomute1'),  
	fullScreenTag=document.querySelector('#fullScreen'), 
	backTag=document.querySelector('#back'), 
	gotoTag=document.querySelector('#goto'), 
	videoTimeBarTag=document.querySelector('#vedioTimeBar1'), 

	videoFstTag=document.querySelector('#videoFst'), 
	videoSed=document.querySelector('#videoSed'), 

	playScreenTag=document.querySelector('#playScreen'),
	subTitleTag=document.querySelector('#subTitle'),
	lyrics_button    = document.querySelector('.lyrics-button'),	
	lyrics           = document.querySelector('.lyrics'),

	audio            = document.querySelector('#audio'),
    audioTimeBar     = document.querySelector('#audioTimeBar'),
    audioVolumeBar   = document.querySelector('#audioVolumeBar'),
    audioMute        = document.querySelector('#audioMute'),
    audioPlayPause   = document.querySelector('#audioPlayPause'),
	audioCurrentTime = document.querySelector('#audioCurrentTime'),
    audioDuration    = document.querySelector('#audioDuration');


	//init
	function initVideo(){
		videoTime = videoTag.duration;
		videoTimeBarTag.max=videoTime;
	}

	function desVideo(){
		videoTag.pause();
		videoTag.currentTime=0;
		videoTimeBarTag.value=0;
		trackSrc="";
		playVideoTag.classList.value = 'playbtn play';
	}


	videoTag.addEventListener("timeupdate", function () {
			videoTimeBarTag.value=videoTag.currentTime;
	});


	playVideoTag.addEventListener('click', function () {
		var type ;
		if(videoTag.paused  || videoTag.ended){
				type='video play';
				videoTag.play();
				playVideoTag.classList.value = 'playbtn pause';
		}else{
				type='video pause';
				videoTag.pause();
				playVideoTag.classList.value = 'playbtn play';
		}
		console.log(type);
	});


	muteVideoTag.addEventListener('click', function () {
		var type ;
		if(videoTag.muted ){
				type='mute open';
                muteVideoTag.classList.value = 'mute open';
                videoTag.muted = false;
                videoTag.volume = videoVolume;
		}else{
				type='mute close';
                muteVideoTag.classList.value = 'mute close';
                videoTag.volume = 0;
                videoTag.muted = true;
		}
		console.log(type);
	});


    videoVolumeTag.addEventListener('change', function () {
		videoVolume =videoVolumeTag.value;
		videoTag.volume = videoVolume;
		console.log("video tag volume is set :"+videoVolume);
	});

	fullScreenTag.addEventListener('click', function () {
            if (videoTag.requestFullscreen) {
                videoTag.requestFullscreen();
            } else if (videoTag.mozRequestFullScreen) {
                videoTag.mozRequestFullScreen(); // Firefox
            } else if (videoTag.webkitRequestFullscreen) {
                videoTag.webkitRequestFullscreen(); // Safari
            }
		console.log('switch to full screen');
	});


	backTag.addEventListener('click', function () {
			var  nowTime=videoTag.currentTime-10;
			if(nowTime<0){
				nowTime=0;
			}
			videoTag.currentTime=nowTime;
			videoTimeBarTag.value=nowTime;
		   console.log('video now playing at : '+nowTime+'s');
	});

	gotoTag.addEventListener('click', function () {
			var  nowTime=videoTag.currentTime+10;
		   console.log('video now playing at : '+nowTime+'s');
			if(nowTime>videoTag.duration){
				return;
			}
			videoTag.currentTime=nowTime;
			videoTimeBarTag.value=nowTime;
	});


	videoTimeBarTag.addEventListener('change', function () {
		videoTag.currentTime =videoTimeBarTag.value;
		console.log('video now playing at : '+videoTimeBarTag.value+'s');
	});


	subTitleTag.addEventListener('click', function () {
		var type ="";
		if(subTitle){
				type='close subTitle';
				var 	trackTag=document.querySelector('track');
				videoTag.removeChild(trackTag);
                subTitleTag.classList.value = 'subTitle close';    //TODO 
				subTitle=false;
		}else{
				var trackTag = document.createElement("TRACK");
				trackTag.src=trackSrc;
				trackTag.kind="subtitles";
				videoTag.appendChild(trackTag);
				type='open subTitle';
                subTitleTag.classList.value = 'subTitle open';
				subTitle=true;
		}
		console.log(type);

	});


	videoFstTag.addEventListener('click', function () {
			desVideo();
			videoTag.src="./video/Gravity.mp4";
			videoTag.poster="./images/gravity_cover.jpg";
			trackSrc="./captions/Gravity.vtt";
			initVideo();
			console.log('video now playing url : '+videoTag.src);
	});

	videoSed.addEventListener('click', function () {
			desVideo();
			videoTag.src="./video/Yellowstone.mp4";
			videoTag.poster="./images/yellowstone_cover.jpg";
			trackSrc="./captions/Yellowstone.vtt";
			initVideo();
			playScreenTag.style.display = 'none';
			document.querySelector('.video.convedio.play1').style.display = 'block';
			console.log('video now playing url : '+videoTag.src);
	});


	playScreenTag.addEventListener('click', function () {
			playScreenTag.style.display = 'none';
            document.querySelector('.video.convedio.play1').style.display = 'block';
			videoFstTag.click();
			playVideoTag.click();
	});


        lyrics_button.addEventListener('click', function () {
            var txt = lyrics_button.innerHTML;
            console.log(txt)
            if (txt == 'Hide lyrics') {
                lyrics_button.innerHTML = 'Show lyrics';
                lyrics.classList = 'lyrics hidden';

            } else {
                lyrics_button.innerHTML = 'Hide lyrics';
                lyrics.classList = 'lyrics ';
            }
        });


	audioTimeBar.addEventListener('change', function () {
		audio.currentTime =audioTimeBar.value;
		audio.play();
		console.log('audio now playing at : '+videoTimeBarTag.value+'s');
	});


	function formatTime(s) {
		m = Math.floor(s / 60);
		m = (m >= 10) ? m : "0" + m;
		s = Math.floor(s % 60);
		s = (s >= 10) ? s : "0" + s;
		return m + ":" + s;
	  }

		audio.addEventListener('loadedmetadata', function () {
			// Set to minute and seconds
			var duration = audio.duration;
			var seconds = duration.toFixed(2);
			var cleanDuration = formatTime(seconds);
			var durationTime = audioDuration;
			// Set the audio duration
			durationTime.innerHTML = cleanDuration;
			// set the timebar to 0
			audioTimeBar.value = 0;
		});

	audio.addEventListener("timeupdate", function () {
			audioTimeBar.value=audio.currentTime;
			// Set to minute and seconds
			var time = audio.currentTime;
			var seconds = time.toFixed(2);
			console.log(seconds);
			var cleartime = formatTime(seconds);
			// Set the current play value
			audioCurrentTime.innerHTML = cleartime;
	});

	audioPlayPause.addEventListener('click', function () {
		var type ;
		if(audio.paused  || audio.ended){
				type='audio play';
				audio.play();
				 audioPlayPause.classList.value = 'playbtn pause';
		}else{
				type='audio pause';
				audio.pause();
				audioPlayPause.classList.value = 'playbtn play';
		}
		console.log(type);
	});


	audioMute.addEventListener('click', function () {
		var type ;
		if(audio.muted ){
				type='mute open';
				this.classList.value = 'mute open';
                audio.muted = false;
                audio.volume = videoVolume;
		}else{
				type='mute close';
				this.classList.value = 'mute close';
                audio.volume = 0;
                audio.muted = true;
		}
		console.log(type);
	});



})();