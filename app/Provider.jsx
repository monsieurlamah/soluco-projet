"use client";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "./_components/Header";
import { CartUpdateContext } from "./_context/CartUpdateContext";

function Provider({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      <div className="px-10 md:px-20 relative mb-20">
        <Header />
        <Toaster />
        {children}
      </div>
    </CartUpdateContext.Provider>
  );
}

export default Provider;
