// @ts-nocheck
"use client";

import { FlaskConical, Home, ScrollText } from "lucide-react";
import Link from "next/link";
import DockItem from "./dock/item";

const Nav = () => {
  return (
    <nav>
      <dock-wrapper id="dock" gap="8">
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
        <DockItem href="/">4</DockItem>
        <DockItem href="/">5</DockItem>
        <DockItem href="/">6</DockItem>
        <DockItem href="/">7</DockItem>
        <DockItem href="/">8</DockItem>{" "}
      </dock-wrapper>
    </nav>
  );
};

export default Nav;
