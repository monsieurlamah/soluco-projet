"use client"
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CategoryListSkeleton from './CategoryListSkeleton';

function CategoryList() {

    const listRef=useRef(null)
    const [categoryList,setCategoryList]=useState([]);
    const params=useSearchParams();
    const [selectedCategory,setSelectedCategory]=useState('tout')
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      params&&setSelectedCategory(params.get('category'));
    },[params])

    useEffect(()=>{
        getCategoryList();
      },[])
    
      /**
       * Used to get Category List
       */
      const getCategoryList=()=>{
        setLoading(true);
        GlobalApi.GetCategory().then(resp=>{
          console.log(resp.categories);
          setCategoryList(resp.categories);
          setLoading(false);
        })
      }

      const ScrollRightHandler=()=>{
        if(listRef.current)
        {
          listRef.current.scrollBy({
            left:200,
            behavior:'smooth'
          })
        }
      }
  return (
    <div className='mt-24 relative'>
      <div className='flex gap-4 overflow-auto scrollbar-hide' ref={listRef}>
        {!loading
          ?categoryList&&categoryList.map((category,index)=>(
          <Link href={'?category='+category.slug} key={index} 
          className={`flex flex-col items-center
           gap-2 border p-3 rounded-xl min-w-28
           hover:border-primary hover:bg-orange-50
           cursor-pointer group
           ${selectedCategory==category.slug&&'text-primary border-primary bg-orange-50'}
           `}>
              <Image src={category.icon?.url} alt={category.name}
              width={40}
              height={40}
              className='group-hover:scale-125 transition-all duration-200'
              />
              <h2 className='text-sm font-medium group-hover:text-primary'>{category.name}</h2>
          </Link>
        )) : [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
          <CategoryListSkeleton />
        ))}
      </div>
      <ArrowRightCircle className='absolute -right-10 top-9
      bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer
      '
      onClick={()=>ScrollRightHandler()}
      />
    </div>
  )
}

export default CategoryList