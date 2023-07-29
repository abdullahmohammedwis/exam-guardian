import React, { useState, useEffect } from 'react';
import '../assets/Stopwatch.css'; // Make sure this file contains the CSS code from the previous response

const getLondonTime = () => {
  const londonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' });
  const [, timePart] = londonTime.split(', ');

  return timePart;
};

const Stopwatch = ({ finishTime }) => {
  const [currentTime, setCurrentTime] = useState(getLondonTime());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getLondonTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isRunning && currentTime >= finishTime) {
      setIsRunning(false);
    }
  }, [currentTime, finishTime, isRunning]);

  const formatTime = (time) => {
    return time;
  };

  const formatTimePMAM = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const parsedHours = parseInt(hours, 10);
    const amOrPm = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes}:${seconds} ${amOrPm}`;
};

  return (
    <div>
      <div className="stopwatch" style={{ fontFamily: 'Digital-7 Mono', fontSize: '12rem' }}>
        {formatTimePMAM(formatTime(currentTime))}
      </div>
    </div>
  );
};

export default Stopwatch;
