import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

function Confirmation() {
  return (
    <div className="flex justify-center my-20 mt-24">
      <div
        className="border shadow-md flex flex-col justify-center
    p-20 rounded-md items-center gap-3 px-32"
      >
        <CheckCircle2 className="h-24 w-24 text-primary" />
        <h2 className="font-medium text-3xl text-primary text-center">Commande réussie</h2>
        <h2 className="text-center">Merci beaucoup pour la commande</h2>
        <Link href={"/my-orders"}>
          {" "}
          <Button className="mt-8">Suivre votre commande</Button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;
