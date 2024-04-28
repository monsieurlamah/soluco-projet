"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/app/_utils/functions";

function Checkout() {
  const params = useSearchParams();
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  // const [deliveryAmount,setDeliveryAmount]=useState(5);
  const [deliveryAmount, setDeliveryAmount] = useState("Gratuite");
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0.01);
  const [subTotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(params.get("fournisseur"));
    user && GetUserCart();
  }, [user || updateCart]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
        setCart(resp?.userCarts);
        calculateTotalAmount(resp?.userCarts);
      }
    );
  };

  const calculateTotalAmount = (cart_) => {
    let total = 0;
    cart_.forEach((item) => {
      total = total + item.price;
    });
    setSubTotal(total.toFixed(2));
    // setTaxAmount(total*0.09);
    setTaxAmount("");
    // setTotal(total+total*0.09+deliveryAmount);
    setTotal(total);
  };

  const addToOrder = () => {
    setLoading(true);
    const data = {
      email: user.primaryEmailAddress.emailAddress,
      orderAmount: total,
      fournisseurName: params.get("fournisseur"),
      userName: user.fullName,
      phone: phone,
      address: address,
    };
    GlobalApi.CreateNewOrder(data).then(
      (resp) => {
        const resultId = resp?.createOrder?.id;
        if (resultId) {
          cart.forEach((item) => {
            GlobalApi.UpdateOrderToAddOrderItems(
              item.productName,
              item.price,
              resultId,
              user?.primaryEmailAddress.emailAddress
            ).then(
              (result) => {
                console.log(result);
                setLoading(false);
                toast.success("Commande effectuée avec succès !");
                setUpdateCart(!updateCart);
                SendEmail();
                router.replace("/confirmation");
              },
              (error) => {
                setLoading(false);
              }
            );
          });
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const SendEmail = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user?.primaryEmailAddress.emailAddress }),
      });

      if (!response.ok) {
        toast("Erreur lors de l'envoi du mail");
      } else {
        toast("Courriel de Confirmation Envoyé");
      }
    } catch (err) {
      toast("Erreur lors de l'envoi du mail");
    }
  };

  return (
    <div className="mt-20 p-5 md:px-10">
      <h2 className="font-bold text-2xl my-5">Vérifier</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="font-bold text-3xl">Détails de la facturation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Nom..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Téléphone..."
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Adresse..."
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} /> */}
          </div>
        </div>
        <div className="border p-4">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total de la sélection ({cart?.length}){" "}
          </h2>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Sous total : <span>{formatPrice(subTotal)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Livraison : <span>{deliveryAmount}</span>
            </h2>
            {/* <h2 className='flex justify-between'>Tax (9%) : <span>${taxAmount.toFixed(2)}</span></h2> */}
            <hr />
            <h2 className="font-bold flex justify-between">
              Total : <span>{formatPrice(total)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between font-bold">
              Paiement à la livraison : <span>☑️</span>
            </h2>
            {/* <Button onClick={()=>onApprove({paymentId:123})}>Payment <ArrowBigRight/> </Button> */}
            {/* <Button onClick={()=>SendEmail()}>
                {loading?<Loader className='animate-spin'/>:'Make Payment'} 

                </Button> */}
            {total > 5 && (
              <Button
                onClick={() => addToOrder()}
                disabled={!(username && email && address) || loading}
              >
                {loading ? <Loader className="animate-spin" /> : "Commander"}
              </Button>
            )}
            {/* {total > 5 && (
              <PayPalButtons
                disabled={!(username && email && address && zip) || loading}
                style={{ layout: "horizontal" }}
                onApprove={addToOrder}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total.toFixed(2),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
