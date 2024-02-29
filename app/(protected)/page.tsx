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
import { useUser } from "../lib/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

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

    //     if (category) {
    //       setRecipeees(await searchCategory(recipeees, category)) 
          
    //     }
        
    //     else 
    //     if(search){
    //         setRecipeees(await searchRecipes(recipeees, search)) 
    //     }
     }


   
    useEffect(() => {

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const fetchRecipes = async () => {
            const { recipes } = await getAllRecipe(user.uid);
            setRecipeees(recipes);
          };
          fetchRecipes();
        }});

        return () => unsubscribe();
    
       
      }, []);

   

       
        return (
            <>


{/* <Header
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
      /> */}


{/* 
<section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Lets&apos;  See What You Are Cooking
          </h3>
        </div>
        <GlobalRecipe initial={recipeees} />
      </section>
                        */}
    
    
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

                 
              <section id="home" className="py-5">
              
                <div className="container  flex flex-wrap items-center justify-center mx-auto mt-10 md:px-12 md:flex-row">
                  <div className="mb-14 lg:mb-0 lg:w-1/2">
                    <h1 className="max-w-xl text-[2.9rem] leading-none text-gray-900 font-extrabold font-sam text-center lg:text-5xl
                    lg:text-left lg:leading-tight mb-5">
                      The Best Place To Create Your Recipe
                    </h1>
                    <p className="max-w-xl text-center text-gray-500 lg:text-left lg:max-w-md">
                    Lets&apos;  See What You Are Cooking
                    </p>
                    <div className="flex justify-center mt-14 lg:justify-start">
                        <Link href={"/recipes/create"} className="text-white bg-green-500 font-medium rounded-lg px-5 py-4 text-center
                        hover:bg-green-500 hover:drop-shadow-md transition duration-300 ease-in-out" >
                          Create Recipe
                        </Link>
                    </div>
                       
                  </div>

                  <div className="lg:w-1/2">
                    <img className="ml-auto" src="/tezro7.jpeg" alt="hero-img" />

                  </div>
                </div>
              
          </section>
          


<section>
<div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Popular Recipes Of The Week
          </h3>
        </div>
    <div className=" items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
           

       { recipeees.map((recipe)=>{
                        return ( 


            <div key={recipe.id} className=" p-6">
              <Link href={`recipes/${recipe.id}/edit`}>
                <img  className="object-cover object-center w-full mb-4 lg:h-48 md:h-36 rounded-xl" src={recipe.url} alt={recipe.name}/>

                <h1 className="mx-auto mb-4 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">{recipe.name}</h1>
                <p className="flex mx-auto text-base leading-relaxed text-gray-500">
                { Object.entries(recipe.checkedTags).map(([key, value], index) => (
              <div
                key={key as string}
                className="hover:text-primary dark:text-primary-foreground"
              >
                {index != 0 && ", "}
                {value as string}
              </div>
            ))}
                  </p>             
                   
                  </Link>
            </div>
                        )
                   })}


           
        </div>
    </div>
</section>
            </>
       
        ) 
    }
   
  



