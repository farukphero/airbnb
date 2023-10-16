"use client";

import React from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import Image from "next/image";

interface AvatarProps {
  image: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <div>
      {image ? (
        <Image
          src={image}
          alt=""
          width={100}
          height={100}
          className="h-8 w-8 rounded-full"
        ></Image>
      ) : (
        <BiSolidUserCircle className="h-8 w-8"></BiSolidUserCircle>
      )}
    </div>
  );
};

export default Avatar;
