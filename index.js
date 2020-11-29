/**
 * Libraries required for our FPV Video Cutta!
 */

// I dont know what this does
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

// the main cutter encoding/decoding library for our video cutta?
const ffmpeg = require('fluent-ffmpeg')
const cliProgress = require('cli-progress');
const _colors = require('colors');
const _ = require("lodash")
const durationUtils = require("./utils/duration")

ffmpeg.setFfmpegPath(ffmpegPath)

let progressInstances = {}
let numberOfInstances = 0;



async function cutVideo(section) {

  const totalVideoDuration = durationUtils.getDuration(section.startTime, section.endTime)

  let ID = numberOfInstances + ''
  numberOfInstances++;
  console.log(ID)
  progressInstances[ID] = multibar.create(100, 0);
  progressInstances[ID].start(100, 0, {
    speed: "N/A"
  });

  numberOfInstances++;


  ffmpeg('source/' + section.source_video)
    .setStartTime(section.startTime)
    .setDuration(totalVideoDuration)
    .output('destination/' + section.destination_video)
    .on('end', function (err) {
      if (!err) {
        console.log('')
        console.log(`CONVERSION DONE! Video saved at  ${section.destination_video}`)
        console.log('')
      } else {
        console.log(err)
      }

      
    })
    .on('progress', (progress) => {

      /**
       * Unfortunately, this only outputs 
       * { 
       *  frames: 20,
          currentFps: 0,
          currentKbps: 1,
          timemark: '00:00:00.42' 
        }
  
          Need to convert it to % manually
  
       */
      //console.log(progress)
      var percentage = durationUtils.getElapsedPercentage(totalVideoDuration, progress.timemark)
      progressInstances[ID].increment();
      progressInstances[ID].update(percentage, { filename: section.destination_video });
    })
    .on('error', function (err) {
      console.log('error: ', err)
    }).run()
}


var multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true
}, cliProgress.Presets.shades_grey);


var start = async()=>{

  
var sections = [{
  source_video: 'source.mp4',
  destination_video: 'testing.mp4',
  startTime: "00:01:00",
  endTime: "00:01:04"
},{
  source_video: 'source.mp4',
  destination_video: 'testing2.mp4',
  startTime: "00:01:05",
  endTime: "00:01:10"
}]


  _.forEach(sections,async(section)=>{
    await cutVideo(section)
  })
  
  console.log("ALL DONE")
  multibar.stop();
}

start();


/*
  // NOTES //
  Learn what mux, demux is
  =======================
  References :-
  =======================
  FFMPEG - https://ffmpeg.org/about.html
*/
