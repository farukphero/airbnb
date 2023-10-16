'use client'
import React from "react";
import Container from "../Container/Container";
import SearchBar from "./Search"
import UserMenu from "./UserMenu";
import {User} from "@prisma/client"
import Categories from "./Categories";
import { useRouter } from 'next/navigation';

interface NavbarProps{
  currentUser ?: User | null
}
const NavBar:React.FC<NavbarProps> = ({currentUser}) => {
  const router = useRouter()
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-grow items-center justify-between gap-3 md:gap-0">
           <h1 onClick={()=> router.push("/")} className="text-xl font-bold text-rose-500 cursor-pointer"> Airbnb</h1>
           <SearchBar></SearchBar>
           <UserMenu currentUser={currentUser}></UserMenu>
          </div>
        </Container>
      </div>
      <Categories></Categories>
    </div>
  );
};

export default NavBar;
