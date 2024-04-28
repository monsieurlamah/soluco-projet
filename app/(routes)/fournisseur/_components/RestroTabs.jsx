import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from './MenuSection'
import ReviewSection from './ReviewSection'

function RestroTabs({fournisseur}) {
  return (
    <Tabs defaultValue="category" className="w-full mt-10">
  <TabsList>
    <TabsTrigger value="category">Catégorie</TabsTrigger>
    <TabsTrigger value="about">À propos</TabsTrigger>
    <TabsTrigger value="reviews">Commentaires</TabsTrigger>

  </TabsList>
  <TabsContent value="category">
    <MenuSection fournisseur={fournisseur} />
  </TabsContent>
  <TabsContent value="about">
    <>
    <h2 className='font-bold text-lg my-5'>À propos de nous</h2>

    <h2>{fournisseur?.aboutUs}</h2>
    </>
  </TabsContent>
  <TabsContent value="reviews">
    <ReviewSection fournisseur={fournisseur}/>
  </TabsContent>

</Tabs>

  )
}

export default RestroTabs