'use client';

import Image from "next/image";
import { getAllRecipe, searchCategory, searchRecipes } from "../lib/recipe-actions";
import { CreateInvoice, DeleteInvoice, UpdateInvoice } from "./recipes/[id]/edit/components";
import Link from "next/link";
import {useEffect, useState} from 'react'
import { RecipeData } from "../lib/definitions";

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
            <div>
                        <div className="p-8">
                        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                            <div className="flex">
                        
                                   <select
                                    id="category"
                                    name="category"
                                    defaultValue=""
                                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                >
                                    <option value="" disabled>
                                        Select a Cartigory
                                    </option>
                                    {catigory.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="relative w-full">
                                    <input 
                                    type="search" 
                                    name="search"
                                    id="search-dropdown" 
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search Recipes........" 
                                    
                                    />
                                    <button 
                                    type="submit" 
                                    className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                                <div className="ml-4 flex justify-end gap-2">
                        <CreateInvoice />
                        </div>
                            </div>
                        </form>
                        </div>
    
    
                
             <div  className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4"> 
    
                {
                    recipeees.map((recipe)=>{
                        return ( 
                            
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
                        
                    
                        )
                    })
                }
    
                </div>
            </div>
       
        ) 
    }
   
  



