// @ts-nocheck
import { FlaskConical, Home, ScrollText } from "lucide-react";
import Link from "next/link";
const Nav = () => {
  return (
    <dock-wrapper id="dock" gap="8">
      <dock-item>
        <Link href="/" class="item">
          <Home size={16} />
        </Link>
      </dock-item>
      <div class="splitter"></div>
      <dock-item>
        <Link href="/labs" class="item">
          <FlaskConical size={16} />
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/blog" class="item">
          <ScrollText size={16} />
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/" class="item">
          4
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/" class="item">
          5
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/" class="item">
          6
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/" class="item">
          7
        </Link>
      </dock-item>
      <dock-item>
        <Link href="/" class="item">
          8
        </Link>
      </dock-item>
    </dock-wrapper>
  );
};

export default Nav;
