"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLogInModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import {signOut} from "next-auth/react"
import useRentModal from "@/app/hooks/useRentModal";
interface UserMenuProps {
  currentUser?: User | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const logInModal = useLogInModal();
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

 const onRent = useCallback(()=>{
  if(!currentUser){
   return logInModal.onOpen()
  }
 
  rentModal.onOpen()

 },[currentUser, logInModal, rentModal])


  return (
    <div
      className="
        relative
        "
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className="hidden md:block">
            <Avatar image={currentUser?.image}></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems onClick={() => {}} label=" My trips"></MenuItems>
                <MenuItems onClick={() => {}} label="My favorite"></MenuItems>
                <MenuItems onClick={() => {}} label="My reservation"></MenuItems>
                <MenuItems onClick={() => {}} label="My properties"></MenuItems>
                <MenuItems onClick={ onRent} label="Airbnb my home"></MenuItems>
                <hr />
                <MenuItems onClick={() => signOut()} label="Logout"></MenuItems>
              </>
            ) : (
              <>
                <MenuItems
                  onClick={logInModal.onOpen}
                  label="Log In"
                ></MenuItems>
                <MenuItems
                  onClick={registerModal.onOpen}
                  label="Sign Up"
                ></MenuItems>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
