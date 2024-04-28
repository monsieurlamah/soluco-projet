import Email from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req){

    const response=await req.json();
    try{
        const data=await resend.emails.send({
            from: 'monsieurlamah224@gmail.com',
            to: [response.email],
            subject: 'Confirmation de commande chez Soluco',
            react: Email(),
          });
        return NextResponse.json({data})

    }catch(error){
        return NextResponse.json({error})
    }
}