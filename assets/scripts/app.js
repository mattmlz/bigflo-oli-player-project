//AUTHOR Matthieu TOUSSAINT 
// Ver 0.1
// Video player with Bigflo & Oli
/* SUMMARY : 
1 - LAZYLOADING
2 - PLAYER
  a- Make video Visible
  b- Keyboard touch interactions
  c- Volume
  d- Play & Pause
  e- Return to start
  f- Quality
  g- Full screen
  h- Update video time
  i- Seekbar
  j- Controls hover
 */

/*********************
 ** 1 - LAZYLOADING **
 ********************/
//Make appear the logo with lazyloading
const $firstScene = document.querySelectorAll('.startScreen') //first frame with logo Visionnaire in a board
for(const $lazyLoad of $firstScene) {
  const $logo = $lazyLoad.querySelector('img')
  const $newLogo = document.createElement('img')

  $newLogo.addEventListener('load', () => {
    $lazyLoad.classList.add('loaded')
  })
  $newLogo.src = $logo.src
}


/****************
 ** 2 - PLAYER **
 ***************/

 //Set variables
const $player = document.querySelector('.player') //Container of player
const $video = $player.querySelector('.videoLq') // Video
const $controls = $player.querySelector('.controls') //Controls div
const $stateButton = $player.querySelector('.videoState') //Play-pause button
const $qualityButton = $player.querySelector('.videoQuality') //Quality button
const $firstFrame = document.querySelector('.startScreen') //div of first frame
const $fullScreen = $player.querySelector('.videoSize') //Full-screen button
const $playback = $player.querySelector('.videoPlayback') //Return button
const $currentTime = $player.querySelector('.currentTime') //div with current time
const $totalTime = $player.querySelector('.totalTime') //div with total time
const $volume = $player.querySelector('.volumeInput') //Volume input tag
const $volumeIcon = $player.querySelector('.volumeLess') //Volume icon
const $seekBar = $player.querySelector('.seekbarRange') //Input of seekbar

/*************************
 * a- Make video Visible *
 ************************/
setTimeout(function(){
  $firstFrame.style.display = 'none'
  $player.classList.add('isVisible')
  }, 3000)

/***********************************
 * b- Keyboard touchs interactions *
 **********************************/
document.body.onkeyup = (e) => {
  if (e.keyCode == 32) {  //Play and pause with spacebar
    if ($video.paused) {
      $video.play()
      $stateButton.src = 'assets/img/buttons/pause.svg'
    } else {
      $video.pause()
      $stateButton.src = 'assets/img/buttons/play.svg'
    }
  } else if (e.keyCode == 37) { //Remove 5secs to video time with left
    $video.currentTime -= 5
  } else if (e.keyCode == 39) { //Add 5secs to video time with right
    $video.currentTime += 5
  } else if (e.keyCode == 27) { //Exit fullscreen with esc
    console.log('echap') 
    echapFs() //Function set in part g-
  }
}

/*************
 * c- Volume *
 ************/
//Change video volume with cursor on input
$volume.addEventListener('input', () => {
  $video.volume = $volume.value
  let volume = $volume.value
  if (volume == 0) {
    $volumeIcon.src = 'assets/img/buttons/volume-mute.svg'
  } else if (volume >= 0.5) {
    $volumeIcon.src = 'assets/img/buttons/volume-more.svg'
  } else {
    $volumeIcon.src = 'assets/img/buttons/volume-less.svg'
  }
})

//Video mute on click on volume button
$volumeIcon.addEventListener('click', (event) => {
  event.preventDefault()
  $video.volume = $volume.value
  let volume = $volume.value
  if (volume == 0) { //if video is muted, on click put video volume on 0.8/1
    $video.volume = 0.8
    $volume.value = $video.volume
    $volumeIcon.src = 'assets/img/buttons/volume-more.svg'
  } else if (volume > 0) { //if video is not muted, mute video
    $video.volume = 0
    $volume.value = $video.volume
    $volumeIcon.src = 'assets/img/buttons/volume-mute.svg'
  }
})

/*******************
 * d- Play & Pause *
 ******************/
$stateButton.addEventListener('click', () => {
  if ($video.paused) {
    $video.play()
    $stateButton.src = 'assets/img/buttons/pause.svg'
  } else {
    $video.pause()
    $stateButton.src = 'assets/img/buttons/play.svg'
  }
})

/**********************
 * e- Return to start *
 *********************/

$playback.addEventListener('mouseup', () => {
  $video.currentTime = 0
})

/**************
 * f- Quality *
 *************/
//Change video quality + change color of button
//Implicate change source of video
$qualityButton.addEventListener('click', () => {

  if($video.src.match('LQ')) {
    $video.pause()
    const $actualTime = $video.currentTime //save current time to don't start again the video
    $video.src = 'assets/video/bigfloOli_dommage_HQ.mp4'
    $qualityButton.style.opacity = '1'
    $stateButton.src = 'assets/img/buttons/pause.svg'
    $video.currentTime = $actualTime
    $video.play()
  }

  else {
    $video.pause()
    const $actualTime = $video.currentTime
    $video.src = 'assets/video/bigfloOli_dommage_LQ.mp4'
    $qualityButton.style.opacity = '0.4'
    $stateButton.src = 'assets/img/buttons/pause.svg'
    $video.currentTime = $actualTime
    $video.play()
  }
})

/******************
 * g- Full screen *
 *****************/
//Function to exit full screen with prefixs
const echapFs = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
    $controls.style.top = '62vh'
    $controls.style.width = '700px'
    $fullScreen.src = 'assets/img/buttons/maximize.svg'
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    $controls.style.top = '62vh'
    $controls.style.width = '700px'
    $fullScreen.src = 'assets/img/buttons/maximize.svg'
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
    $controls.style.top = '62vh'
    $controls.style.width = '700px'
    $fullScreen.src = 'assets/img/buttons/maximize.svg'
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
    $controls.style.top = '62vh'
    $controls.style.width = '700px'
    $fullScreen.src = 'assets/img/buttons/maximize.svg'
  }
}

//Function to enter full screen with prefixs
const enterFs = () => {
  if ($video.requestFullscreen) {
    $video.requestFullscreen()
    $controls.style.top = '93vh'
    $controls.style.width = '100%'
    $fullScreen.src = 'assets/img/buttons/minimize.svg'
  } else if ($video.mozRequestFullScreen) {
    $video.mozRequestFullScreen()
    $controls.style.top = '93vh'
    $controls.style.width = '100%'
    $fullScreen.src = 'assets/img/buttons/minimize.svg'
  } else if ($video.webkitRequestFullscreen) {
    $video.webkitRequestFullscreen()
    $controls.style.top = '93vh'
    $controls.style.width = '100%'
    $fullScreen.src = 'assets/img/buttons/minimize.svg'
  } else {
    alert ('La version de votre navigateur ne permet pas de mettre la vidéo en plein écran')
  }
}
//Enter full screen on click
//Experimental API so we have to use prefixs
$fullScreen.addEventListener('click', () => {
  if(document.fullscreenElement || document.webkitFullscreenElement) { //to disable full screen
    echapFs()
  } else { //to display video in full screen
    enterFs()
  }
})

//Exit full screen
/* Because this is an experimental feature I don't know how
to set exitFullscreen so user have to press esc */

/************************
 * h- Update video time *
 ***********************/
//Function to format the video time
const formatTime = (time) => {
  let secs  = Math.floor(time % 60) //save secs of video in mm:ss format
  let mins  = Math.floor((time % 3600) / 60) //save mins of video in mm:ss format
  
  if (secs < 10) {
    secs = '0' + secs
    return `${mins}:${secs}`
  } else {
    return `${mins}:${secs}` // mm:ss
  }
}
//Listen to timeupdate event on video
$video.addEventListener('timeupdate', () => {
  $currentTime.textContent = formatTime($video.currentTime) //put current time in HTML
})

//Display total time
//Have to wait loadedmetadata to display total time
$video.addEventListener('loadedmetadata', () => {
  $totalTime.textContent = formatTime($video.duration) //put total time in HTML
})

/**************
 * i- Seekbar *
 *************/
//Assume that max range in an input is 100
//By default the min is 0 and max is 100
$video.addEventListener('timeupdate', () => {
  //Set value of input with video current time
  $seekBar.value = $video.currentTime * (100 / $video.duration)
})

$seekBar.addEventListener('input', () => {
  //When we change the value of the input, update the video time
  $video.currentTime = $video.duration * ($seekBar.value / 100)
})

/*********************
 * j- Controls hover *
 ********************/
$video.addEventListener('mouseenter', () => {
  $controls.style.opacity = '1'
})
$controls.addEventListener('mouseenter', () => {
  $controls.style.opacity = '1'
})

$video.addEventListener('mouseleave', () => {
  $controls.style.opacity = '0'
})
$controls.addEventListener('mouseleave', () => {
  $controls.style.opacity = '0'
})