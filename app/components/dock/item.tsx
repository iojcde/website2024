"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

type DockPosition = "top" | "right" | "bottom" | "left";
type DockDirection = "horizontal" | "vertical";

interface DockWrapperProps {
  disabled?: boolean;
  maxRange?: number;
  maxScale?: number;
  position?: DockPosition;
  direction?: DockDirection;
  size?: number;
  padding?: number;
  gap?: number;
  willChange?: boolean;
  easing?: string;
  children: React.ReactNode;
}

export const DockWrapper: React.FC<DockWrapperProps> = ({
  disabled = false,
  maxRange = 200,
  maxScale = 2,
  position = "bottom",
  direction = "horizontal",
  size = 40,
  padding = 8,
  gap = 5,
  willChange = false,
  easing = [0.25, 0.1, 0.25, 1], // cubic-bezier easing
  children,
}) => {
  const [childrenArray, setChildrenArray] = useState<React.ReactElement[]>([]);
  const [overflowed, setOverflowed] = useState(false);
  const wrapperRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    setChildrenArray(childArray);
  }, [children]);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const lastChild = wrapperRef.current.lastElementChild as HTMLElement;
        if (lastChild) {
          const lastChildRect = lastChild.getBoundingClientRect();
          const isOverflowed =
            direction === "horizontal"
              ? lastChildRect.right > wrapperRect.right
              : lastChildRect.bottom > wrapperRect.bottom;
          setOverflowed(isOverflowed);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [direction]);

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (disabled || overflowed) return;

    const { clientX, clientY } = e;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    childrenArray.forEach((child, index) => {
      const childEl = wrapperRef.current?.children[index] as HTMLElement;
      if (!childEl) return;

      const childRect = childEl.getBoundingClientRect();
      const { left, top, width, height } = childRect;
      const center =
        direction === "horizontal" ? left + width / 2 : top + height / 2;
      const distance = Math.abs(
        (direction === "horizontal" ? clientX : clientY) - center
      );
      const scale =
        distance > maxRange
          ? 1
          : 1 + (maxScale - 1) * (1 - distance / maxRange);

      childEl.style.transform = `scale(${scale})`;
    });
  };

  const handleMouseLeave = () => {
    childrenArray.forEach((_, index) => {
      const childEl = wrapperRef.current?.children[index] as HTMLElement;
      if (childEl) {
        childEl.style.transform = `scale(1)`;
      }
    });
  };

  const wrapperStyle: React.CSSProperties = {
    boxSizing: "border-box",
    margin: 0,
    padding: `${padding}px`,
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    listStyle: "none",
    gap: `${gap}px`,
    borderRadius: "inherit",
    [direction === "horizontal" ? "height" : "width"]: `${
      padding * 2 + size
    }px`,
    flexDirection: direction === "horizontal" ? "row" : "column",
    alignItems:
      position === "bottom" || position === "right" ? "flex-end" : "flex-start",
    maxWidth: direction === "horizontal" ? "80vw" : undefined,
    maxHeight: direction === "vertical" ? "90vh" : undefined,
    overflowX: direction === "horizontal" && overflowed ? "auto" : undefined,
    overflowY: direction === "vertical" && overflowed ? "auto" : undefined,
  };

  return (
    <>
      <motion.ul
        ref={wrapperRef}
        style={wrapperStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: easing }}
                >
                  {React.cloneElement(child, {
                    size,
                    easing,
                    gap,
                    direction,
                  })}
                </motion.li>
              );
            }
            return child;
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};

interface DockItemProps {
  size?: number;
  easing?: number[];
  gap?: number;
  direction?: DockDirection;
  children: React.ReactNode;
}

export const DockItem: React.FC<DockItemProps> = ({
  size = 40,
  easing = [0.25, 0.1, 0.25, 1],
  gap = 8,
  direction = "horizontal",
  children,
}) => {
  const itemStyle: React.CSSProperties = {
    position: "relative",
    width: `${size}px`,
    height: `${size}px`,
  };

  const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <motion.div
      style={itemStyle}
      className={`${direction} dock-item`}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2, ease: easing }}
    >
      <motion.div style={contentStyle}>{children}</motion.div>
      <style jsx>{`
        .dock-item::before,
        .dock-item::after {
          content: "";
          position: absolute;
        }
        .horizontal::before,
        .horizontal::after {
          width: ${gap}px;
          height: 100%;
          top: 0;
        }
        .horizontal::before {
          right: 100%;
        }
        .horizontal::after {
          left: 100%;
        }
        .vertical::before,
        .vertical::after {
          width: 100%;
          height: ${gap}px;
          left: 0;
        }
        .vertical::before {
          bottom: 100%;
        }
        .vertical::after {
          top: 100%;
        }
      `}</style>
    </motion.div>
  );
};
