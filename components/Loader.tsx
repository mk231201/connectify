import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Loader = ({
  fullPage = false,
  size = 25,
}: {
  fullPage?: boolean;
  size?: number;
}) => {
  return (
    <div
      className={cn("flex items-center justify-center", fullPage && "h-screen")}
    >
      <Image
        src="/icons/loading-circle.svg"
        alt="loader"
        width={fullPage ? 50 : size}
        height={fullPage ? 50 : size}
      />
    </div>
  );
};

export default Loader;
