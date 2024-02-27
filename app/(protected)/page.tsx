'use client';

import Image from "next/image";
import { getAllRecipe, searchCategory, searchRecipes } from "../lib/recipe-actions";
import { CreateInvoice, DeleteInvoice, UpdateInvoice } from "./recipes/[id]/edit/components";
import Link from "next/link";
import {useEffect, useState} from 'react'
import { RecipeData } from "../lib/definitions";
import { Header } from "../ui/Header";
import { Button } from "../ui/button";
import { LucidePartyPopper } from "lucide-react";
import { GlobalRecipe } from "../ui/recipes";

var catigory =[
    {
        name:"breakfast",
        id: "breakfast"
    },
    {
        name:"lunch",
        id: "lunch"
    },{
        name:"dinner",
        id: "dinner"
    },{
        name:"dessert",
        id: "dessert"
    }
  ] 
  

export default function Home(){


        const [recipeees, setRecipeees] = useState<RecipeData[]>([]);

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const category = formData.get("category") as string;
        const search = formData.get("search") as string;

        if (category) {
          setRecipeees(await searchCategory(recipeees, category)) 
          
        }
        
        else 
        if(search){
            setRecipeees(await searchRecipes(recipeees, search)) 
        }
    }

    useEffect(() => {
        const fetchRecipes = async () => {
          const { recipes } = await getAllRecipe();
          setRecipeees(recipes);
        };
    
        fetchRecipes();
      }, []);

   

       
        return (
            <>


<Header
        title={
          <>
            The Best <br className="md:hidden" />
            Place To
            <br />
            Create Your Recipe 
          </>
        }
        sub="Claudcipe"
        // altSub={
        //   <Button><Link         
        //   href="/recipes/create"
        // >Create Recipe</Link></Button>
        //   }
      />



<section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Lets&apos;  See What You Are Cooking
          </h3>
        </div>
        <GlobalRecipe initial={recipeees} />
      </section>
                       
    
    
{/*                 
             <div  className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4"> 
    
                {
                    recipeees.map((recipe)=>{
                        return ( 




                            
        <>
                       <Link href="#" key={recipe.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Image className="object-cover w-full rounded-t-lg"
                            height={96}  
                            width={300}
                            src={recipe.url}
                            alt=""/>
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.name}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Ingredients: {recipe.ingredients}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions: {recipe.instructions}</p>
                            
                            </div>
                            <div className="p-4 flex justify-between w-full">
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.time} minutes</p>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{recipe.difficulty}</p>
                                </div>
                            <div className="flex justify-end gap-2">
                                <UpdateInvoice id={recipe.id} />
                                <DeleteInvoice id={recipe.id} />
                            </div>
                        </Link>

                        
                       </>     
                            
                        
                    
                        )
                    })
                }
    
                </div> */}
            </>
       
        ) 
    }
   
  



