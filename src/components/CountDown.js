import React, { useEffect, useState } from "react";


export const CountDownComponent = ({setTimeLeftTrigger}) => {
  const timeLeft = useCountdown(() => Date.now() + 30000)
  const { seconds } = parseMilliseconds(timeLeft);

  useEffect(() => {
    setTimeLeftTrigger(timeLeft);
  }, [timeLeft])

  return (
    <>
      <p>Your session is going to expire in: <b>{seconds}</b> {seconds <= 1 ? 'second' : 'seconds'}</p>
    </>
  )
}

export const useCountdown = (date, options = {}) => {
    const { intervalTime = 1000, now = () => Date.now() } = options;
    const [timeLeft, setTimeLeft] = useState(
      () => new Date(date()) - new Date(now())
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft((current) => {
          if (current <= 0) {
            clearInterval(interval);
  
            return 0;
          }
          return current - intervalTime;
        });
      }, intervalTime);
  
      return () => clearInterval(interval);
    }, [intervalTime]);
  
    return timeLeft;
  }

export function parseMilliseconds(milliseconds) {
if (typeof milliseconds !== 'number') {
    throw new TypeError('Expected a number');
}

return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
};
}