"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Truck, Search } from "lucide-react";
import { CartUpdateContext } from "../_context/CartUpdateContext";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "./Cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    user && GetUserCart();
  }, [updateCart, user]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setCart(resp?.userCarts);
      }
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="flex justify-between items-center py-6 px-4">
        <Link href={"/"}>
          {" "}
          <Image src="/logo.svg" alt="logo Soluco" width={230} height={230} />
        </Link>

        <div className="hidden md:flex border p-2 rounded-lg bg-gray-100 w-96">
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent w-full outline-none"
          />
          <Search className="text-primary" />
        </div>

        {isSignedIn ? (
          <div className="flex gap-3 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <Truck />
                    <label className="p-0 px-1.5 rounded-full bg-slate-200 absolute -top-2 -left-2 text-xs">
                      {cart?.length}
                    </label>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Cart cart={cart} />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user?.imageUrl}
                  alt="utiisateur Soluco"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/user"}>
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                </Link>
                <Link href={"/user#/my-orders"}>
                  <DropdownMenuItem>Mes commandes</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <SignOutButton>Se déconnecter</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-5">
            <SignInButton mode="modal">
              <Button variant="outline">Se connecter</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>S'inscrire</Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
