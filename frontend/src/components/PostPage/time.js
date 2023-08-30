import React from "react";
import { DateTime } from "luxon";

const TimeDisplay = ({ timestamp }) => {
    const approxTime = DateTime.fromISO(timestamp).toRelative();

    let approxTimeArr = approxTime.split(' ');
    let shortTime = { 'seconds': 's', 'minutes': 'm', 'hours': 'h', 'days': 'd', 'weeks': 'w', 'months': 'mo'}

    const formattedTime = approxTimeArr[0] + shortTime[approxTimeArr[1]];

    return <span>{formattedTime}</span>;
}

export default TimeDisplay;