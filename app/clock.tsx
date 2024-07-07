"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const UltraSmoothRoundedLongClock = () => {
  const [secondsRotation, setSecondsRotation] = useState(0);
  const [minutesRotation, setMinutesRotation] = useState(0);
  const [hoursRotation, setHoursRotation] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const targetRotationsRef = useRef(null);

  const calculateTargetRotations = () => {
    const now = new Date();
    // Add 3 seconds to the current time
    now.setSeconds(now.getSeconds() + 2.7);
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const milliseconds = now.getMilliseconds();

    return {
      seconds: ((seconds + milliseconds / 1000) / 60) * 360,
      minutes:
        (minutes / 60) * 360 + ((seconds + milliseconds / 1000) / 60) * 6,
      hours: ((hours % 12) / 12) * 360 + (minutes / 60) * 30,
    };
  };

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      targetRotationsRef.current = calculateTargetRotations();
    }
    const elapsed = timestamp - startTimeRef.current;

    if (elapsed < 2000) {
      // 3 second initial animation
      const progress = elapsed / 2000; // 0 to 1
      const easeProgress = easeInPower4InOut(progress);

      setSecondsRotation(
        easeProgress * (targetRotationsRef.current.seconds + 720) +
          (1 - easeProgress) * 720
      );
      setMinutesRotation(
        easeProgress * (targetRotationsRef.current.minutes + 360) +
          (1 - easeProgress) * 360
      );
      setHoursRotation(easeProgress * targetRotationsRef.current.hours);

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Switch to real-time updates
      updateTime();
    }
  };

  const easeInPower4InOut = (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const updateTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const milliseconds = now.getMilliseconds();

    setSecondsRotation(((seconds + milliseconds / 1000) / 60) * 360);
    setMinutesRotation((minutes / 60) * 360 + (seconds / 60) * 6);
    setHoursRotation(((hours % 12) / 12) * 360 + (minutes / 60) * 30);

    animationRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getHandStyle = (rotation) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transformOrigin: "top",
    transform: `translateX(-50%) rotate(${rotation - 180}deg)`,
  });

  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <button className="bg-gray-1 border-[#FF4D00] shadow-xl border-[6px] mx-auto my-auto w-4 h-4 rounded-full z-10 flex items-center justify-center"></button>

      {/* Hours Hand */}
      <div
        className="bg-white dark:bg-black  pt-20 sm:pt-28 shadow-xl"
        style={getHandStyle(hoursRotation)}
      >
        <div className="dark:bg-white bg-black w-[12px] sm:w-4 shadow-xl h-24 sm:h-[10rem] rounded-b"></div>
      </div>

      {/* Minutes Hand */}
      <div
        className="bg-white dark:bg-black pt-20 sm:pt-28  shadow-xl"
        style={getHandStyle(minutesRotation)}
      >
        <div className="dark:bg-white bg-black w-[8px] sm:w-3 shadow-xl h-40  sm:h-[16rem] rounded-b"></div>
      </div>

      {/* Seconds Hand */}
      <div
        className="bg-white dark:bg-black  pt-[15rem] sm:pt-[25rem] shadow-xl "
        style={{
          ...getHandStyle(secondsRotation),
          width: "4px",
        }}
      >
        <div className="bg-red-500 w-1 h-[4rem] rounded-b shadow-xl "></div>
      </div>
    </div>
  );
};

export default UltraSmoothRoundedLongClock;

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    (timestamp) => {
      if (previousTimeRef.current !== undefined) {
        const now = new Date();
        if (now.getSeconds() !== time.getSeconds()) {
          setTime(now);
        }
      }
      previousTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    },
    [time]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div
      suppressHydrationWarning
      className="text-gray-10 absolute text-xs top-0 left-0 p-8 font-mono"
    >
      {time.toLocaleTimeString([], { hour12: false })}{" "}
      {time.getHours() >= 12 ? "PM" : "AM"}
    </div>
  );
};

export { CurrentTime };
