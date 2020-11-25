const moment = require("moment")


module.exports = {
    getElapsedPercentage:(totalDuration,currentDuration)=>{
        let referenceStartTime = time = moment().toDate();  // This will return a copy of the Date that the moment uses
        referenceStartTime.setHours(0);
        referenceStartTime.setMinutes(0);
        referenceStartTime.setSeconds(0);
        referenceStartTime.setMilliseconds(0);

        let currentTime = moment(currentDuration,"HH:mm:ss.SSSZ")
        var duration = moment.duration(currentTime.diff(referenceStartTime));

        return duration.asSeconds()*100/totalDuration
    },
    getDuration:(startTime,endTime)=>{
        var t1 = moment(startTime, "hh:mm:ss");
        var t2 = moment(endTime, "hh:mm:ss");
        var start_date = moment(t1, 'YYYY-MM-DD HH:mm:ss');
        var end_date = moment(t2, 'YYYY-MM-DD HH:mm:ss');
        var duration = moment.duration(end_date.diff(start_date));

        return duration.hours()*60*60 +duration.minutes()*60 + duration.seconds()
    }
}