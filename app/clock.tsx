"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const UltraSmoothRoundedLongClock: React.FC = () => {
  const [secondsRotation, setSecondsRotation] = useState(192); // 32 seconds
  const [minutesRotation, setMinutesRotation] = useState(63); // 10 minutes
  const [hoursRotation, setHoursRotation] = useState(305); // 10 hours
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<Date | null>(null);

  const getEndTime = () => {
    const now = new Date();
    now.setMilliseconds(now.getMilliseconds() + 2000); // Set end time to 3 seconds in the future
    return now;
  };

  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
      endTimeRef.current = getEndTime();
    }
    const elapsed = timestamp - startTimeRef.current;

    if (elapsed < 2000) {
      // 3 second initial animation
      const progress = elapsed / 2000; // 0 to 1
      const easeProgress = easeInOutPower4(progress);

      if (endTimeRef.current) {
        const endSeconds = endTimeRef.current.getSeconds();
        const endMinutes = endTimeRef.current.getMinutes();
        const endHours = endTimeRef.current.getHours();
        const endMilliseconds = endTimeRef.current.getMilliseconds();

        let targetSecondsRotation =
          ((endSeconds + endMilliseconds / 1000) / 60) * 360;
        let targetMinutesRotation =
          (endMinutes / 60) * 360 +
          ((endSeconds + endMilliseconds / 1000) / 60) * 6;
        let targetHoursRotation =
          ((endHours % 12) / 12) * 360 +
          (endMinutes / 60) * 30 +
          ((endSeconds + endMilliseconds / 1000) / 3600) * 30;

        // Ensure the hands always move forward
        if (targetSecondsRotation < secondsRotation)
          targetSecondsRotation += 360;
        if (targetMinutesRotation < minutesRotation)
          targetMinutesRotation += 360;
        if (targetHoursRotation < hoursRotation) targetHoursRotation += 360;

        setSecondsRotation(
          secondsRotation +
            easeProgress * (targetSecondsRotation - secondsRotation)
        );
        setMinutesRotation(
          minutesRotation +
            easeProgress * (targetMinutesRotation - minutesRotation)
        );
        setHoursRotation(
          hoursRotation + easeProgress * (targetHoursRotation - hoursRotation)
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Switch to real-time updates
      updateTime();
    }
  };

  const easeInOutPower4 = (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const updateTime = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    const milliseconds = now.getMilliseconds();

    let newSecondsRotation = ((seconds + milliseconds / 1000) / 60) * 360;
    let newMinutesRotation =
      (minutes / 60) * 360 + ((seconds + milliseconds / 1000) / 60) * 6;
    let newHoursRotation =
      ((hours % 12) / 12) * 360 +
      (minutes / 60) * 30 +
      ((seconds + milliseconds / 1000) / 3600) * 30;

    // Ensure the hands always move forward
    if (newSecondsRotation < secondsRotation) newSecondsRotation += 360;
    if (newMinutesRotation < minutesRotation) newMinutesRotation += 360;
    if (newHoursRotation < hoursRotation) newHoursRotation += 360;

    // Ensure the seconds hand rotates at least 90 degrees
    const secondsDifference = newSecondsRotation - secondsRotation;
    if (secondsDifference < 90) {
      newSecondsRotation += 360;
    }

    setSecondsRotation(newSecondsRotation);
    setMinutesRotation(newMinutesRotation);
    setHoursRotation(newHoursRotation);

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

  const getHandStyle: (r: number) => React.CSSProperties = (rotation) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transformOrigin: "top",
    transform: `translateX(-50%) rotate(${(rotation % 360) - 180}deg)`,
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

const CurrentTime: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
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
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
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
