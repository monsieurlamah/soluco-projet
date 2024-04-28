import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'
function ReviewSection({fournisseur}) {
    const [rating, setRating] = useState(0)
    const [reviewText,setReviewText]=useState();
    const {user}=useUser();
    const [reviewList,setReviewList]=useState();
    useEffect(()=>{
        fournisseur&&getReviewList();
    },[fournisseur])

    const handleSubmit=()=>{
        const data={
            email:user.primaryEmailAddress.emailAddress,
            profileImage:user?.imageUrl,
            userName:user?.fullName,
            star:rating,
            reviewText:reviewText,
            fournisseurSlug:fournisseur.slug
        };

        GlobalApi.AddNewReview(data).then(resp=>{
            console.log(resp);
            toast('Avis ajouté !!')
            resp&&getReviewList();
        });
    }

    const getReviewList=()=>{
        GlobalApi.getRestaurantReviews(fournisseur.slug).then(resp=>{
            console.log(resp);
            setReviewList(resp?.reviews)
        })
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
        <div className='flex flex-col gap-2 p-5 border rounded-lg shadow-lg'>
            <h2 className='font-bold text-lg'>Ajoutez votre avis</h2>
            <ReactRating style={{ maxWidth: 100 }} 
            value={rating} onChange={setRating} />
           <Textarea onChange={(e)=>setReviewText(e.target.value)}/>
            <Button disabled={rating==0||!reviewText}
                onClick={()=>handleSubmit()}
            >Soumettre</Button>
        </div>
        <div className='col-span-2'>
            <ReviewList reviewList={reviewList} />
        </div>
    </div>
  )
}

export default ReviewSection