import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Intro({fournisseur}) {
  const [totalReview, setTotalReview] = useState(0);
  const [avgRating, setAvgRating] = useState();
  useEffect(() => {
    fournisseur && CalculateRating();
  }, [fournisseur]);
  const CalculateRating = () => {
    let total = 0;
    let count = 0;
    fournisseur?.reviews?.forEach((item) => {
      total = total + item.star;
      count++;
    });
    setTotalReview(count);
    const result = total / count;
    setAvgRating(result ? result.toFixed(1) : 4.5);
  };
  return (
    <div className='mt-24'>
        {fournisseur?.banner?.url? <div>
            <Image src={fournisseur?.banner?.url}
            width={1000}
            height={300}
            alt='banner Soluco'
            className='w-full h-[220px] object-cover rounded-xl'
            />
        </div>:
        <div className='h-[220px] w-full bg-slate-200
         animate-pulse rounded-xl'>
        </div>}

        <h2 className='text-3xl font-bold mt-2'>{fournisseur.name}</h2>
        <div className='flex items-center gap-2 mt-2'>
            <Image src={'/star.png'} alt='star of Soluco'
            width={20} height={20}/>
            <label className=' text-gray-500'>{avgRating} ({totalReview})</label>
        </div>
        <h2 className='text-gray-500 mt-2 flex gap-2 items-center'>
            <MapPin/>
            {fournisseur.address}</h2>
    </div>
  )
}

export default Intro