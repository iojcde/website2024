// @ts-nocheck
"use client";

import {
  Dock,
  FlaskConical,
  Github,
  Home,
  Info,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import DockItem from "./dock/item";
import { GitHubLogoIcon, InfoCircledIcon } from "@radix-ui/react-icons";

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

        <DockItem href="/about">
          <Info size={17} />
        </DockItem>

        <DockItem href="https://github.com/iojcde">
          <Github size={16} />
        </DockItem>
      </dock-wrapper>
    </nav>
  );
};

export default Nav;
