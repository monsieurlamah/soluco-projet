"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Intro from '../_components/Intro';

import RestroTabs from '../_components/RestroTabs';

function RestaurantDetails() {

    const param=usePathname();
    const [fournisseur,setFournisseur]=useState([]);
    useEffect(()=>{
        GetFournisseurDetail(param.split("/")[2])
    },[])
    const GetFournisseurDetail=(fournisseurSlug)=>{
        GlobalApi.GetBusinessDetail(fournisseurSlug).then(resp=>{
            console.log(resp)
            setFournisseur(resp.fournisseur);
        })
    }
  return (
    <div>
        <Intro fournisseur={fournisseur} />
        <RestroTabs fournisseur={fournisseur}/>
    </div>
  )
}

export default RestaurantDetails