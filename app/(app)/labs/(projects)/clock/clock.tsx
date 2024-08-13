"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export const UltraSmoothRoundedLongClock: React.FC = () => {
  const [secondsRotation, setSecondsRotation] = useState(192); // 32 seconds
  const [minutesRotation, setMinutesRotation] = useState(63); // 10 minutes
  const [hoursRotation, setHoursRotation] = useState(305); // 10 hours

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const endTimeRef = useRef<Date | null>(null);

  const getEndTime = () => {
    const now = new Date();
    now.setMilliseconds(now.getMilliseconds() + 3000); // Set end time to 3 seconds in the future
    return now;
  };

  const animate = (timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
      endTimeRef.current = getEndTime();
    }
    const elapsed = timestamp - startTimeRef.current;

    if (elapsed < 3000) {
      // 3 second initial animation
      const progress = elapsed / 3000; // 0 to 1
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

        const secondsDifference = Math.abs(
          targetSecondsRotation - secondsRotation
        );

        const minutesDifference = Math.abs(
          targetMinutesRotation - minutesRotation
        );
        const hoursDifference = Math.abs(targetHoursRotation - hoursRotation);

        if (minutesDifference < hoursDifference) {
          targetMinutesRotation += 360;
        }

        if (secondsDifference - 360 < minutesDifference) {
          targetSecondsRotation += 720;
        }

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
      className={cn(
        `absolute inset-0 z-0 transition`,
        "scale-50 lg:scale-[0.6]  darfk"
      )}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="clockface overflow-hidden absolute  mx-auto my-auto aspect-square flex items-center bg-gray-2 justify-center drop-shadow-2xl shadow-inner shadow-gray-4 rounded-full p-[5.5rem]   ">
        <div className=" h-[30.5rem] relative lg:h-[42.5rem] rounded-full border-2 border-gray-2 shadow-gray-1  clockface-inner  aspect-square">
          <div className="absolute  inset-x-0 top-12 sm:top-28 text-2xl    ">
            <svg
              className="mx-auto"
              width={40}
              height={40}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-11.5 -10.23174 23 20.46348"
            >
              <title>React Logo</title>
              <circle cx="0" cy="0" r="2.05" fill="var(--gray-11)" />
              <g stroke="var(--gray-11)" stroke-width="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        </div>

        <div className="ticks absolute inset-7">
          <div className="hour">
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
          </div>
          <div className="hour">
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
            <div className="min"></div>
          </div>
          <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </div>
      </div>
      <div className="bg-gray-1 border-[#FF4D00] select-none  relative drop-shadow-xl border-[6px] mx-auto my-auto w-4 h-4 rounded-full z-10 flex items-center justify-center"></div>
      {/* Hours Hand */}
      <div
        className="bg-gray-3 dark:bg-black  pt-20 lg:pt-28 drop-shadow rounded-b"
        style={getHandStyle(hoursRotation)}
      >
        <div className="dark:bg-white bg-black w-[12px] lg:w-[18px]  h-24 lg:h-[9.5rem] rounded-b"></div>
      </div>
      {/* Minutes Hand */}
      <div
        className="bg-gray-3 dark:bg-black pt-20 lg:pt-28  drop-shadow rounded-b-full"
        style={getHandStyle(minutesRotation)}
      >
        <div className="dark:bg-white bg-black w-[8px] lg:w-3  h-40  lg:h-[13.8rem] rounde-b-sm lg:rounded-b"></div>
      </div>
      {/* Seconds Hand */}
      <div
        className="bg-gray-3 dark:bg-black  pt-28  w-4 drop-shadow rounded-xl"
        style={{
          ...getHandStyle(secondsRotation + 180),
        }}
      />
      <div
        className="bg-gray-3 dark:bg-black  pt-[15rem] lg:pt-[21.1rem]  drop-shadow rounded-b-full"
        style={{
          ...getHandStyle(secondsRotation),
          width: "4px",
        }}
      >
        <div className=" bg-yellow-500 w-[5px] h-[5.5rem] rounded-b "></div>
      </div>
    </div>
  );
};

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
      className="text-gray-10 absolute text-xs group top-0  z-10 left-0 p-8 font-mono"
    >
      {time.toLocaleTimeString([], { hour12: true, timeZone: "Asia/Seoul" })}
      {` `}
      <span className="opacity-0 group-hover:opacity-100 transition"> KST</span>
    </div>
  );
};

export { CurrentTime };
