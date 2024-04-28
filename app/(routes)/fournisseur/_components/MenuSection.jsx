import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/app/_utils/functions";

function MenuSection({ fournisseur }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  useEffect(() => {
    fournisseur?.menu && FilterMenu(fournisseur?.menu[0]?.category);
  }, [fournisseur]);
  const FilterMenu = (category) => {
    const result = fournisseur?.menu?.filter(
      (item) => item.category == category
    );
    setMenuItemList(result[0]);
  };

  const addToCartHandler = (item) => {
    toast("Ajout au camion...");

    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: item?.name,
      description: item?.description,
      productImage: item?.productImage?.url,
      price: item?.price,
      fournisseurSlug: fournisseur.slug,
    };
    GlobalApi.AddToCart(data).then(
      (resp) => {
        console.log(resp);
        setUpdateCart(!updateCart);
        toast.success("Ajouté au camion !");
      },
      (error) => {
        toast.error("Erreur lors de l'ajout au camion !");
      }
    );
  };

  
  return (
    <div className="w-full md:grid grid-cols-4 mt-2">
      <div className="flex flex-row overflow-x-auto md:flex-col mr-10 gap-2">
        {fournisseur?.menu?.map((item, index) => (
          <Button
            variant="ghost"
            key={index}
            className="flex justify-start"
            onClick={() => FilterMenu(item.category)}
          >
            {item.category}
          </Button>
        ))}
      </div>
      <div className="md:col-span-3 col-span-4">
        <h2 className="font-extrabold text-lg">{menuItemList?.category}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {menuItemList?.menuItem?.map((item, index) => (
            <div
              className="p-2 flex gap-3 border rounded-xl
                        hover:border-primary cursor-pointer
                        "
            >
              <Image
                src={item?.productImage?.url}
                alt={item.name}
                width={120}
                height={120}
                className="object-cover w-[120px] h-[120px] rounded-xl"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-bold">{item.name}</h2>
                <h2>{formatPrice(item.price)}</h2>
                <h2 className="text-sm text-gray-400 line-clamp-2">
                  {item.description}
                </h2>
                <SquarePlus
                  className="cursor-pointer"
                  onClick={() => addToCartHandler(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
