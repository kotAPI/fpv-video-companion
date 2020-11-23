const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

const sourceVid = 'video_in.mp4'
const outputVid = "video_out.mp4"

var startTime = {
    hour:'00',
    mins:'00',
    seconds:'24'
}


ffmpeg('source/'+sourceVid)
  .setStartTime(`${startTime.hour}:${startTime.mins}:${startTime.seconds}`)
  .setDuration('10')
  .output('destination/'+outputVid)
  .on('end', function(err) {
    if(!err) { console.log('conversion Done') }
  })
  .on('progress', function(progress) {
      console.log(progress)
    //console.log('Processing: ' + progress + '% done');
  })
  .on('error', function(err){
    console.log('error: ', err)
  }).run()