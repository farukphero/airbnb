"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart size={28} className="fill-white absolute" />
      <AiFillHeart
        size={28}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/60"}
      />
    </div>
  );
};

export default HeartButton;
