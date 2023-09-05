import React from "react";
import { DateTime } from "luxon";

const TimeDisplay = ({ timestamp }) => {
    if (!timestamp) {
        return null;
    }
    const approxTime = DateTime.fromISO(timestamp).toRelative();

    let approxTimeArr = approxTime.split(' ');
    let shortTime = { 
        'seconds': 's', 'second': 's', 
        'minutes': 'm', 'minute': 'm', 
        'hours': 'h', 'hour': 'h', 
        'days': 'd', 'day': 'd',
        'weeks': 'w', 'week': 'w',
        'months': 'mo', 'month': 'mo',
        'years': 'y', 'year': 'y'
    }

    const formattedTime = approxTimeArr[0] + shortTime[approxTimeArr[1]];

    return <span>{formattedTime}</span>;
}

export default TimeDisplay;