"use client";
import { Copy } from "lucide-react";
import { usePathname } from "next/navigation";

const ClipboardButton = ({}) => {
  const path = usePathname();
  return (
    <button
      className="bg-gray-3 rounded-full flex items-center text-gray-11 justify-center w-9 h-9"
      onClick={() => {
        navigator.clipboard.writeText(path);
      }}
    >
      <Copy size={14}  />
    </button>
  );
};

export default ClipboardButton;
