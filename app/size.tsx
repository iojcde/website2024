"use client";
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
    <div className="p-8  absolute bottom-0 left-0 text-gray-10 font-mono text-xs">
      {size.width}x{size.height}
    </div>
  );
};

export default ScreenSize;
