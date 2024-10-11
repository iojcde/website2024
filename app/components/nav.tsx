// @ts-nocheck
"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect } from "react";

import {
  Dock,
  FlaskConical,
  Github,
  Home,
  Info,
  ScrollText,
  Camera,
} from "lucide-react";
import Link from "next/link";
import DockItem from "./dock/item";
import { GitHubLogoIcon, InfoCircledIcon } from "@radix-ui/react-icons";

const Wrapper = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const matches = useMediaQuery("(max-width: 700px)");

  if (!isClient) return <dock-mobile>{children}</dock-mobile>;

  if (!matches) {
    return (
      <dock-wrapper id="dock" gap="8">
        {children}
      </dock-wrapper>
    );
  }
  return <dock-mobile class="visible"> {children}</dock-mobile>;
};

const Nav = () => {
  return (
    <nav suppressHydrationWarning>
      <Wrapper>
        <DockItem href="/">
          <Home size={16} />
        </DockItem>
        <div className="splitter"></div>
        <DockItem href="/labs">
          <FlaskConical size={16} />
        </DockItem>
        <DockItem href="/blog">
          <ScrollText size={16} />
        </DockItem>
        <DockItem href="/photos">
          <Camera size={16} />
        </DockItem>{" "}
        <DockItem href="/about">
          <Info size={17} />
        </DockItem>
      </Wrapper>
    </nav>
  );
};

export default Nav;
