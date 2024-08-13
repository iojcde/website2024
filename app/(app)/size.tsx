"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const ScreenSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        `p-8  absolute transition z-50 bottom-0 left-0 text-gray-10 font-mono text-xs`,
        !size.width && "opacity-0"
      )}
    >
      {size.width}x{size.height}
    </div>
  );
};

export default ScreenSize;
